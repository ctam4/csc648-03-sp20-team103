const selectMealPlans = (connection, userID, plannedDate) => {
  return connection.query('SELECT meal_plan_id AS mealPlanID, user_id AS userID, recipe_id AS recipeID, planned_ts AS plannedTS FROM v4_meal_plans WHERE user_id=? AND planned_ts >= FROM_UNIXTIME(?) AND planned_ts < FROM_UNIXTIME(?)', [userID, plannedDate, plannedDate + 60 * 60 * 24])
};

const insertMealPlan = (connection, userID, recipeID, plannedDate) => {
  return connection.query('INSERT INTO v4_meal_plans (user_id, recipe_id, planned_ts) VALUES (?, ?, ?)', [userID, recipeID, plannedDate]);
};

const updateMealPlan = (connection, mealPlanID, recipeID) => {
  return connection.query('UPDATE IGNORE meal_plans SET recipe_id=? WHERE meal_plan_id=?', [recipeID, mealPlanID]);
};

module.exports = {
  selectMealPlans,
  insertMealPlan,
  updateMealPlan,
};
