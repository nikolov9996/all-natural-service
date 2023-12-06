import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path, baseUrl, body } = req;
    console.log(`REQ: [${method}]: ${baseUrl}${path}`);

    if (Object.keys(body).length) {
      console.log(`BODY: ${JSON.stringify(body, null, 2)}`);
    }

    next();
  }
}
