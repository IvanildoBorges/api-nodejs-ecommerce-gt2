import rateLimit from 'express-rate-limit';

// Máximo de requisições permitidas por IP em 15min (contra ataques DoS)
const rateLimiter = rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: 'Muitas requisições. Tente novamente mais tarde.'
});

export default rateLimiter;