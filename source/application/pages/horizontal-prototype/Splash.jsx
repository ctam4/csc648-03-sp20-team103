import React, { useEffect, useReducer } from "react";
import { useCookies } from "react-cookie";

import { splashReducer, initialState } from "../../reducers/horizontal-prototype/Splash";
import { setSerialNumber, setPIN } from "../../actions/horizontal-prototype/Splash";

import { StyleSheet, View, Text } from "react-native";
import LocalizedStrings from "react-localization";

import StackedLabelTextbox from "../../components/horizontal-prototype/StackedLabelTextbox";
import MaterialButtonDark from "../../components/horizontal-prototype/MaterialButtonDark";

let apiUrl = location.protocol + '//' + (process.env.API_HOST || location.hostname);
if (process.env.API_PORT) {
  apiUrl += ":" + process.env.API_PORT;
}

let strings = new LocalizedStrings({
  en: {
    continue: "Continue",
    serial_number: "Serial number",
    pin: "PIN",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stockUp: {
    color: "rgba(65,117,5,1)",
    fontSize: 60,
    fontWeight: "100",
    fontFamily: "Roboto",
    marginTop: 223,
    alignSelf: "center",
  },
  stackedLabelTextbox: {
    width: 270,
    height: 60,
    marginTop: 37,
    alignSelf: "center",
  },
  stackedLabelTextbox1: {
    width: 270,
    height: 60,
    alignSelf: "center",
  },
  materialButtonDark: {
    minWidth: 100,
    height: 36,
    marginTop: 45,
    alignSelf: "center",
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["Session"]);
  const [state, dispatch] = useReducer(splashReducer, initialState);

  useEffect(() => {
    dummySetup().then((data) => {
      dispatch(setSerialNumber(data.serialNumber));
      dispatch(setPIN(data.pin));
    }).catch(console.log);
  }, []);

  const dummySetup = () => {
    // for dummy fridge
    return fetch(apiUrl + '/v2/fridges', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .catch(console.log);
  };

  const handleAuth = async () => {
    await fetch(apiUrl + '/v2/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serialNumber: state.serial_number,
        pin: state.pin,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }

      return res.json()
    })
    .then((data) => {
      console.log(data);
      setCookie("Session", data.session, {
        //httpOnly: true,
        expires: new Date(data.expires_ts)
      });
      console.log('Login successful.');
      window.location.href = './inventory';
      //window.location.href = './auth';
    })
    .catch(console.log);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.stockUp}>STOCK UP</Text>
      <StackedLabelTextbox
        text1={strings.serial_number}
        textInput1={state.serial_number}
        value={state.serial_number}
        style={styles.stackedLabelTextbox}
        onChange={(e) => dispatch(setSerialNumber(e.target.value))}
      ></StackedLabelTextbox>
      <StackedLabelTextbox
        text1={strings.pin}
        textInput1={state.pin}
        value={state.pin}
        style={styles.stackedLabelTextbox1}
        onChange={(e) => dispatch(setPIN(e.target.value))}
      ></StackedLabelTextbox>
      <MaterialButtonDark
        text1={strings.continue}
        style={styles.materialButtonDark}
        onPress={handleAuth}
      ></MaterialButtonDark>
    </View>
  );
};
