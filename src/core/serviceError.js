const NOT_FOUND = 'NOT_FOUND';
const VALIDATION_FAILED = 'VALIDATION_FAILED';
const UNAUTHORIZED = 'UNAUTHORIZED';
const FORBIDDEN = 'FORBIDDEN';

/**
 * @class ServiceError
 * @extends Error
 *
 * @property {string} code The error code
 * @property {string} message The error message
 * @property {object} details The error details
 */
class ServiceError extends Error {
  /**
   * @param {string} code The error code
   * @param {string} message The error message
   * @param {object} details The error details
   */
  constructor(code, message, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'ServiceError';
  }

  /**
   * Create a not found error
   * @param {string} message The error message
   * @param {object} details The error details
   *
   * @return {ServiceError} The not found error
   */
  static notFound(message, details) {
    return new ServiceError(NOT_FOUND, message, details);
  }

  /**
   * Create a validation failed error
   * @param {string} message The error message
   * @param {object} details The error details
   *
   * @return {ServiceError} The validation failed error
   */
  static validationFailed(message, details) {
    return new ServiceError(VALIDATION_FAILED, message, details);
  }

  /**
   * Create an unauthorized error
   * @param {string} message The error message
   * @param {object} details The error details
   *
   * @return {ServiceError} The unauthorized error
   */
  static unauthorized(message, details) {
    return new ServiceError(UNAUTHORIZED, message, details);
  }

  /**
   * Create a forbidden error
   * @param {string} message The error message
   * @param {object} details The error details
   *
   * @return {ServiceError} The forbidden error
   */
  static forbidden(message, details) {
    return new ServiceError(FORBIDDEN, message, details);
  }

  /**
   * check if the error is a not found error
   *
   * @return {boolean} Whether the error is a not found error
   */
  get isNotFound() {
    return this.code === NOT_FOUND;
  }

  /**
   * check if the error is a validation failed error
   *
   * @return {boolean} Whether the error is a validation failed error
   */
  get isValidationFailed() {
    return this.code === VALIDATION_FAILED;
  }

  /**
   * check if the error is an unauthorized error
   *
   * @return {boolean} Whether the error is an unauthorized error
   */
  get isUnauthorized() {
    return this.code === UNAUTHORIZED;
  }

  /**
   * check if the error is a forbidden error
   *
   * @return {boolean} Whether the error is a forbidden error
   */
  get isForbidden() {
    return this.code === FORBIDDEN;
  }
}

module.exports = ServiceError;
