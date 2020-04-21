import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import Search from "../../components/horizontal-prototype/Search";
import InventoryCard from "../../components/horizontal-prototype/InventoryCard";
import FloatingSave from "../../components/horizontal-prototype/FloatingSave";

let strings = new LocalizedStrings({
  en: {
    foodName: "Apple",
    details: "2 ct by user 1 \n stored 10 days ago \n expiring in 2 days",
    select: "SELECT",
    empty: "",
    consumption: "Consumption",
    inventory: "Inventory",
    remove: "REMOVE",
    keywords: "Keywords",
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    width: 375,
    height: 56,
    marginTop: 12
  },
  scrollArea1: {
    width: 360,
    height: 684,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 20
  },
  scrollArea1_contentContainerStyle: {
    width: 360,
    height: 2812,
    flexDirection: "column"
  },
  materialCardWithImageAndTitle1: {
    width: 330,
    height: 166,
    alignSelf: "center",
    marginTop: 16
  },
  materialCardWithImageAndTitle2: {
    width: 330,
    height: 166,
    alignSelf: "center",
    marginTop: 14
  },
  floatingSave1: {
    width: 56,
    height: 56,
    marginTop: 251,
    marginLeft: 289
  },
  searchRow: {
    height: 684,
    flexDirection: "row",
    marginTop: 56,
    marginLeft: -395
  },
  materialSearchBarWithBackground1: {
    width: 360,
    height: 56,
    marginTop: -740
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);

  useEffect(() => {

  });

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Search style={styles.search}></Search>
        <View style={styles.scrollArea1}>
          <ScrollView
            contentContainerStyle={styles.scrollArea1_contentContainerStyle}
          >
            <InventoryCard
              text1={strings.foodName}
              text2={strings.details}
              text3={strings.select}
              text4={strings.empty}
              button1={strings.consumption}
              button2={strings.inventory}
              style={styles.materialCardWithImageAndTitle1}
            ></InventoryCard>
            <InventoryCard
              text1={strings.foodName}
              text2={strings.details}
              text3={strings.select}
              text4={strings.remove}
              button1={strings.consumption}
              button2={strings.inventory}
              style={styles.materialCardWithImageAndTitle2}
            ></InventoryCard>
            <FloatingSave style={styles.floatingSave1}></FloatingSave>
          </ScrollView>
        </View>
      </View>
      <Search
        textInput1={strings.keywords}
        style={styles.materialSearchBarWithBackground1}
      ></Search>
    </View>
  );
};