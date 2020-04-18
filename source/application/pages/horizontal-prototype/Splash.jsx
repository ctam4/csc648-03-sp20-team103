import * as React from "react";
import CreateReactClass from "create-react-class";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../../stores/horizontal-prototype/store";

import { StyleSheet, View, Text } from "react-native";
import LocalizedStrings from "react-localization";

import StackedLabelTextbox from "../../components/horizontal-prototype/StackedLabelTextbox";
import MaterialButtonDark from "../../components/horizontal-prototype/MaterialButtonDark";
import MaterialButtonWithVioletText from "../../components/horizontal-prototype/MaterialButtonWithVioletText";

let strings = new LocalizedStrings({
  en: {
    login: "Login",
    register: "Register",
    sn: "Serial Number",
    username: "Username",
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
    width: 100,
    height: 36,
    marginTop: 45,
    alignSelf: "center",
  },
  materialButtonWithVioletText: {
    width: 100,
    height: 36,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default CreateReactClass({
  render: function() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <Text style={styles.stockUp}>STOCK UP</Text>
            <StackedLabelTextbox
              text1={strings.sn}
              textInput1=""
              style={styles.stackedLabelTextbox}
            ></StackedLabelTextbox>
            <StackedLabelTextbox
              text1={strings.username}
              textInput1=""
              style={styles.stackedLabelTextbox1}
            ></StackedLabelTextbox>
            <MaterialButtonDark
              text1={strings.login}
              style={styles.materialButtonDark}
              //onPress={() => alert('login')}
            ></MaterialButtonDark>
            <MaterialButtonWithVioletText
              text1={strings.register}
              style={styles.materialButtonWithVioletText}
              //onPress={() => alert('login')}
            ></MaterialButtonWithVioletText>
          </View>
        </PersistGate>
      </Provider>
    );
  },
});
