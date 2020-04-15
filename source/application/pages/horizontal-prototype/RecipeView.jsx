import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import DialogHeader from "../components/horizontal-prototype/DialogHeader";
import RecipeCardFull from "../components/horizontal-prototype/RecipeCardFull";

function RecipeView(props) {
  return (
    <View style={styles.container}>
      <DialogHeader
        button1=strings.goBack
        style={styles.materialHeader1}
      ></DialogHeader>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <RecipeCardFull
            text1=strings.recipeName
            text2=strings.servingsAndCalories
            text3=strings.save
            text4=strings.addToCart
            style={styles.materialCard6}
          ></RecipeCardFull>
        </ScrollView>
      </View>
    </View>
  );
}

let strings = new LocalizedStrings({
  en: {
    goBack: "Go Back",
    recipeName: "Recipe Name",
    servingsAndCalories: "# servings / # calories per serving",
    save: "SAVE",
    addToCart: "ADD TO CART",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialHeader1: {
    width: 360,
    height: 56
  },
  scrollArea: {
    width: 360,
    height: 684,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  scrollArea_contentContainerStyle: {
    flexDirection: "column"
  },
  materialCard6: {
    width: 330,
    height: 696,
    margin: 15
  }
});

export default RecipeView;
