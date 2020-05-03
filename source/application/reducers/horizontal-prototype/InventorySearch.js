export const initialState = {
  searchOpen: false,
  keywords: '',
};

export const inventorySearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INVENTORYSEARCH_SET_SEARCHOPEN': {
      return {
        ...state,
        searchOpen: action.searchOpen,
      };
    }
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
