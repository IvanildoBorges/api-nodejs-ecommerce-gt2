import { NextFunction, Request, Response } from 'express';
import xss from 'xss';

// Função recursiva: sanitiza apenas strings (mantém números, arrays, null, etc.)
function deepSanitize(value: any): any {
    if (typeof value === 'string') {
        return xss(value);
    }

    if (Array.isArray(value)) {
        return value.map(deepSanitize);
    }

    if (value !== null && typeof value === 'object') {
        const sanitized: Record<string, any> = {};
        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                sanitized[key] = deepSanitize(value[key]);
            }
        }
        return sanitized;
    }

    return value; // retorna número, boolean, null, undefined, etc.
}

const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body = deepSanitize(req.body);

    for (const key in req.query) {
        req.query[key] = deepSanitize(req.query[key]);
    }

    for (const key in req.params) {
        req.params[key] = deepSanitize(req.params[key]);
    }

    next();
};

export default sanitizeMiddleware;
