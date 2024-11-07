export const StatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
};

export const ReasonStatusCode = {
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  CONFLICT: 'Conflict',
  GONE: 'Gone',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class ErrorResponse extends Error {
  constructor(
    public message: string,
    public status: number,
  ) {
    super(message);
  }
}

export class ConflictError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT) {
    super(message, StatusCode.CONFLICT);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message = ReasonStatusCode.NOT_FOUND) {
    super(message, StatusCode.NOT_FOUND);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.BAD_REQUEST) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(message = ReasonStatusCode.UNAUTHORIZED) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message = ReasonStatusCode.FORBIDDEN) {
    super(message, StatusCode.FORBIDDEN);
  }
}

export class InternalServerError extends ErrorResponse {
  constructor(message = ReasonStatusCode.INTERNAL_SERVER_ERROR) {
    super(message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}

export class GoneError extends ErrorResponse {
  constructor(message = ReasonStatusCode.GONE) {
    super(message, StatusCode.GONE);
  }
}
