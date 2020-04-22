import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import { TopAppBarFixedAdjust } from "@material/react-top-app-bar";
import { DrawerAppContent } from "@material/react-drawer";
import MaterialIcon from "@material/react-material-icon";
import "@material/react-material-icon/dist/material-icon.css";
import LocalizedStrings from "react-localization";

import MaterialTopAppBar from "../../components/horizontal-prototype/MaterialTopAppBar";
import MaterialDrawer from "../../components/horizontal-prototype/MaterialDrawer";
import MaterialFab from "../../components/horizontal-prototype/MaterialFab";
import MaterialSnackbar from "../../components/horizontal-prototype/MaterialSnackbar";
import InventoryCard from "../../components/horizontal-prototype/InventoryCard";
import AppFooter from "../../components/horizontal-prototype/AppFooter";

let strings = new LocalizedStrings({
  en: {
    inventory: "Inventory",
    view_log: "View log",
    discard: "Discard",
    toast_added: "Item added to inventory.",
  },
});
const styles = StyleSheet.create({
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    minHeight: 628,
    maxHeight: "100%",
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCardWithImageAndTitle: {
    alignSelf: "stretch",
    margin: 15,
  },
  materialCardWithImageAndTitle1: {
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

  const handleDiscard = async () => {
    // TODO: fetch
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={styles.drawerContainer}>
      <MaterialTopAppBar
        title={strings.inventory}
        onClick1={toggleDrawer}
        onClick2={() => window.location.href = './inventory/search' }
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
              <InventoryCard
                text1="Apple"
                text2={"2 ct by user 1 \nstored 10 days ago \nexpiring in 2 days"}
                text3={strings.view_log}
                text4={strings.discard}
                onPressAction1={() => { window.location.href = './inventory/view?id=' }}
                onPressAction2={handleDiscard}
                style={styles.materialCardWithImageAndTitle}
                cardItemimage = {require("/images/apple.png")}
              ></InventoryCard>
              <InventoryCard
                text1="Milk"
                text2={"1 gal by user 1 \nstored 1 day ago \nexpiring in 21 days"}
                text3={strings.view_log}
                text4={strings.discard}
                onPressAction1={() => { window.location.href = './inventory/view?id=' }}
                onPressAction2={handleDiscard}
                style={styles.materialCardWithImageAndTitle1}
                cardItemimage = {require("/images/milk.png")}
              ></InventoryCard>
            </ScrollView>
          </View>
          <MaterialSnackbar message={strings.toast_added} />
          <MaterialFab
            icon={<MaterialIcon icon="library_add"/>}
            style={{ position: "absolute", right: 16, bottom: 74 }}
            onClick={() => window.location.href = './inventory/add/receipt' }
          ></MaterialFab>
          <AppFooter style={styles.materialBasicFooter1}></AppFooter>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
