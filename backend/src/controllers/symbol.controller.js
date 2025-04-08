const { userService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const addSymbol = catchAsync(async (req, res) => {
  const symbol = await userService.createUser();
});

const removeSymbol = catchAsync(async (req, res) => {
  await userService.deleteUserById();
});

const getHistories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['period']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

module.exports = {
  addSymbol,
  removeSymbol,
  getHistories,
};
