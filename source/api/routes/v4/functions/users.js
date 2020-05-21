const selectUsers = async (connection, fridgeID) => connection.query('SELECT user_id AS userID, name, role, intolerances, created_ts AS createdTS FROM v4_users WHERE fridge_id=?', [fridgeID]);

const insertUser = async (connection, fridgeID, name, role, intolerances) => connection.query('INSERT IGNORE INTO v4_users (fridge_id, name, role, intolerances) VALUES (?, ?, ?, ?)', [fridgeID, name, role, intolerances.join(',')]);

const deleteUser = async (connection, userID, fridgeID) => connection.query('DELETE FROM v4_users WHERE user_id=? AND fridge_id=?', [userID, fridgeID]);

module.exports = {
  selectUsers,
  insertUser,
  deleteUser,
};
