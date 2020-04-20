import React, { useReducer } from "react";
import { useCookies } from "react-cookie";

//import { recipesCreateReducer, initialState } from "../../reducers/horizontal-prototype/RecipesCreate";

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
    flex: 1,
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    height: 684,
    marginTop: 56,
    alignSelf: "center",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  recipeInfo: {
    height: 14,
    color: "#121212",
    alignSelf: "stretch",
    margin: 15,
    fontFamily: "Roboto",
  },
  materialFixedLabelTextbox: {
    height: 43,
    backgroundColor: "rgba(230, 230, 230,1)",
    alignSelf: "stretch",
    margin: 15,
  },
  materialFixedLabelTextbox1: {
    height: 43,
    backgroundColor: "rgba(230, 230, 230,1)",
    alignSelf: "stretch",
    margin: 15,
  },
  materialFixedLabelTextbox2: {
    height: 43,
    backgroundColor: "rgba(230, 230, 230,1)",
    alignSelf: "stretch",
    margin: 15,
  },
  ingredients3: {
    height: 14,
    color: "#121212",
    alignSelf: "stretch",
    margin: 15,
    fontFamily: "Roboto",
  },
  floatingSave: {
    bottom: 15,
    width: 56,
    height: 56,
    position: "absolute",
    right: 15,
  },
  materialHeader1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);
  //const [state, dispatch] = useReducer(recipesCreateReducer, initialState);

  return (
    <View style={styles.container}>
      <View style={styles.scrollArea1}>
        <DialogHeader style={styles.materialHeader1}></DialogHeader>
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
    </View>
  );
};
