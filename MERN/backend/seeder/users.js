const bcrypt = require("bcryptjs")

const users = [
  {
    name: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
  },
  {
    name: 'Khoa',
    lastName: 'Nguyen',
    email: 'anhkhoace@gmail.com',
    password: bcrypt.hashSync('anhkhoace@gmail.com', 10),
  },
]

module.exports = users
