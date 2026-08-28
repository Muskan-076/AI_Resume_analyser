const {rateLimit, ipKeyGenerator} = require('express-rate-limit');

const analyzeLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // limit each IP to 5 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req, res) => 
         req.user?._id?.toString() || ipKeyGenerator(req, res),
    
    message: {
        error: {message: "Too many requests from this IP, please try again after a minute"},
    },
});

const authLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 30, // limit each IP to 30 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req, res) => ipKeyGenerator(req, res),
    message: {
        error: {message: "Too many requests from this IP, please try again after a minute"},
    },
});

module.exports = {analyzeLimiter, authLimiter};