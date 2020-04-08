import * as express from "express";
import { Seat } from "../db";
import { Op } from "sequelize";
import { Jwt, decryptJwt, JwtPayload } from "../lib/helper";
import { timeShiftedFor, midnightShiftedFor } from "../lib/offsetTime";

//
// Get all available seats.
// condition : registed at least after today 00:00 ~ leaved at least 10 min later
//
export const getAvailableSeats = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const timeAfter10Min: string = timeShiftedFor(10);
    const todayMidnight: string = midnightShiftedFor(0);
    const condition = {
      where: {
        seatStatus: 1,
        leaveAt: {
          [Op.gte]: timeAfter10Min,
        },
        createdAt: {
          [Op.gte]: todayMidnight,
        },
      },
    };
    const seats: Seat[] = await Seat.findAll(condition);
    return res.status(200).json({ seats });
  } catch (e) {
    return res.sendStatus(500);
  }
};

//
// If user have registered a seat, server will send its id.
// otherwise, send 0
//
export const checkCurrentSeat = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const payload = <JwtPayload>decryptJwt(req.body.JWT);

    const timeAfter10Min: string = timeShiftedFor(10);
    const todayMidnight: string = midnightShiftedFor(0);
    const condition = {
      where: {
        giverId: payload.id,
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
    return res
      .status(200)
      .json({ registeredSeatId: (giverSeat && giverSeat.id) || 0 });
  } catch (error) {
    return res.sendStatus(500);
  }
};
