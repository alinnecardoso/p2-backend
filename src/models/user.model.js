let users = [];
let idCounter = 1;

class User {
  static create(data) {
    const newUser = { id: idCounter++, ...data };
    users.push(newUser);
    return newUser;
  }

  static findAll() {
    return users;
  }

  static findById(id) {
    return users.find((user) => user.id === parseInt(id));
  }

  static update(id, data) {
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    return users[index];
  }

  static delete(id) {
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index === -1) return null;
    const deleted = users[index];
    users.splice(index, 1);
    return deleted;
  }
}

module.exports = User;
