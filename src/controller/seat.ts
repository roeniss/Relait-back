import * as express from "express";
import { Seat } from "../db";
import {
  Op,
  FindOptions,
  UpdateOptions,
  ValidationError,
  DestroyOptions,
  RestoreOptions,
} from "sequelize";
import { offsetTime } from "../lib";

//-------------------------
//    Constants (policy)
//-------------------------
const SEATS_PER_PAGE = 20;
const UPDATE_ALLOW_MINUTE = 10; // scale : minute

//-------------------------
//    Functions
//-------------------------

//
// Get all alive seats.
// 200: OK
//
export const getSeats: express.RequestHandler = async (req, res, next) => {
  const { page, lat, lng } = req.query;
  const [offset, limit] = _getOffsetLimit(page);
  try {
    const options: FindOptions = {
      where: {
        takerId: null,
        leaveAt: Seat.whereLaterThan(UPDATE_ALLOW_MINUTE),
      },
      order: Seat.orderByDistance(lat, lng),
      offset,
      limit,
    };
    const seats = await Seat.findAll(options);

    return res.status(200).json({ seats });
  } catch (e) {
    return next(e);
  }
};

//
// return data of given id's seat
// 200: OK
// 404: Not found
//
export const getSeat: express.RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const seat = await Seat.findByPk(id);

    if (seat) return res.status(200).json(seat);
    return res.sendStatus(404);
  } catch (e) {
    return next(e);
  }
};

//
// If user have alive seat (give or take), return the seat
// 200: OK (you're now giving or taking a seat)
// 204: No content (you have no seat)
//
export const getStatus = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = res.locals; // userId
  try {
    const options: FindOptions = {
      where: {
        [Op.or]: [{ giverId: id }, { takerId: id }],
        leaveAt: Seat.whereLaterThan(UPDATE_ALLOW_MINUTE),
      },
    };
    const seat = await Seat.findOne(options);

    if (seat) return res.status(200).json(seat);
    else return res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
};

//
// Create new Seat
// 201: Created
// 403: Forbidden (you have some alive seat)
// 422: Unprocessable Entity (lack of essential columns)
//
export const createSeat: express.RequestHandler = async (req, res, next) => {
  const { id } = res.locals; // userId
  try {
    const options: FindOptions = {
      where: {
        [Op.or]: [{ giverId: id }, { takerId: id }],
        leaveAt: Seat.whereLaterThan(UPDATE_ALLOW_MINUTE),
      },
    };
    const seat = await Seat.findOne(options);
    if (seat) return res.sendStatus(403);
  } catch (e) {
    return next(e);
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
    await Seat.create(values);
    return res.sendStatus(201);
  } catch (e) {
    if (e instanceof ValidationError) return res.sendStatus(422);
    return next(e);
  }
};

//
// Update a Seat. Only alive && not taken seat can be del  req,   res,   next
// 403: Forbidden (can't update this seat)
// 404: Not found (no such seat)
//
export const updateSeat: express.RequestHandler = async (req, res, next) => {
  const userId = res.locals.id;
  const seatId = req.params.id;
  try {
    const options: FindOptions = {
      where: { id: seatId },
    };
    const seat = await Seat.findOne(options);
    if (!seat) {
      return res.sendStatus(404);
    } else if (
      !seat.isGivenBy(userId) ||
      !seat.isTakenBy(null) ||
      seat.leftMinuteToLeave() < UPDATE_ALLOW_MINUTE
    ) {
      return res.sendStatus(403);
    }
  } catch (e) {
    return next(e);
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
        leaveAt: Seat.whereLaterThan(UPDATE_ALLOW_MINUTE),
        takerId: null,
      },
      limit: 1,
    };

    const [updatedCnt /* _updatedSeats */] = await Seat.update(values, options);
    if (updatedCnt === 0) return res.sendStatus(403);
    return res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
};

