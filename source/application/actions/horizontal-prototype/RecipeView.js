export const setRecipeID = (recipeID) => ({
  type: 'RECIPEVIEW_SET_RECIPEID',
  inventoryID: inventoryID,
});

export const setTitle = (title) => ({
  type: 'RECIPEVIEW_SET_TITLE',
  title: title,
});

export const setImage = (image) => ({
  type: 'RECIPEVIEW_SET_IMAGE',
  image: image,
});

export const setServings = (servings) => ({
  type: 'RECIPEVIEW_SET_QUANTITY',
  servings: servings,
});

export const setCookingTime = (cookingTime) => ({
  type: 'RECIPEVIEW_SET_COOKINGTIME',
  cookingTime: cookingTime,
});

export const setInstructions = (instructions) => ({
  type: 'RECIPEVIEW_SET_INSTRUCTIONS',
  instructions: instructions,
});

export const setIngredients = (ingredients) => ({
  type: 'RECIPEVIEW_SET_INGREDIENTS',
  ingredients: ingredients,
});
