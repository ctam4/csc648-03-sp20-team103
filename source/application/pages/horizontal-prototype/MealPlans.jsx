import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import { TopAppBarFixedAdjust } from "@material/react-top-app-bar";
import { DrawerAppContent } from "@material/react-drawer";
import LocalizedStrings from "react-localization";

import MaterialTopAppBar from "../../components/horizontal-prototype/MaterialTopAppBar";
import MaterialDrawer from "../../components/horizontal-prototype/MaterialDrawer";
import MealPlansCard from "../../components/horizontal-prototype/MealPlansCard";

let strings = new LocalizedStrings({
  en: {
    meal_plans: "Meal Plans",
    calories: " calories",
    view: "View",
  },
});
const styles = StyleSheet.create({
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
  const [cookies, setCookie] = useCookies(["session"]);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
        description : "Per day weight loss meal plan structured towards a healthy balanced diet. All Meals are designed to serve 1. Recipes create delicious meals with half the amount of calories you would expect. Shopping List included. 3 Meals per day.",
      },
      {
        date: "2020-04-21",
        cal_per_day: 1900,
        description : "Per day meal plan created for children as per their needs. All Meals are designed to serve 1. Recipes create delicious meals with children's favourite meal options. 3 Meals per day.",
      },
      {
        date: "2020-04-22",
        cal_per_day: 2000,
        description : "Meal plan designed for students structured towards healthy and nutritious meals. All Meals are designed to serve 1. This plan provides for breakfast, lunch, and dinner.",
      },
      {
        date: "2020-04-23",
        cal_per_day: 2200,
        description : "Meal plan structured for a family towards healthy and nutritious meal. Considering the needs and dietary habits of all the family members Recipes create delicious meals with the required amount of calories. 3 Meals for a day.",
      },
      {
        date: "2020-04-24",
        cal_per_day: 2300,
        description : "Meal plan E",
      },
      {
        date: "2020-04-25",
        cal_per_day: 1500,
        description : "Meal plan F",
      },
      {
        date: "2020-04-26",
        cal_per_day: 2000,
        description : "Meal plan G",
      },
    ]);
  };

  const load = async () => {
    // TODO: fetch
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={styles.drawerContainer}>
      <MaterialTopAppBar
        title={strings.meal_plans}
        onClick1={toggleDrawer}
        //onClick2={() => window.location.href = './' }
      ></MaterialTopAppBar>
      <TopAppBarFixedAdjust className="top-app-bar-fix-adjust">
        <MaterialDrawer
          open={drawerOpen}
          onClose={toggleDrawer}
        ></MaterialDrawer>
        <DrawerAppContent className="drawer-app-content">
          <View style={styles.scrollArea}>
            <ScrollView
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
            >
              {mealPlans.map((item) => (
                <MealPlansCard
                  text1={item.date}
                  text2={item.cal_per_day + strings.calories}
                  text3={item.description}
                  text4={strings.view}
                  style={styles.cartsCard1}
                  onPressAction1={() => { window.location.href = './meal-plans/view?id=' }}
                ></MealPlansCard>
              ))}
            </ScrollView>
          </View>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