//
// Delete a Seat. Only alive && not taken seat can be deleted.
// 204: No content (deleted well)
// 403: Forbidden (can't delete this seat)
// 404: Not found (no such seat)
//
export const deleteSeat: express.RequestHandler = async (req, res, next) => {
  const userId = res.locals.id;
  const seatId = req.params.id;

  try {
    const options: FindOptions = {
      where: { id: seatId },
    };
    const seat = await Seat.findOne(options);
    if (!seat) {
      return res.sendStatus(404);
    } else if (
      !seat.isGivenBy(userId) ||
      !seat.isTakenBy(null) ||
      seat.leftMinuteToLeave() < UPDATE_ALLOW_MINUTE
    ) {
      return res.sendStatus(403);
    }
  } catch (e) {
    return next(e);
  }

  try {
    const options: DestroyOptions = {
      where: {
        id: seatId,
        giverId: userId,
        leaveAt: Seat.whereLaterThan(UPDATE_ALLOW_MINUTE),
        takerId: null,
      },
      limit: 1,
    };

    const deletedCnt = await Seat.destroy(options);
    if (deletedCnt === 0) return res.sendStatus(403);
    else return res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
};

//
// take a alive(not taken) seat
// 204: No content (take well)
// 403: Forbidden (can't take this seat -- e.g. taken by someone else)
// 404: Not found (no such seat)
//
export const takeSeat: express.RequestHandler = async (req, res, next) => {
  const userId = res.locals.id;
  const seatId = req.params.id;
  try {
    const options: FindOptions = {
      where: { id: seatId },
    };
    const seat = await Seat.findOne(options);
    if (!seat) {
      return res.sendStatus(404);
    } else if (
      seat.isGivenBy(userId) ||
      !seat.isTakenBy(null) ||
      seat.leftMinuteToLeave() < UPDATE_ALLOW_MINUTE
    ) {
      return res.sendStatus(403);
    }
  } catch (e) {
    return next(e);
  }

  try {
    const timeNow = offsetTime(0);
    const values: Partial<Seat> = {
      takerId: userId,
      takenAt: timeNow,
    };

    const options: UpdateOptions = {
      where: {
        id: seatId,
        leaveAt: Seat.whereLaterThan(UPDATE_ALLOW_MINUTE),
        takerId: null,
      },
      limit: 1,
    };

    const [updatedCnt /* _updatedSeats */] = await Seat.update(values, options);
    if (updatedCnt === 0) return res.sendStatus(403);
    return res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
};

//
// cancel the previous reservation(take action) of the user
// 204: No content (cancel well)
// 403: Forbidden (can't take this seat -- e.g. taken by someone else)
// 404: Not found (no such seat)
//
export const cancelTakeSeat: express.RequestHandler = async (
  req,
  res,
  next
) => {
  const userId = res.locals.id;
  const seatId = req.params.id;
  try {
    const options: FindOptions = {
      where: { id: seatId },
    };
    const seat = await Seat.findOne(options);
    if (!seat) {
      return res.sendStatus(404);
    } else if (
      seat.leftMinuteToLeave() < UPDATE_ALLOW_MINUTE ||
      !seat.isTakenBy(userId)
    ) {
      return res.sendStatus(403);
    }
  } catch (e) {
    return next(e);
  }

  try {
    const values: Partial<Seat> = {
      takerId: null,
      takenAt: null,
    };
    const options: UpdateOptions = {
      where: {
        id: seatId,
        leaveAt: Seat.whereLaterThan(UPDATE_ALLOW_MINUTE),
        takerId: userId,
      },
      limit: 1,
    };

    const [updatedCnt /* _updatedSeats */] = await Seat.update(values, options);
    if (updatedCnt === 0) return res.sendStatus(403);
    return res.sendStatus(204);
  } catch (e) {
    return next(e);
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
export const restoreSeat: express.RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const options: RestoreOptions = {
      where: { id },
    };
    await Seat.restore(options);
    return res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
};
