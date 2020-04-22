import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import { TopAppBarFixedAdjust } from "@material/react-top-app-bar";
import { DrawerAppContent } from "@material/react-drawer";
import LocalizedStrings from "react-localization";

import MaterialTopAppBar from "../../components/horizontal-prototype/MaterialTopAppBar";
import MaterialDrawer from "../../components/horizontal-prototype/MaterialDrawer";
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
  scrollArea: {
    minWidth: 360,
    width: "100%",
    minHeight: 628,
    maxHeight: "100%",
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    // TODO: fetch
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={styles.drawerContainer}>
      <MaterialTopAppBar
        title={strings.recipes}
        onClick={() => toggleDrawer()}
      ></MaterialTopAppBar>
      <TopAppBarFixedAdjust className="top-app-bar-fix-adjust">
        <MaterialDrawer
          open={drawerOpen}
        ></MaterialDrawer>
        <DrawerAppContent className="drawer-app-content">
          <View style={styles.scrollArea}>
            <ScrollView
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
            >
              <RecipesCard
                //onPressLeft={() => {}}
                onPressCenter={() => { window.location.href = './recipes/view?id=' }}
                //onPressRight={() => {}}
                style={styles.recipesCard}
              ></RecipesCard>
              <RecipesCard
                //onPressLeft={() => {}}
                onPressCenter={() => { window.location.href = './recipes/view?id=' }}
                //onPressRight={() => {}}
                style={styles.recipesCard}
              ></RecipesCard>
            </ScrollView>
          </View>
          <MaterialToast1
            text1={strings.toast_created}
            style={styles.materialToast1}
          ></MaterialToast1>
          <FloatingCreate style={styles.materialButtonShare} onPress={() => window.location.href = './recipes/create' }></FloatingCreate>
          <AppFooter style={styles.materialBasicFooter1}></AppFooter>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
