import * as React from "react";
import CreateReactClass from "create-react-class";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../../stores/horizontal-prototype/store";

import { StyleSheet, View, ScrollView, Text } from "react-native";
import LocalizedStrings from "react-localization";

import FixedLabelTextbox from "../../components/horizontal-prototype/FixedLabelTextbox";
import FloatingSave from "../../components/horizontal-prototype/FloatingSave";
import DialogHeader from "../../components/horizontal-prototype/DialogHeader";

let strings = new LocalizedStrings({
  en: {
    recipe_info: "Recipe info",
    name: "Name",
    serving_size: "Serving size",
    cooking_time: "Cooking time",
    ingredients: "Ingredients",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    height: 684,
    marginTop: 56,
    alignSelf: "center"
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column"
  },
  recipeInfo: {
    height: 14,
    color: "#121212",
    alignSelf: "stretch",
    margin: 15,
    fontFamily: "Roboto"
  },
  materialFixedLabelTextbox: {
    height: 43,
    backgroundColor: "rgba(230, 230, 230,1)",
    alignSelf: "stretch",
    margin: 15
  },
  materialFixedLabelTextbox1: {
    height: 43,
    backgroundColor: "rgba(230, 230, 230,1)",
    alignSelf: "stretch",
    margin: 15
  },
  materialFixedLabelTextbox2: {
    height: 43,
    backgroundColor: "rgba(230, 230, 230,1)",
    alignSelf: "stretch",
    margin: 15
  },
  ingredients3: {
    height: 14,
    color: "#121212",
    alignSelf: "stretch",
    margin: 15,
    fontFamily: "Roboto"
  },
  floatingSave: {
    bottom: 15,
    width: 56,
    height: 56,
    position: "absolute",
    right: 15
  },
  materialHeader1: {
    minWidth: 360,
    width: "100%",
    height: 56,
    marginTop: -740
  }
});

export default CreateReactClass({
  render: function() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <View style={styles.scrollArea1}>
            <ScrollView
              contentContainerStyle={styles.scrollArea1_contentContainerStyle}
            >
              <Text style={styles.recipeInfo}>{strings.recipe_info}</Text>
              <FixedLabelTextbox
                text1={strings.name}
                style={styles.materialFixedLabelTextbox}
              ></FixedLabelTextbox>
              <FixedLabelTextbox
                text1={strings.serving_size}
                textInput1=""
                style={styles.materialFixedLabelTextbox1}
              ></FixedLabelTextbox>
              <FixedLabelTextbox
                text1={strings.cooking_time}
                style={styles.materialFixedLabelTextbox2}
              ></FixedLabelTextbox>
              <Text style={styles.ingredients3}>{strings.ingredients}</Text>
            </ScrollView>
          </View>
          <FloatingSave style={styles.floatingSave}></FloatingSave>
          <DialogHeader style={styles.materialHeader1}></DialogHeader>
        </View>
        </PersistGate>
      </Provider>
    );
  },
});
