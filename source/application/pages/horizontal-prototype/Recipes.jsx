import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AppHeader from "../components/horizontal-prototype/AppHeader";
import RecipeCard from "../components/horizontal-prototype/RecipeCard";
import MaterialToast1 from "../components/horizontal-prototype/MaterialToast1";
import FloatingCreate from "../components/horizontal-prototype/FloatingCreate";

function Recipes(props) {
  return (
    <View style={styles.container}>
      <AppHeader
        button2=strings.recipeSearch
        text1=strings.recipes
        style={styles.materialHeader1}
      ></AppHeader>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <RecipeCard
            button2=strings.recipeView
            style={styles.recipeCard}
          ></RecipeCard>
          <RecipeCard style={styles.recipeCard1}></RecipeCard>
          <MaterialToast1
            text1=recipeCreated
            style={styles.materialToast1}
          ></MaterialToast1>
          <FloatingCreate
            button1=recipesCreate
            style={styles.materialButtonShare}
          ></FloatingCreate>
        </ScrollView>
      </View>
    </View>
  );
}

let strings = new LocalizedStrings({
  en: {
    recipes: "Recipes",
    recipeSearch: "RecipeSearch",
    recipeView: "RecipeView",
    recipeCreated: "RecipeCreated",
    recipesCreate: "RecipesCreate",
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
    height: 628,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  scrollArea_contentContainerStyle: {
    width: 360,
    height: 3140,
    flexDirection: "row"
  },
  recipeCard: {
    width: 160,
    height: 236,
    margin: 15,
    marginRight: 5
  },
  recipeCard1: {
    width: 160,
    height: 236,
    margin: 15,
    marginLeft: 5
  },
  materialToast1: {
    top: 499,
    left: 15,
    width: 326,
    height: 48,
    position: "absolute"
  },
  materialButtonShare: {
    top: 557,
    left: 285,
    width: 56,
    height: 56,
    position: "absolute"
  }
});

export default Recipes;
