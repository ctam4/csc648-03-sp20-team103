import * as React from "react";
import CreateReactClass from "create-react-class";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import CartsCard from "../../components/horizontal-prototype/CartsCard";

let strings = new LocalizedStrings({
  en: {
mealplans: "MealPlan",
mealplan_title: "Meal Plan #", 
date: "mm/dd/yy",
button: "VIEW",
cal_per_day: "Cal per day: ",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialHeader1: {
    width: 360,
    height: 56,
    alignSelf: "center"
  },
  scrollArea: {
    width: 360,
    height: 627,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 1
  },
  scrollArea_contentContainerStyle: {
    width: 360,
    height: 3134,
    flexDirection: "column"
  },
  cartsCard1: {
    height: 320,
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
    height: 320,
    alignSelf: "stretch",
    margin: 15,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)"
  }
});




export default CreateReactClass({
  render: function() {
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
          <CartsCard
            text1={strings.mealplan_title}
            text2={strings.cal_per_day}
            text4={strings.button}
            style={styles.cartsCard1}
          ></CartsCard>
          <CartsCard
            text1={strings.mealplan_title}
            text2={strings.cal_per_day}
            text4={strings.button}
            style={styles.cartsCard2}
          ></CartsCard>
        </ScrollView>
      </View>
    </View>
   );
    },
  });
