const selectInventory = async (connection, fridgeID, inventoryID, state, page, limit, sort, descending) => {
  let sql = 'SELECT inventory_id AS inventoryID, ingredient_id AS ingredientID, expiration_date AS expirationDate, total_quantity AS totalQuantity, unit, price FROM v4_inventory WHERE fridge_id=?';
  if (inventoryID !== null) {
    sql += ' AND inventory_id=?';
  }
  switch (state) {
    case 'stored':
      sql += ' AND total_quantity > 0';
      break;
    case 'expired':
      sql += ' AND total_quantity > 0 AND expiration_date IS NOT NULL AND expiration_date <= CURRENT_TIMESTAMP';
      break;
  }
  switch (sort) {
    case 'expiration_date':
      sql += ' ORDER BY ' + sort;
      if (!descending) {
        sql += ' ASC';
      } else {
        sql += ' DESC';
      }
      break;
  }
  sql += ' LIMIT ? OFFSET ?';
  if (inventoryID === null) {
    return await connection.query(sql, [fridgeID, limit, (page - 1) * limit]);
  } else {
    return await connection.query(sql, [fridgeID, inventoryID, limit, (page - 1) * limit]);
  }
};

const insertInventoryLog = async (connection, invetoryID, userID, quantity, unit, action) => {
  return await await connection.query('INSERT IGNORE INTO v4_inventory_log (inventory_id, user_id, quantity, unit, action) VALUES (?, ?, ?, ?, ?)', [invetoryID, userID, quantity, unit, action]);
};

const insertInventory = async (connection, fridgeID, ingredientID, expirationDate, totalQuantity, unit, price) => {
  return await connection.query('INSERT IGNORE INTO v4_inventory (fridge_id, ingredient_id, expiration_date, total_quantity, unit, price) VALUES (?, ?, FROM_UNIXTIME(?), ?, ?, ?)', [fridgeID, ingredientID, expirationDate, totalQuantity, unit, price]);
};

const updateInventory = async (connection, inventoryID, totalQuantity) => {
  return await connection.query('UPDATE v4_inventory SET total_quantity=? WHERE inventory_id=?', [totalQuantity, inventoryID]);
};

module.exports = {
  selectInventory,
  insertInventoryLog,
  insertInventory,
  updateInventory,
};
