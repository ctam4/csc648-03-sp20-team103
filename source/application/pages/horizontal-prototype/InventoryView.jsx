import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import DialogHeader from "../../components/horizontal-prototype/DialogHeader";
import InventoryCardFull from "../../components/horizontal-prototype/InventoryCardFull";

let strings = new LocalizedStrings({
  en: {
    discard: "Discard",
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
  materialCard6: {
    alignSelf: "stretch",
    height: 528,
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
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        >
          <InventoryCardFull style={styles.materialCard6}></InventoryCardFull>
        </ScrollView>
      </View>
    </View>
  );
};
