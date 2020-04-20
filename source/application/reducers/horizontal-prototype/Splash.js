export const initialState = {
  sn: "",
  pin: "",
};

export const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SPLASH_SET_SN': {
      return {
        ...state,
        sn: action.sn,
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
