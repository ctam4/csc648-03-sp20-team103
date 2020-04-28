export const initialState = {
  keywords: '',
};

export const inventorySearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INVENTORYSEARCH_SET_KEYWORDS': {
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
