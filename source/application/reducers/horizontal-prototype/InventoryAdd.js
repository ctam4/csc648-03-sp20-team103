export const initialState = {
  searchOpen: false,
  keywords: '',
};

export const inventoryAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INVENTORYADD_SET_SEARCHOPEN': {
      return {
        ...state,
        searchOpen: action.searchOpen,
      };
    }
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
