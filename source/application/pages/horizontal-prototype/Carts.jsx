import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import { TopAppBarFixedAdjust } from "@material/react-top-app-bar";
import { DrawerAppContent } from "@material/react-drawer";
import LocalizedStrings from "react-localization";

import MaterialTopAppBar from "../../components/horizontal-prototype/MaterialTopAppBar";
import MaterialDrawer from "../../components/horizontal-prototype/MaterialDrawer";
import CartsCard from "../../components/horizontal-prototype/CartsCard";
import AppFooter from "../../components/horizontal-prototype/AppFooter";

let strings = new LocalizedStrings({
  en: {
    carts: "Carts",
    last_updated: "last updated",
    user_cart: "'s cart",
    preview_cart: "This is the preview of the cart. It may shows up to 10 lines of items with quantity",
    edit: "Edit",
    clear_cart: "Clear cart",
  },
});
const styles = StyleSheet.create({
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    height: "100%",
    minHeight: 628,
    maxHeight: "100%",
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCardWithoutImage: {
    alignSelf: "stretch",
    margin: 15,
  },
  materialBasicFooter1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session"]);
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

  const handleClearCart = async () => {
    // TODO: fetch
  };

  return (
    <View style={styles.drawerContainer}>
      <MaterialTopAppBar
        title={strings.carts}
        onClick1={toggleDrawer}
        //onClick2={() => window.location.href = './' }
      ></MaterialTopAppBar>
      <TopAppBarFixedAdjust className="top-app-bar-fix-adjust">
        <MaterialDrawer
          open={drawerOpen}
          onClose={toggleDrawer}
        ></MaterialDrawer>
        <DrawerAppContent className="drawer-app-content">
          <View style={styles.scrollArea1}>
            <ScrollView
              contentContainerStyle={styles.scrollArea1_contentContainerStyle}
            >
              <CartsCard
                text1={strings.user_cart}
                text2={strings.last_updated}
                text3={strings.preview_cart}
                text4={strings.edit}
                text5={strings.clear_cart}
                style={styles.materialCardWithoutImage}
                onPressAction1={() => { window.location.href = './carts/view?id=' }}
                onPressAction2={handleClearCart}
              ></CartsCard>
            </ScrollView>
            <AppFooter style={styles.materialBasicFooter1}></AppFooter>
          </View>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
