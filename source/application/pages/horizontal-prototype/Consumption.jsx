import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import { MdViewWeek } from "react-icons/md";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import ConsumptionCard from "../../components/horizontal-prototype/ConsumptionCard";
import AppFooter from "../../components/horizontal-prototype/AppFooter";

let strings = new LocalizedStrings({
  en: {
    consumption: "Consumption",
    view_details: "View details",
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
    alignSelf: "center",
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    minHeight: 628,
    maxHeight: "100%",
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCard3: {
    alignSelf: "stretch",
    margin: 15,
  },
  materialBasicFooter1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);

  useEffect(() => {

  });

  return (
    <View style={styles.container}>
      <AppHeader
        text1={strings.consumption}
        rightIcon1={<MdViewWeek />}
        style={styles.materialHeader1}
      ></AppHeader>
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        >
          <ConsumptionCard
            text1="user"
            text2="role"
            text3="Above is a chart for the last 30 days. This text describes how user did compared to average person only on calories."
            text4={strings.view_details}
            style={styles.materialCard3}
            onPressAction1={() => { window.location.href = './consumption/view?id=' }}
          ></ConsumptionCard>
        </ScrollView>
      </View>
      <AppFooter style={styles.materialBasicFooter1}></AppFooter>
    </View>
  );
};
