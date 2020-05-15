export const initialState = {
  inventoryID: null,
  name: '',
  image: '',
  quantity: 0.0,
  unit: '',
  price: 0,
  expirationDate: '',
};

export const inventoryViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INVENTORYVIEW_SET_INVENTORYID': {
      return {
        ...state,
        inventoryID: action.inventoryID,
      };
    }
    case 'INVENTORYVIEW_SET_NAME': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'INVENTORYVIEW_SET_IMAGE': {
      return {
        ...state,
        image: action.image,
      };
    }
    case 'INVENTORYVIEW_SET_QUANTITY': {
      return {
        ...state,
        quantity: action.quantity,
      };
    }
    case 'INVENTORYVIEW_SET_UNIT': {
      return {
        ...state,
        unit: action.unit,
      };
    }
    case 'INVENTORYVIEW_SET_PRICE': {
      return {
        ...state,
        price: action.price,
      };
    }
    case 'INVENTORYVIEW_SET_EXPIRATIONDATE': {
      return {
        ...state,
        expirationDate: action.expirationDate,
      };
    }
    default: {
      return state;
    }
  }
};
