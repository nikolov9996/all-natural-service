import { NotFoundException, HttpStatus } from '@nestjs/common';

function notFoundException(message: string) {
  throw new NotFoundException(message);
}

function errorMessage(response, message: string) {
  return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: message,
    error: 'Bad Request',
  });
}

export const httpErrorMessages = {
  errorMessage,
  notFoundException,
};
