export const initialState = {
  name: "",
  serving_size: "",
  cooking_time: "",
};

export const recipesCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECIPESCREATE_SET_NAME': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'RECIPESCREATE_SET_SERVING_SIZE': {
      return {
        ...state,
        serving_size: action.serving_size,
      };
    }
    case 'RECIPESCREATE_SET_COOKING_TIME': {
      return {
        ...state,
        cooking_time: action.cooking_time,
      };
    }
    default: {
      return state;
    }
  }
};
