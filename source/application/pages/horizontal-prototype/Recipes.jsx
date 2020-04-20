import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import RecipesCard from "../../components/horizontal-prototype/RecipesCard";
import MaterialToast1 from "../../components/horizontal-prototype/MaterialToast1";
import FloatingCreate from "../../components/horizontal-prototype/FloatingCreate";
import AppFooter from "../../components/horizontal-prototype/AppFooter";

let strings = new LocalizedStrings({
  en: {
    recipes: "Recipes",
    toast_created: "Recipe created.",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialHeader1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
  scrollArea: {
    minWidth: 360,
    width: "100%",
    height: 628,
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "row",
  },
  recipesCard: {
    minWidth: 160,
    width: "50%",
    height: 236,
    margin: 15,
  },
  materialToast1: {
    bottom: 132,
    left: 15,
    minWidth: 330,
    width: "100%" - 30,
    height: 48,
    position: "absolute",
  },
  materialButtonShare: {
    bottom: 61,
    right: 15,
    width: 56,
    height: 56,
    position: "absolute",
  },
  materialBasicFooter1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);

  useEffect(async () => {

  });

  return (
    <View style={styles.container}>
      <AppHeader
        text1={strings.recipes}
        style={styles.materialHeader1}
      ></AppHeader>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <RecipesCard
            //onPressLeft={() => {}}
            //onPressCenter={() => {}}
            //onPressRight={() => {}}
            style={styles.recipesCard}
          ></RecipesCard>
          <RecipesCard
            //onPressLeft={() => {}}
            //onPressCenter={() => {}}
            //onPressRight={() => {}}
            style={styles.recipesCard}
          ></RecipesCard>
        </ScrollView>
      </View>
      <MaterialToast1
        text1={strings.toast_created}
        style={styles.materialToast1}
      ></MaterialToast1>
      <FloatingCreate
        style={styles.materialButtonShare}
      ></FloatingCreate>
      <AppFooter style={styles.materialBasicFooter1}></AppFooter>
    </View>
  );
};
