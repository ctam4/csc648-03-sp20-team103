export const initialState = {
  recipeID: null,
  title: '',
  image: '',
  servings: 0,
  cookingTime: 0,
  instructions: '',
  ingredients: [],
};

export const recipeViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECIPEVIEW_SET_RECIPEID': {
      return {
        ...state,
        recipeID: action.recipeID,
      };
    }
    case 'RECIPEVIEW_SET_TITLE': {
      return {
        ...state,
        title: action.title,
      };
    }
    case 'RECIPEVIEW_SET_IMAGE': {
      return {
        ...state,
        image: action.image,
      };
    }
    case 'RECIPEVIEW_SET_SERVINGS': {
      return {
        ...state,
        servings: action.servings,
      };
    }
    case 'RECIPEVIEW_SET_COOKINGTIME': {
      return {
        ...state,
        cookingTime: action.cookingTime,
      };
    }
    case 'RECIPEVIEW_SET_INSTRUCTIONS': {
      return {
        ...state,
        instructions: action.instructions,
      };
    }
    case 'RECIPEVIEW_SET_INGREDIENTS': {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    default: {
      return state;
    }
  }
};
