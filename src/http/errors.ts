export class OktopostError extends Error {
  readonly statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'OktopostError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class OktopostApiError extends OktopostError {
  readonly errors?: Record<string, { Error: string }>;

  constructor(message: string, statusCode: number, errors?: Record<string, { Error: string }>) {
    super(message, statusCode);
    this.name = 'OktopostApiError';
    this.errors = errors;
  }

  static fromResponse(
    statusCode: number,
    data: { Errors?: Record<string, { Error: string }> },
  ): OktopostApiError {
    const apiErrorMessage = data.Errors?.API?.Error ?? 'Unknown API error';
    return new OktopostApiError(apiErrorMessage, statusCode, data.Errors);
  }
}

export class OktopostAuthError extends OktopostError {
  constructor(message: string = 'Authentication failed: invalid Account ID or API Key') {
    super(message, 401);
    this.name = 'OktopostAuthError';
  }
}

export class OktopostPermissionError extends OktopostApiError {
  constructor(message: string = 'Insufficient permissions for this resource') {
    super(message, 403);
    this.name = 'OktopostPermissionError';
  }
}

export class OktopostNotFoundError extends OktopostApiError {
  constructor(message: string = 'The requested resource was not found') {
    super(message, 404);
    this.name = 'OktopostNotFoundError';
  }
}

export class OktopostRateLimitError extends OktopostError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
    this.name = 'OktopostRateLimitError';
  }
}

export class OktopostTimeoutError extends OktopostError {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'OktopostTimeoutError';
  }
}
