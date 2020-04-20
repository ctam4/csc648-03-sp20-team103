import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import DialogHeader from "../../components/horizontal-prototype/DialogHeader";
import RecipesCardFull from "../../components/horizontal-prototype/RecipesCardFull";

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
    height: 56,
  },
  scrollArea: {
    minWidth: 360,
    width: "100%",
    height: 684,
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCard6: {
    minWidth: 330,
    height: 696,
    margin: 15,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);

  useEffect(async () => {

  });

  return (
    <View style={styles.container}>
      <DialogHeader style={styles.materialHeader1}></DialogHeader>
      <View style={styles.scrollArea}>
        <ScrollView contentContainerStyle={styles.scrollArea_contentContainerStyle}>
          <RecipesCardFull
            text1="Recipe name"
            text2="# servings / # calories per serving"
            text3={strings.save}
            text4={strings.add_to_cart}
            style={styles.materialCard6}
          ></RecipesCardFull>
        </ScrollView>
      </View>
    </View>
  );
};
