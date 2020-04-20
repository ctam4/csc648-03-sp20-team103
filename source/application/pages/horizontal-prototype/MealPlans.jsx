import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import MealPlansCard from "../../components/horizontal-prototype/MealPlansCard";

let strings = new LocalizedStrings({
  en: {
    mealplans: "Meal Plans",
    date: "mm/dd/yy",
    view: "View",
    cal_per_day: "Cal per day: ",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialHeader1: {
    minWidth: 360,
    width: "100%",
    height: 56,
    alignSelf: "center"
  },
  scrollArea: {
    minWidth: 360,
    width: "100%",
    minHeight: 684,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 1
  },
  scrollArea_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column"
  },
  cartsCard1: {
    alignSelf: "stretch",
    margin: 15,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(74,74,74,1)",
    shadowOpacity: 0.19
  },
  cartsCard2: {
    alignSelf: "stretch",
    margin: 15,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)"
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);

  useEffect(async () => {

  });

  return (
    <View style={styles.container}>
      <AppHeader
        text1={strings.mealplans}
        style={styles.materialHeader1}
      ></AppHeader>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <MealPlansCard
            text1="Meal Plan A"
            text2={strings.cal_per_day}
            text4={strings.view}
            style={styles.cartsCard1}
          ></MealPlansCard>
          <MealPlansCard
            text1="Meal Plan B"
            text2={strings.cal_per_day}
            text4={strings.view}
            style={styles.cartsCard2}
          ></MealPlansCard>
        </ScrollView>
      </View>
    </View>
  );
};
