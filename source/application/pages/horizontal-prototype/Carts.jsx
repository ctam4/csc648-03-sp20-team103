import * as React from "react";
import CreateReactClass from "create-react-class";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../stores/horizontal-prototype/store";
import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";
import AppHeader from "../../components/horizontal-prototype/AppHeader";
import CartsCard from "../../components/horizontal-prototype/CartsCard";

let strings = new LocalizedStrings({
  en: {
    carts: "Carts",
    filter: "filter",
    updated: "last updated 5 hours ago",
    userCart: "User 1's cart",
    previewCart: "this is the preview of the cart, maybe upto 10 lines of items with quantity",
    edit: "EDIT",
    clearCart: "CLEAR CART",
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
  scrollArea1: {
    width: 360,
    height: 628,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  scrollArea1_contentContainerStyle: {
    width: 360,
    height: 3140,
    flexDirection: "column"
  },
  materialCardWithoutImage: {
    width: 330,
    height: 200,
    margin: 15
  }
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
                            text2={strings.updated}
                            text1={strings.userCart}
                            text3={strings.previewCart}
                            text4={strings.edit}
                            text5={strings.clearCart}
                            style={styles.materialCardWithoutImage}
                        ></CartsCard>
                    </ScrollView>
                </View>
            </View>
         </PersistGate>
      </Provider>
    );
  },
});




