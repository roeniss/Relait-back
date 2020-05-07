import * as express from "express";
import { Seat } from "../db";
import {
  Op,
  FindOptions,
  UpdateOptions,
  ValidationError,
  DestroyOptions,
  literal,
} from "sequelize";
import { dateWithOffset } from "../lib/offsetTime";

//-------------------------
//    Constants
//-------------------------
const SEATS_PER_PAGE = 20;

//-------------------------
//    Functions
//-------------------------

//
// Get all alive seats.
// 200: OK
//
export const getSeats = async (req: express.Request, res: express.Response) => {
  const { page, lat, lng } = req.query;
  const [offset, limit] = _getOffsetLimit(page);
  const dateTenMinLater = dateWithOffset(10);
  try {
    const options: FindOptions = {
      where: {
        takerId: null,
        leaveAt: Seat.laterThan(dateTenMinLater),
      },
      order: Seat.sortByDistance(lat, lng),
      offset,
      limit,
    };
    const seats = await Seat.findAll(options);

    return res.status(200).json({ seats });
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// return data of given id's seat
// 200: OK
// 404: Not found
//
export const getSeat = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  try {
    const seat = await Seat.findByPk(id);

    if (seat) return res.status(200).json(seat);
    return res.sendStatus(404);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// If user have alive seat (give or take), return the seat
// 200: OK (you're now giving or taking a seat)
// 204: No content (you have no seat)
//
export const getStatus = async (
  _req: express.Request,
  res: express.Response
) => {
  const { id } = res.locals; // userId
  const dateTenMinLater = dateWithOffset(10);
  try {
    const options: FindOptions = {
      where: {
        [Op.or]: [{ giverId: id }, { takerId: id }],
        leaveAt: { [Op.gte]: dateTenMinLater },
      },
    };
    const seat = await Seat.findOne(options);

    if (seat) return res.status(200).json(seat);
    else res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
};

//
// Create new Seat
// 201: Created
// 403: Forbidden (you have some alive seat)
// 422: Unprocessable Entity (lack of essential columns)
//
export const createSeat = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = res.locals; // userId
  const dateTenMinLater = dateWithOffset(10);
  try {
    const options: FindOptions = {
      where: {
        [Op.or]: [{ giverId: id }, { takerId: id }],
        leaveAt: { [Op.gte]: dateTenMinLater },
      },
    };
    const seat = await Seat.findOne(options);
    if (seat) return res.sendStatus(403);
  } catch (e) {
    return res.sendStatus(500);
  }

  try {
    const {
      leaveAt,
      descriptionGiver,
      cafeName,
      spaceKakaoMapId,
      address,
      lat,
      lng,
      havePlug,
      thumbnailUrl,
      descriptionSeat,
      descriptionCloseTime,
    } = req.body;

    const values: Partial<Seat> = {
      giverId: id,
      seatStatus: 1,
      leaveAt,
      descriptionGiver,
      cafeName,
      spaceKakaoMapId,
      address,
      lat,
      lng,
      havePlug,
      thumbnailUrl,
      descriptionSeat,
      descriptionCloseTime,
    };
    const newSeat = await Seat.create(values);
    return res.sendStatus(201);
  } catch (e) {
    if (e instanceof ValidationError) return res.sendStatus(422);
    return res.sendStatus(500);
  }
};

//
// Update a Seat. Only alive && not taken seat can be deleted.
// 204: No content (updated well, even nothing's changed)
// 403: Forbidden (can't update this seat)
// 404: Not found (no such seat)
//
export const updateSeat = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = res.locals.id;
  const seatId = req.params.id;
  const dateTenMinLater = dateWithOffset(10);
  try {
    const options: FindOptions = {
      where: { id: seatId },
    };
    const seat = await Seat.findOne(options);
    if (!seat) {
      return res.sendStatus(404);
    } else if (
      seat.giverId !== userId ||
      seat.leaveAt.getTime() < dateTenMinLater.getTime() ||
      seat.takerId !== null
    ) {
      return res.sendStatus(403);
    }
  } catch (e) {
    return res.sendStatus(500);
  }

  try {
    const {
      leaveAt,
      descriptionGiver,
      cafeName,
      spaceKakaoMapId,
      address,
      lat,
      lng,
      havePlug,
      thumbnailUrl,
      descriptionSeat,
      descriptionCloseTime,
    } = req.body;

    const values: Partial<Seat> = {
      leaveAt,
      descriptionGiver,
      cafeName,
      spaceKakaoMapId,
      address,
      lat,
      lng,
      havePlug,
      thumbnailUrl,
      descriptionSeat,
      descriptionCloseTime,
    };

    const options: UpdateOptions = {
      where: {
        id: seatId,
        giverId: userId,
        leaveAt: { [Op.gte]: dateTenMinLater },
        takerId: null,
      },
      limit: 1,
    };

    const [updatedCnt, _updatedSeats] = await Seat.update(values, options);
    if (updatedCnt === 0) return res.sendStatus(403);
    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// Delete a Seat. Only alive && not taken seat can be deleted.
// 204: No content (deleted well)
// 403: Forbidden (can't delete this seat)
// 404: Not found (no such seat)
//
export const deleteSeat = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = res.locals.id;
  const seatId = req.params.id;
  try {
    const dateTenMinLater = dateWithOffset(10);
    try {
      const options: FindOptions = {
        where: { id: seatId },
      };
      const seat = await Seat.findOne(options);
      if (!seat) {
        return res.sendStatus(404);
      } else if (
        seat.giverId !== userId ||
        seat.leaveAt.getTime() < dateTenMinLater.getTime() ||
        seat.takerId !== null
      ) {
        return res.sendStatus(403);
      }
    } catch (e) {
      return res.sendStatus(500);
    }

    const options: DestroyOptions = {
      where: {
        id: seatId,
        giverId: userId,
        leaveAt: { [Op.gte]: dateTenMinLater },
        takerId: null,
      },
      limit: 1,
    };

    const deletedCnt = await Seat.destroy(options);
    if (deletedCnt === 0) res.sendStatus(403);
    else return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// take a alive(not taken) seat
// 204: No content (take well)
// 403: Forbidden (can't take this seat -- e.g. taken by someone else)
// 404: Not found (no such seat)
//
export const takeSeat = async (req: express.Request, res: express.Response) => {
  const userId = res.locals.id;
  const seatId = req.params.id;
  const dateTenMinLater = dateWithOffset(10);
  try {
    const options: FindOptions = {
      where: { id: seatId },
    };
    const seat = await Seat.findOne(options);
    if (!seat) {
      return res.sendStatus(404);
    } else if (
      seat.giverId === userId ||
      seat.leaveAt.getTime() < dateTenMinLater.getTime() ||
      seat.takerId !== null
    ) {
      return res.sendStatus(403);
    }
  } catch (e) {
    return res.sendStatus(500);
  }

  try {
    const timeNow = dateWithOffset(0);
    const values: Partial<Seat> = {
      takerId: userId,
      takenAt: timeNow,
    };

    const options: UpdateOptions = {
      where: {
        id: seatId,
        leaveAt: { [Op.gte]: dateTenMinLater },
        takerId: null,
      },
      limit: 1,
    };

    const [updatedCnt, _updatedSeats] = await Seat.update(values, options);
    if (updatedCnt === 0) return res.sendStatus(403);
    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// cancel the previous reservation(take action) of the user
// 204: No content (cancel well)
// 403: Forbidden (can't take this seat -- e.g. taken by someone else)
// 404: Not found (no such seat)
//
export const cancelTakeSeat = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = res.locals.id;
  const seatId = req.params.id;
  const dateTenMinLater = dateWithOffset(10);
  try {
    const options: FindOptions = {
      where: { id: seatId },
    };
    const seat = await Seat.findOne(options);
    if (!seat) {
      return res.sendStatus(404);
    } else if (
      seat.leaveAt.getTime() < dateTenMinLater.getTime() ||
      seat.takerId !== userId
    ) {
      return res.sendStatus(403);
    }
  } catch (e) {
    return res.sendStatus(500);
  }

  try {
    const values: Partial<Seat> = {
      takerId: null,
      takenAt: null,
    };
    const options: UpdateOptions = {
      where: {
        id: seatId,
        leaveAt: { [Op.gte]: dateTenMinLater },
        takerId: userId,
      },
      limit: 1,
    };

    const [updatedCnt, _updatedSeats] = await Seat.update(values, options);
    if (updatedCnt === 0) return res.sendStatus(403);
    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//-------------------------
//    Helpers
//-------------------------

const _getOffsetLimit = (page: string | undefined): [number, number] => {
  if (!page) return [0, SEATS_PER_PAGE];
  const pageNum = parseInt(page);
  if (isNaN(pageNum)) return [0, SEATS_PER_PAGE];
  return [(pageNum - 1) * SEATS_PER_PAGE, SEATS_PER_PAGE];
};

// ----------------- below: for debug

//
// Restore deleted seat (for Debugging)
// Because of "paranoid" options (a.k.a. soft-delete),
// this methoid just update 'deletedAt' column to NULL.
// 204: No content (no error found)
//
export const restoreSeat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    await Seat.restore({
      where: { id },
    });
    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};
