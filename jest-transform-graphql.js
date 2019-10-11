module.exports = {
  process: src => {
    return `module.exports=${JSON.stringify(src)};module.exports.default=module.exports;`;
  },
};
