const allRoles = {
  user: ['searchSymbol'],
  admin: ['getUsers', 'manageUsers', 'manageSymbols', 'searchSymbol'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
