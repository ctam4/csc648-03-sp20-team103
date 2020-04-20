import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import { MdFilterList } from "react-icons/md";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import InventoryCard from "../../components/horizontal-prototype/InventoryCard";
import MaterialToast1 from "../../components/horizontal-prototype/MaterialToast1";
import FloatingCreate from "../../components/horizontal-prototype/FloatingCreate";
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
  container: {
    flex: 1,
  },
  materialHeader1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    minHeight: 628,
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
  materialToast1: {
    bottom: 132,
    left: 15,
    minWidth: 330,
    height: 48,
    position: "absolute",
  },
  floatingCreate: {
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

  useEffect(() => {

  });

  return (
    <View style={styles.container}>
      <AppHeader
        text1={strings.inventory}
        rightIcon2={<MdFilterList />}
        style={styles.materialHeader1}
        onPressRight1={() => window.location.href = './inventory/search' }
      ></AppHeader>
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        >
          <InventoryCard
            text1="Apple"
            text2="2 ct by user 1 \n stored 10 days ago \n expiring in 2 days"
            text3={strings.view_log}
            text4={strings.discard}
            onPressAction1={() => { window.location.href = './inventory/view?id=' }}
            //onPressAction2={() => { }}
            style={styles.materialCardWithImageAndTitle}
          ></InventoryCard>
          <InventoryCard
            text1="Milk \n Brand A 2% fat"
            text2="1 gal by user 1 \n stored 1 day ago \n expiring in 21 days"
            text3={strings.view_log}
            text4={strings.discard}
            onPressAction1={() => { window.location.href = './inventory/view?id=' }}
            //onPressAction2={() => { }}
            style={styles.materialCardWithImageAndTitle1}
          ></InventoryCard>
        </ScrollView>
      </View>
      <MaterialToast1
        text1={strings.toast_added}
        style={styles.materialToast1}
      ></MaterialToast1>
      <FloatingCreate style={styles.floatingCreate} onPress={() => window.location.href = './inventory/add' }></FloatingCreate>
      <AppFooter style={styles.materialBasicFooter1}></AppFooter>
    </View>
  );
};
