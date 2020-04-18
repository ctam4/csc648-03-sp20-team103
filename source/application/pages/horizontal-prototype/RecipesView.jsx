import * as React from "react";
import CreateReactClass from "create-react-class";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../../stores/horizontal-prototype/store";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import DialogHeader from "../../components/horizontal-prototype/DialogHeader";
import RecipeCardFull from "../../components/horizontal-prototype/RecipeCardFull";

let strings = new LocalizedStrings({
  en: {
    save: "Save",
    add_to_cart: "Add to Cart",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialHeader1: {
    minWidth: 360,
    width: "100%",
    height: 56
  },
  scrollArea: {
    minWidth: 360,
    width: "100%",
    height: 684,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  scrollArea_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column"
  },
  materialCard6: {
    minWidth: 330,
    height: 696,
    margin: 15
  }
});

export default CreateReactClass({
  render: function() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <DialogHeader style={styles.materialHeader1}></DialogHeader>
            <View style={styles.scrollArea}>
              <ScrollView contentContainerStyle={styles.scrollArea_contentContainerStyle}>
                <RecipeCardFull
                  text1="Recipe name"
                  text2="# servings / # calories per serving"
                  text3={strings.save}
                  text4={strings.add_to_cart}
                  style={styles.materialCard6}
                ></RecipeCardFull>
              </ScrollView>
            </View>
          </View>
        </PersistGate>
      </Provider>
    );
  },
});
