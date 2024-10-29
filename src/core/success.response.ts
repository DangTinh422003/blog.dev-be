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
    public data: T,
    public message: string,
    public status: number,
  ) {}
}

export class OkResponse<T> extends SuccessResponse<T> {
  constructor(data: T, message = ReasonSuccessCode.OK) {
    super(data, message, SuccessCode.OK);
  }
}

export class CreatedResponse<T> extends SuccessResponse<T> {
  constructor(data: T, message = ReasonSuccessCode.CREATED) {
    super(data, message, SuccessCode.CREATED);
  }
}

export class AcceptedResponse<T> extends SuccessResponse<T> {
  constructor(data: T, message = ReasonSuccessCode.ACCEPTED) {
    super(data, message, SuccessCode.ACCEPTED);
  }
}

export class NoContentResponse extends SuccessResponse<null> {
  constructor(message = ReasonSuccessCode.NO_CONTENT) {
    super(null, message, SuccessCode.NO_CONTENT);
  }
}
