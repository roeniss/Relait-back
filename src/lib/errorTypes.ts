class InvalidTokenType extends Error {
  constructor() {
    super("InvalidTokenType");
    Object.setPrototypeOf(this, InvalidTokenType.prototype);
  }
}
class EmptyTokenValue extends Error {
  constructor() {
    super("EmptyTokenValue");
    Object.setPrototypeOf(this, EmptyTokenValue.prototype);
  }
}

export { InvalidTokenType, EmptyTokenValue };
