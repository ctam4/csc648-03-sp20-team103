export const initialState = {
  searchOpen: true,
  keywords: '',
};

export const recipesSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECIPESSEARCH_SET_SEARCHOPEN': {
      return {
        ...state,
        searchOpen: action.searchOpen,
      };
    }
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
