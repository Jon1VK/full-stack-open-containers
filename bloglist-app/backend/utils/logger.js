const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

const noop = () => {};

const logger =
  process.env.NODE_ENV === "test"
    ? {
        info: noop,
        error: noop,
      }
    : {
        info,
        error,
      };

module.exports = logger;
