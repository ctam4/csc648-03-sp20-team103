import React, { useReducer } from "react";
import { useCookies } from "react-cookie";

//import { recipesSearchReducer, initialState } from "../../reducers/horizontal-prototype/RecipesCreate";

import { StyleSheet, View, ScrollView, Text } from "react-native";
import LocalizedStrings from "react-localization";

import Search from "../components/horizontal-prototype/Search";
import ChipActive from "../components/horizontal-prototype/ChipActive";
import Chip from "../components/horizontal-prototype/Chip";

let strings = new LocalizedStrings({
  en: {
    keywords: "Keywords",
    fiveHundredOrLessCalories: "500 calories or less",
    fiveHundredOneThousandCalories: "500-1000 calories",
    username: "Username",
    threeFourServings: "3-4 servings",
    oneTwoServings: "1-2 servings",
    tenGramsOrLess: "10 grams or less",
    tenTwentyGrams: "10-20 grams",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialSearchBarWithBackground: {
    width: 360,
    height: 56,
  },
  scrollArea1: {
    width: 360,
    minHeight: 684,
    alignSelf: "center",
  },
  scrollArea1_contentContainerStyle: {
    width: 360,
    height: 3140,
    flexDirection: "column",
  },
  chooseCalories: {
    color: "#121212",
    fontFamily: "Roboto",
    marginTop: 15,
    marginLeft: 15,
  },
  materialChipWithCloseButton: {
    width: 160,
    height: 32,
  },
  materialChipWithCloseButtonFiller: {
    flex: 1,
    flexDirection: "row",
  },
  materialChipBasic1: {
    width: 130,
    height: 32,
  },
  materialChipWithCloseButtonRow: {
    height: 32,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 45,
  },
  chooseServingSize: {
    color: "#121212",
    fontFamily: "Roboto",
    marginTop: 20,
    marginLeft: 15,
  },
  materialChipWithCloseButton1: {
    width: 120,
    height: 32,
  },
  materialChipWithCloseButton1Filler: {
    flex: 1,
    flexDirection: "row",
  },
  materialChipBasic: {
    width: 100,
    height: 32,
  },
  materialChipWithCloseButton1Row: {
    height: 32,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 115,
  },
  chooseFatSize: {
    color: "#121212",
    fontFamily: "Roboto",
    marginTop: 20,
    marginLeft: 15,
  },
  materialChipBasic2: {
    width: 125,
    height: 32,
  },
  materialChipBasic2Filler: {
    flex: 1,
    flexDirection: "row",
  },
  materialChipBasic3: {
    width: 100,
    height: 32,
  },
  materialChipBasic2Row: {
    height: 32,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 110,
  },
  chooseProteinSize: {
    color: "#121212",
    fontFamily: "Roboto",
    marginTop: 20,
    marginLeft: 15,
  },
  materialChipBasic4: {
    width: 125,
    height: 32,
  },
  materialChipBasic4Filler: {
    flex: 1,
    flexDirection: "row",
  },
  materialChipBasic5: {
    width: 100,
    height: 32,
  },
  materialChipBasic4Row: {
    height: 32,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 15,
    marginRight: 110,
  },
  chooseProtein2: {
    color: "#121212",
    fontFamily: "Roboto",
    marginTop: 20,
    marginLeft: 15,
  },
  materialChipBasic6: {
    width: 125,
    height: 32,
  },
  materialChipBasic6Filler: {
    flex: 1,
    flexDirection: "row",
  },
  materialChipBasic7: {
    width: 100,
    height: 32,
  },
  materialChipBasic6Row: {
    height: 32,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 15,
    marginRight: 110,
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);
  //const [state, dispatch] = useReducer(recipesCreateReducer, initialState);

  return (
    <View style={styles.scrollArea1}>
      <ScrollView
        contentContainerStyle={styles.scrollArea1_contentContainerStyle}
      >
        <Text style={styles.chooseCalories}>Choose calories per serving</Text>
        <View style={styles.materialChipWithCloseButtonRow}>
          <ChipActive
            text1={strings.fiveHundredOrLessCalories}
            style={styles.materialChipWithCloseButton}
          ></ChipActive>
          <View style={styles.materialChipWithCloseButtonFiller}></View>
          <Chip
            text1={strings.fiveHundredOneThousandCalories}
            style={styles.materialChipBasic1}
          ></Chip>
        </View>
        <Text style={styles.chooseServingSize}>Choose serving size</Text>
        <View style={styles.materialChipWithCloseButton1Row}>
          <ChipActive
            text1={strings.threeFourServings}
            style={styles.materialChipWithCloseButton1}
          ></ChipActive>
          <View style={styles.materialChipWithCloseButton1Filler}></View>
          <Chip text1={strings.oneTwoServings} style={styles.materialChipBasic}></Chip>
        </View>
        <Text style={styles.chooseFatSize}>Choose fat per serving</Text>
        <View style={styles.materialChipBasic2Row}>
          <Chip
            text1={strings.tenGramsOrLess}
            style={styles.materialChipBasic2}
          ></Chip>
          <View style={styles.materialChipBasic2Filler}></View>
          <Chip text1={strings.tenTwentyGrams} style={styles.materialChipBasic3}></Chip>
        </View>
        <Text style={styles.chooseProteinSize}>Choose protein per serving</Text>
        <View style={styles.materialChipBasic4Row}>
          <Chip
            text1={strings.tenGramsOrLess}
            style={styles.materialChipBasic4}
          ></Chip>
          <View style={styles.materialChipBasic4Filler}></View>
          <Chip text1={strings.tenTwentyGrams} style={styles.materialChipBasic5}></Chip>
        </View>
        <Text style={styles.chooseProtein2}>Choose carbonhydrates per serving</Text>
        <View style={styles.materialChipBasic6Row}>
          <Chip
            text1={strings.tenGramsOrLess}
            style={styles.materialChipBasic6}
          ></Chip>
          <View style={styles.materialChipBasic6Filler}></View>
          <Chip text1={strings.tenTwentyGrams} style={styles.materialChipBasic7}></Chip>
        </View>
      </ScrollView>
    </View>
  );
};
