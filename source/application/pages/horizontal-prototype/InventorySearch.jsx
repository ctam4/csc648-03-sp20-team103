import React, { useReducer } from "react";
import { useCookies } from "react-cookie";

//import { inventorySearchReducer, initialState } from "../../reducers/horizontal-prototype/InventorySearch";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import Search from "../../components/horizontal-prototype/Search";

let strings = new LocalizedStrings({
  en: {
    keywords: "Keywords",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea1: {
    width: 360,
    width: "100%",
    minHeight: 684,
    marginTop: 56,
    alignSelf: "center"
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
  },
  materialSearchBarWithBackground1: {
    minWidth: 360,
    width: "100%",
    height: 56,
    marginTop: -740
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);
  //const [state, dispatch] = useReducer(inventorySearchReducer, initialState);

  return (
    <View style={styles.container}>
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        ></ScrollView>
      </View>
      <Search
        textInput1={strings.keywords}
        style={styles.materialSearchBarWithBackground1}
      ></Search>
    </View>
  );
};
