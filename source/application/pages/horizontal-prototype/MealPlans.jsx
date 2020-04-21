import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import MealPlansCard from "../../components/horizontal-prototype/MealPlansCard";

let strings = new LocalizedStrings({
  en: {
    meal_plans: "Meal Plans",
    calories: " calories",
    view: "View",
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
    maxHeight: "100%",
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
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    dummySetup();
    load();
  }, []);

  const dummySetup = () => {
    // TODO: hard code mealPlans array
    setMealPlans([
      {
        date: "2020-04-20",
        cal_per_day: 2000,
      },
      {
        date: "2020-04-21",
        cal_per_day: 1900,
      },
      {
        date: "2020-04-22",
        cal_per_day: 2000,
      },
      {
        date: "2020-04-23",
        cal_per_day: 2200,
      },
      {
        date: "2020-04-24",
        cal_per_day: 2300,
      },
      {
        date: "2020-04-25",
        cal_per_day: 1500,
      },
      {
        date: "2020-04-26",
        cal_per_day: 2000,
      },
    ]);
  };

  const load = async () => {
    // TODO: fetch
  };

  return (
    <View style={styles.container}>
      <AppHeader
        text1={strings.meal_plans}
        style={styles.materialHeader1}
      ></AppHeader>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          {mealPlans.map((item) => (
            <MealPlansCard
              text1={item.date}
              text2={item.cal_per_day + strings.calories}
              text4={strings.view}
              style={styles.cartsCard1}
            ></MealPlansCard>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
