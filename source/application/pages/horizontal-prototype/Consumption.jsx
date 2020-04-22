import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import { TopAppBarFixedAdjust } from "@material/react-top-app-bar";
import { DrawerAppContent } from "@material/react-drawer";
import LocalizedStrings from "react-localization";

import MaterialTopAppBar from "../../components/horizontal-prototype/MaterialTopAppBar";
import MaterialDrawer from "../../components/horizontal-prototype/MaterialDrawer";
import ConsumptionCard from "../../components/horizontal-prototype/ConsumptionCard";
import AppFooter from "../../components/horizontal-prototype/AppFooter";

let strings = new LocalizedStrings({
  en: {
    consumption: "Consumption",
    view_details: "View details",
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
  materialCard3: {
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
        title={strings.consumption}
        onClick1={toggleDrawer}
        //onClick2={() => window.location.href = './' }
        icon2="view_week"
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
              <ConsumptionCard
                text1="user"
                text2="role"
                text3="Above is a chart for the last 30 days. This text describes how user did compared to average person only on calories."
                text4={strings.view_details}
                style={styles.materialCard3}
                onPressAction1={() => { window.location.href = './consumption/view?id=' }}
              ></ConsumptionCard>
            </ScrollView>
            <AppFooter style={styles.materialBasicFooter1}></AppFooter>
          </View>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
