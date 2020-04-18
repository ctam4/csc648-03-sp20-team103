import * as React from "react";
import CreateReactClass from "create-react-class";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../../stores/horizontal-prototype/store";

import { StyleSheet, View, ScrollView } from "react-native";
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
    height: "100%",
  },
  materialHeader1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    height: 628,
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCardWithImageAndTitle: {
    minWidth: 330,
    height: 166,
    margin: 15,
  },
  materialCardWithImageAndTitle1: {
    minWidth: 330,
    height: 166,
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
  }
});

export default CreateReactClass({
  render: function() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <AppHeader
            text1={strings.inventory}
            style={styles.materialHeader1}
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
                onPressAction1={() => { window.location.href = '/horizontal-prototype/inventory/view' }}
                //onPressAction2={() => { }}
                style={styles.materialCardWithImageAndTitle}
              ></InventoryCard>
              <InventoryCard
                text1="Milk \n Brand A 2% fat"
                text2="1 gal by user 1 \n stored 1 day ago \n expiring in 21 days"
                text3={strings.view_log}
                text4={strings.discard}
                onPressAction1={() => { window.location.href = '/horizontal-prototype/inventory/view' }}
                //onPressAction2={() => { }}
                style={styles.materialCardWithImageAndTitle1}
              ></InventoryCard>
            </ScrollView>
          </View>
          <MaterialToast1
            text1={strings.toast_added}
            style={styles.materialToast1}
          ></MaterialToast1>
          <FloatingCreate style={styles.floatingCreate}></FloatingCreate>
          <AppFooter style={styles.materialBasicFooter1}></AppFooter>
        </View>
        </PersistGate>
      </Provider>
    );
  },
});
