const VALIDATOR = {
  match(input, pattern) {
    return pattern.test(input);
  },
  minLength(input, min) {
    return input.length >= min;
  },
  maxLength(input, max) {
    return input.length <= max;
  },
};
