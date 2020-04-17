import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import FixedLabelTextbox from "../components/horizontal-prototype/FixedLabelTextbox";
import FloatingSave from "../components/horizontal-prototype/FloatingSave";
import DialogHeader from "../components/horizontal-prototype/DialogHeader";

function RecipesCreate(props) {
  return (
    <View style={styles.container}>
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        >
          <Text style={styles.recipeInfo}>Recipe info</Text>
          <FixedLabelTextbox
            text1=strings.name
            style={styles.materialFixedLabelTextbox}
          ></FixedLabelTextbox>
          <FixedLabelTextbox
            text1=strings.servingSize
            textInput1=""
            style={styles.materialFixedLabelTextbox1}
          ></FixedLabelTextbox>
          <FixedLabelTextbox
            text1=strings.cookingTime
            style={styles.materialFixedLabelTextbox2}
          ></FixedLabelTextbox>
          <Text style={styles.ingredients3}>Ingredients</Text>
          <FloatingSave
            button1=strings.recipes
            style={styles.floatingSave}
          ></FloatingSave>
        </ScrollView>
      </View>
      <DialogHeader style={styles.materialHeader1}></DialogHeader>
    </View>
  );
}

let strings = new LocalizedStrings({
  en: {
    name: "Name",
    servingSize: "Serving Size",
    cookingTime: "Cooking Time",
    recipes: "Recipes",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea1: {
    width: 360,
    height: 684,
    marginTop: 56,
    alignSelf: "center"
  },
  scrollArea1_contentContainerStyle: {
    width: 360,
    height: 3420,
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
    top: 613,
    width: 56,
    height: 56,
    position: "absolute",
    right: 15
  },
  materialHeader1: {
    width: 360,
    height: 56,
    marginTop: -740
  }
});

export default RecipesCreate;
