const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signToken(payload) {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

function verifyToken(token) {
    return jwt.verify(token, env.jwtSecret);
}

const cookieOptions = {
    httpOnly: true,
    secure: env.isProd,
    sameSite: env.isProd ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
};

module.exports = { signToken, verifyToken, cookieOptions };
