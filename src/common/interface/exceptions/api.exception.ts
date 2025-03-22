import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code: string = 'UNKNOWN_ERROR'
  ) {
    super(
      {
        status,
        success: false,
        error: {
          code,
          message,
        },
        timestamp: new Date().toISOString(),
      },
      status
    );
  }
}