const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json());
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: process.env.API_TIME_PERIOD * 60 * 1000, // 1 minute in milliseconds
    max: process.env.API_RATE_LIMIT,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            status: 'fail',
            message: `You have exceeded the ${process.env.API_RATE_LIMIT} requests in ${process.env.API_TIME_PERIOD} minute limit!`,
            retryAfter: `${process.env.API_TIME_PERIOD} minutes`,
        });
    },
});

app.use(limiter);
const port = process.env.SERVER_PORT
const hostName = process.env.HOST_NAME

const rateLimitOnIp = new Map();

app.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}`);
})

app.get('/', (req, res) => {

    const resetTime = req.rateLimit?.resetTime;
    let remainingSeconds = 0;

    if (resetTime instanceof Date) {
      const now = Date.now();
      remainingSeconds = Math.ceil((resetTime.getTime() - now) / 1000);
    }
    if (rateLimitOnIp.has(req.ip)) {
        rateLimitOnIp.set(req.ip, rateLimitOnIp.get(req.ip) + 1);
    } else {
        rateLimitOnIp.set(req.ip, 1);
    }
    res.send({ message: 'Welcome to Paywize API', 
        remainingRequests: process.env.API_RATE_LIMIT - rateLimitOnIp.get(req.ip),
    resetIn:remainingSeconds });
    
})