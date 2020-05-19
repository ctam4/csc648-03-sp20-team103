const validateSession = (connection, session) => {
  connection.query('SELECT fridge_id AS fridgeID FROM v4_sessions WHERE session=? AND expires_ts >= CURRENT_TIMESTAMP', [session])
    .then((rows) => {
      if (rows.length === 1) {
        return rows[0].fridgeID;
      }
      return null;
    });
};

module.exports = {
  validateSession,
};
