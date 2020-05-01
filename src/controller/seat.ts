import * as express from "express";
import { Seat } from "../db";
import { Op, FindOptions, UpdateOptions, CreateOptions } from "sequelize";
import { datetimeBeforeMin, midnightShiftedFor } from "../lib/offsetTime";

//-------------------------
//    Constant
//-------------------------
const SEATS_PER_PAGE = 20;

//-------------------------
//    Main Functions
//-------------------------

//
// Get all available seats.
// condition : registed at least after today 00:00 ~ leaved at least 10 min later
//
export const getAvailableSeats = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const [offset, limit] = _getOffsetLimit(req.params.page);
    const timeAfter10Min = datetimeBeforeMin(10);
    const condition: FindOptions = {
      where: {
        takerId: null,
        leaveAt: { [Op.gte]: timeAfter10Min },
      },
      offset,
      limit,
    };
    const seats: Seat[] = await Seat.findAll(condition);
    return res.status(200).json({ seats });
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// If user have registered a seat, server will send its id.
// otherwise, send 404
//
export const checkCurrentSeat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id: giverId } = res.locals;
    const timeAfter10Min = datetimeBeforeMin(10);
    const todayMidnight = midnightShiftedFor(0);
    const condition: FindOptions = {
      where: {
        giverId,
        takerId: null,
        leaveAt: {
          [Op.gte]: timeAfter10Min,
        },
        createdAt: {
          [Op.gte]: todayMidnight,
        },
      },
    };
    const giverSeat: Seat | null = await Seat.findOne(condition);

    if (giverSeat) return res.status(200).json({ seat: giverSeat });
    else res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

//
// return data of given id's seat
//
export const getSeat = async (req: express.Request, res: express.Response) => {
  try {
    const condition: FindOptions = {
      where: {
        id: req.params.id,
      },
    };
    const seat: Seat | null = await Seat.findOne(condition);
    if (!!seat) return res.status(200).json(seat);
    else res.sendStatus(404);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// Create new Seat
//
export const createSeat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = res.locals;
    const {
      leaveAt,
      descriptionGiver,
      cafeName,
      spaceKakaoMapId,
      address,
      geoLocation,
      havePlug,
      thumbnailUrl,
      descriptionSeat,
      descriptionCloseTime,
    } = req.body;

    // essntial parameters
    const condition: Partial<Seat> = {
      giverId: id,
      seatStatus: 1,
      leaveAt,
      descriptionGiver,
      cafeName,
      spaceKakaoMapId,
      address,
      geoLocation,
      havePlug,
      thumbnailUrl,
      descriptionSeat,
    };

    // optional parameters
    if (descriptionCloseTime)
      condition.descriptionCloseTime = descriptionCloseTime;

    const newSeat: Seat = await Seat.create(condition);
    return res.sendStatus(201);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// Update new Seat
//
export const updateSeat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = res.locals;
    const updatableData = [
      "leaveAt",
      "descriptionGiver",
      "cafeName",
      "spaceKakaoMapId",
      "address",
      "geoLocation",
      "havePlug",
      "thumbnailUrl",
      "descriptionSeat",
      "descriptionCloseTime",
    ];
    const dataToUpdate: any = {};
    Object.entries(req.body).forEach(([k, v]) => {
      if (updatableData.includes(k)) dataToUpdate[k] = v;
    });
    const condition: UpdateOptions = {
      where: {
        id: req.params.id,
        giverId: id,
        seatStatus: 1,
        leaveAt: {
          [Op.gte]: datetimeBeforeMin(10),
        },
        createdAt: {
          [Op.gte]: midnightShiftedFor(0),
        },
      },
    };

    const updatedSeats: [number, Seat[]] = await Seat.update(
      dataToUpdate,
      condition
    );
    if (updatedSeats[0] === 0) res.sendStatus(404);
    else return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// Delete new Seat
//
export const deleteSeat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = res.locals;
    const dataToUpdate = {
      seatStatus: 9,
    };
    const condition: UpdateOptions = {
      where: {
        id: req.params.id,
        giverId: id,
        createdAt: {
          [Op.gte]: midnightShiftedFor(0),
        },
      },
    };

    const deletedSeats: [number, Seat[]] = await Seat.update(
      dataToUpdate,
      condition
    );
    if (deletedSeats[0] === 0) res.sendStatus(404);
    else return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// Restore deleted seat (for Debugging)
//
export const restoreSeat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = res.locals;
    const dataToUpdate = {
      seatStatus: 1,
    };
    const condition: UpdateOptions = {
      where: {
        id: req.params.id,
        giverId: id,
        createdAt: {
          [Op.gte]: midnightShiftedFor(0),
        },
      },
    };

    const deletedSeats: [number, Seat[]] = await Seat.update(
      dataToUpdate,
      condition
    );
    if (deletedSeats[0] === 0) res.sendStatus(404);
    else return res.sendStatus(204);
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
