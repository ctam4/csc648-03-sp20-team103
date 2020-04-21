import React, { useEffect, useReducer } from "react";
import { useCookies } from "react-cookie";

import { inventorySearchReducer, initialState } from "../../reducers/horizontal-prototype/InventorySearch";
import { setKeywords } from "../../actions/horizontal-prototype/InventorySearch";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import Search from "../../components/horizontal-prototype/Search";

let strings = new LocalizedStrings({
  en: {
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    minHeight: 684,
    maxHeight: "100%",
    alignSelf: "center",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
  },
  materialSearchBarWithBackground1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);
  const [state, dispatch] = useReducer(inventorySearchReducer, initialState);

  useEffect(() => {
    load();
  });

  const load = async () => {
    // TODO: fetch
  };

  return (
    <View style={styles.container}>
      <Search
        textInput1={state.keywords}
        style={styles.materialSearchBarWithBackground1}
        onChange={(e) => dispatch(setKeywords(e.target.value))}
      ></Search>
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        ></ScrollView>
      </View>
    </View>
  );
};
