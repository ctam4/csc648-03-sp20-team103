export const initialState = {
  keywords: '',
};

export const inventoryAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INVENTORYADD_SET_KEYWORDS': {
      return {
        ...state,
        keywords: action.keywords,
      };
    }
    default: {
      return state;
    }
  }
};
