export const SuccessCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
};

export const ReasonSuccessCode = {
  OK: 'OK',
  CREATED: 'Created',
  ACCEPTED: 'Accepted',
  NO_CONTENT: 'No content',
};

export class SuccessResponse<T> {
  constructor(
    public message: string,
    public status: number,
    public data?: T,
  ) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export class OkResponse<T> extends SuccessResponse<T> {
  constructor(message = ReasonSuccessCode.OK, data?: T) {
    super(message, SuccessCode.OK, data);
  }
}

export class CreatedResponse<T> extends SuccessResponse<T> {
  constructor(message = ReasonSuccessCode.CREATED, data?: T) {
    super(message, SuccessCode.CREATED, data);
  }
}

export class AcceptedResponse<T> extends SuccessResponse<T> {
  constructor(data: T, message = ReasonSuccessCode.ACCEPTED) {
    super(message, SuccessCode.ACCEPTED, data);
  }
}

export class NoContentResponse extends SuccessResponse<null> {
  constructor(message = ReasonSuccessCode.NO_CONTENT) {
    super(message, SuccessCode.NO_CONTENT);
  }
}
