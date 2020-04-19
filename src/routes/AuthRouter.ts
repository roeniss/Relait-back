import * as express from "express";
import * as AuthController from "../controller/auth";
import { hasValidLoginBody, isValidUser } from "../milddlewares/vaildation";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const router: express.Router = express.Router();

/**
 * @swagger
 *
 * /user/login:
 *   post:
 *     tags:
 *       - "Auth"
 *     description: "로그인 또는 회원가입 (기존 정보 없으면 자동 회원가입)"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "body"
 *         in: "body"
 *         type: "object"
 *         required:
 *         - "uniqueId"
 *         - "vendor"
 *         properties:
 *           uniqueId:
 *             type: "string"
 *           vendor:
 *             type: "string"
 *     responses:
 *       200:
 *         description: 로그인 (JWT 토큰을 돌려줌)
 *       201:
 *         description: 회원가입 (JWT 토큰을 돌려줌)
 *       422:
 *         description: 로그인 또는 회원가입 성공
 */
router.post("/login", hasValidLoginBody, AuthController.login);

export default router;
