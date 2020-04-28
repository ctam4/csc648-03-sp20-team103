export const initialState = {
  serial_number: '',
  pin: '',
};

export const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SPLASH_SET_SERIAL_NUMBER': {
      return {
        ...state,
        serial_number: action.serial_number,
      };
    }
    case 'SPLASH_SET_PIN': {
      return {
        ...state,
        pin: action.pin,
      };
    }
    default: {
      return state;
    }
  }
};
