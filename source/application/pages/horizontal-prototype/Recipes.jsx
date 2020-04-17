import * as React from "react";
import CreateReactClass from "create-react-class";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../../stores/horizontal-prototype/store";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import RecipeCard from "../../components/horizontal-prototype/RecipeCard";
import MaterialToast1 from "../../components/horizontal-prototype/MaterialToast1";
import FloatingCreate from "../../components/horizontal-prototype/FloatingCreate";
import AppFooter from "../../components/horizontal-prototype/AppFooter";

let strings = new LocalizedStrings({
  en: {
    inventory: "Inventory",
    recipes: "Recipes",
    carts: "Carts",
    consumption: "Consumption",
    toast_created: "Recipe created.",
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
  },
  materialBasicFooter1: {
    width: 360,
    height: 56
  }
});

export default CreateReactClass({
  render: function() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <AppHeader
              button2={strings.recipeSearch}
              text1={strings.recipes}
              style={styles.materialHeader1}
            ></AppHeader>
            <View style={styles.scrollArea}>
              <ScrollView
                contentContainerStyle={styles.scrollArea_contentContainerStyle}
              >
                <RecipeCard
                  button2={strings.recipeView}
                  style={styles.recipeCard}
                ></RecipeCard>
                <RecipeCard style={styles.recipeCard1}></RecipeCard>
              </ScrollView>
            </View>
            <MaterialToast1
              text1={strings.toast_created}
              style={styles.materialToast1}
            ></MaterialToast1>
            <FloatingCreate
              button1={strings.recipesCreate}
              style={styles.materialButtonShare}
            ></FloatingCreate>
            <AppFooter
              button1={strings.inventory}
              button2={strings.recipes}
              button3={strings.carts}
              button4={strings.consumption}
              style={styles.materialBasicFooter1}
            ></AppFooter>
          </View>
          </PersistGate>
        </Provider>
    );
  },
});
