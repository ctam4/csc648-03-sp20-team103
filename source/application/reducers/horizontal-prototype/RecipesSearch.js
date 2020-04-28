export const initialState = {
  keywords: '',
};

export const recipesSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECIPESSEARCH_SET_KEYWORDS': {
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
