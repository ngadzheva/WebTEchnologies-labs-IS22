import { Request, Response } from 'express';

const errorHandler = (callback: (req: Request, res: Response, next: () => void) => void) => {
    return async (req: Request, res: Response, next: () => void) => {
        try {
            await callback(req, res, next);
        } catch(error) {
            console.error(error);

            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export default errorHandler;