//sql.js
// SQL语句封裝
var user = {
    insert1:'INSERT INTO users(name, phone) VALUES(?,?)',
    update:'UPDATE user SET name=?, age=? WHERE id=?',
    delete: 'DELETE FROM users WHERE phone=?',
    queryById: 'SELECT * FROM users WHERE id=?',
    queryByName: 'SELECT * FROM users WHERE name=?',
    queryAll: 'SELECT * FROM users'
};
module.exports = user;