import * as React from "react";
import CreateReactClass from "create-react-class";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../../stores/horizontal-prototype/store";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import CartsCard from "../../components/horizontal-prototype/CartsCard";
import AppFooter from "../../components/horizontal-prototype/AppFooter";

let strings = new LocalizedStrings({
  en: {
    carts: "Carts",
    last_updated: "last updated",
    user_cart: "'s cart",
    preview_cart: "this is the preview of the cart, maybe upto 10 lines of items with quantity",
    edit: "Edit",
    clear_cart: "Clear cart",
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
    height: 628,
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCardWithoutImage: {
    minWidth: 330,
    height: 200,
    margin: 15,
  },
  materialBasicFooter1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
});

export default CreateReactClass({
  render: function() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <AppHeader
              icon2Name={strings.filter}
              text1={strings.carts}
              style={styles.materialHeader1}
            ></AppHeader>
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
                ></CartsCard>
              </ScrollView>
            </View>
            <AppFooter style={styles.materialBasicFooter1}></AppFooter>
          </View>
        </PersistGate>
      </Provider>
    );
  },
});
