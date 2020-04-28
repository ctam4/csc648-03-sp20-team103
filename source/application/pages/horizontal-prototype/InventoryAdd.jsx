import React, { useEffect, useReducer } from "react";
import { useCookies } from "react-cookie";

import { inventoryAddReducer, initialState } from "../../reducers/horizontal-prototype/InventoryAdd";
import { setKeywords } from "../../actions/horizontal-prototype/InventoryAdd";

import { StyleSheet, View, ScrollView } from "react-native";
import MaterialIcon from "@material/react-material-icon";
import "@material/react-material-icon/dist/material-icon.css";
import LocalizedStrings from "react-localization";

import MaterialFab from "../../components/horizontal-prototype/MaterialFab";
import Search from "../../components/horizontal-prototype/Search";
import InventoryCard from "../../components/horizontal-prototype/InventoryCard";

let strings = new LocalizedStrings({
  en: {
    select: "Select",
    remove: "Remove",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    minHeight: 684,
    maxHeight: "100%",
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCardWithImageAndTitle1: {
    alignSelf: "stretch",
    margin: 15,
  },
  materialCardWithImageAndTitle2: {
    alignSelf: "stretch",
    margin: 15,
  },
  materialSearchBarWithBackground1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(["session"]);
  const [state, dispatch] = useReducer(inventoryAddReducer, initialState);

  useEffect(() => {
    load();
  });

  const load = async () => {
    // TODO: fetch
  };

  const handleRemove = async () => {
    // TODO: fetch
  }

  const handleSave = async () => {
    // TODO: fetch to post
    if (history.length > 0) {
      history.go(-2);
    }
  }

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
        >
          <InventoryCard
            text1="Apple"
            text2={"2 ct by user 1 \nstored 10 days ago \nexpiring in 2 days"}
            text3={strings.select}
            text4={strings.remove}
            style={styles.materialCardWithImageAndTitle1}
            //onPressAction1={() => { window.location.href = './inventory/view?id=' }}
            onPressAction2={handleRemove}
            cardItemimage = {require("/images/apple.png")}
          ></InventoryCard>
          <InventoryCard
            text1="Milk"
            text2={"2 ct by user 1 \nstored 10 days ago \nexpiring in 2 days"}
            text3={strings.select}
            text4={strings.remove}
            style={styles.materialCardWithImageAndTitle2}
            //onPressAction1={() => { window.location.href = './inventory/view?id=' }}
            onPressAction2={handleRemove}
            cardItemimage = {require("/images/milk.png")}
          ></InventoryCard>
        </ScrollView>
      </View>
      <MaterialFab
        icon={<MaterialIcon icon="check"/>}
        style={{ position: "absolute", right: 16, bottom: 16 }}
        onClick={handleSave}
      ></MaterialFab>
    </View>
  );
};