import React, { useEffect, useReducer } from "react";
import { useCookies } from "react-cookie";

import { splashReducer, initialState } from "../../reducers/horizontal-prototype/Splash";
import { setSerialNumber, setPIN } from "../../actions/horizontal-prototype/Splash";

import { StyleSheet, View, Text } from "react-native";
import LocalizedStrings from "react-localization";

import MaterialTextField from "../../components/horizontal-prototype/MaterialTextField";
import MaterialButton from "../../components/horizontal-prototype/MaterialButton";

let apiUrl = location.protocol + '//' + (process.env.API_HOST || location.hostname);
if (process.env.API_PORT) {
  apiUrl += ":" + process.env.API_PORT;
}

let strings = new LocalizedStrings({
  en: {
    continue: "Continue",
    serial_number: "Serial number",
    serial_number_helper: "This is located in the front of interior or exterior of your fridge.",
    pin: "PIN",
    pin_helper: "This is the PIN number to log-in to your fridge.",
  },
});
const styles = StyleSheet.create({
  container: {
    width: 320,
    margin: "auto",
  },
  stockUp: {
    color: "rgba(65,117,5,1)",
    fontSize: 60,
    fontWeight: "100",
    fontFamily: "Roboto",
    marginBottom: 50,
    alignSelf: "center",
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id", "fridge_id"]);
  const [state, dispatch] = useReducer(splashReducer, initialState);

  useEffect(() => {
    dummySetup();
  }, []);

  const dummySetup = async () => {
    // for dummy fridge
    await fetch(apiUrl + '/v2/fridges', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serial_number: state.serial_number,
        pin: state.pin,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      setCookie("fridge_id", data);
      console.log('Dummy fridge setup successful.');
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
        serial_number: state.serial_number,
        pin: state.pin,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      setCookie("session_id", data.fridge_id);
      console.log('Login successful.');
      window.location.href = './inventory';
      //window.location.href = './auth';
    })
    .catch(console.log);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.stockUp}>STOCK UP</Text>
      <MaterialTextField
        label={strings.serial_number}
        helperText={strings.serial_number_helper}
        onChange={(e) => dispatch(setSerialNumber(e.target.value))}
        onTrailingIconSelect={() => dispatch(setSerialNumber(""))}
      ></MaterialTextField>
      <MaterialTextField
        label={strings.pin}
        helperText={strings.pin_helper}
        onChange={(e) => dispatch(setPIN(e.target.value))}
        onTrailingIconSelect={() => dispatch(setPIN(""))}
      ></MaterialTextField>
      <MaterialButton onClick={handleAuth} raised>{strings.continue}</MaterialButton>
    </View>
  );
};
