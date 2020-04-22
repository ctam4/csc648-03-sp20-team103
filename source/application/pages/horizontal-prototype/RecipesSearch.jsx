import React, { useEffect, useReducer } from "react";
import { useCookies } from "react-cookie";

import { recipesSearchReducer, initialState } from "../../reducers/horizontal-prototype/RecipesSearch";
import { setKeywords } from "../../actions/horizontal-prototype/RecipesSearch";

import { StyleSheet, View, ScrollView, Text } from "react-native";
import LocalizedStrings from "react-localization";

import Search from "../../components/horizontal-prototype/Search";
import ChipActive from "../../components/horizontal-prototype/ChipActive";
import Chip from "../../components/horizontal-prototype/Chip";

let strings = new LocalizedStrings({
  en: {
    choose_calories: "Choose calories per serving",
    choose_servings: "Choose servings",
    choose_fat: "Choose fat per serving",
    choose_protein: "Choose protein per serving",
    choose_carbonhydrates: "Choose carbonhydrates per serving",
    calories_500_less: "500 calories or less",
    calories_500_1000: "500-1000 calories",
    servings_3_4: "3-4 servings",
    servings_1_2: "1-2 servings",
    grams_10_less: "10 grams or less",
    grams_10_20: "10-20 grams",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialSearchBarWithBackground: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    minHeight: 684,
    maxHeight: "100%",
    alignSelf: "center",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
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
  const [cookies, setCookie] = useCookies(["session"]);
  const [state, dispatch] = useReducer(recipesSearchReducer, initialState);

  useEffect(() => {
    load();
  });

  const load = async () => {
    // TODO: fetch
  };

  return (
    <View style={styles.container}>
      <Search
        textInput1={state.keywords}
        style={styles.materialSearchBarWithBackground}
        onChange={(e) => dispatch(setKeywords(e.target.value))}
      ></Search>
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        >
          <Text style={styles.chooseCalories}>{strings.choose_calories}</Text>
          <View style={styles.materialChipWithCloseButtonRow}>
            <ChipActive
              text1={strings.calories_500_less}
              style={styles.materialChipWithCloseButton}
            ></ChipActive>
            <View style={styles.materialChipWithCloseButtonFiller}></View>
            <Chip
              text1={strings.calories_500_1000}
              style={styles.materialChipBasic1}
            ></Chip>
          </View>
          <Text style={styles.chooseServingSize}>{strings.choose_servings}</Text>
          <View style={styles.materialChipWithCloseButton1Row}>
            <ChipActive
              text1={strings.servings_3_4}
              style={styles.materialChipWithCloseButton1}
            ></ChipActive>
            <View style={styles.materialChipWithCloseButton1Filler}></View>
            <Chip
              text1={strings.servings_1_2}
              style={styles.materialChipBasic}
            ></Chip>
          </View>
          <Text style={styles.chooseFatSize}>{strings.choose_fat}</Text>
          <View style={styles.materialChipBasic2Row}>
            <Chip
              text1={strings.grams_10_less}
              style={styles.materialChipBasic2}
            ></Chip>
            <View style={styles.materialChipBasic2Filler}></View>
            <Chip
              text1={strings.grams_10_20}
              style={styles.materialChipBasic3}
            ></Chip>
          </View>
          <Text style={styles.chooseProteinSize}>{strings.choose_protein}</Text>
          <View style={styles.materialChipBasic4Row}>
            <Chip
              text1={strings.grams_10_less}
              style={styles.materialChipBasic4}
            ></Chip>
            <View style={styles.materialChipBasic4Filler}></View>
            <Chip
              text1={strings.grams_10_20}
              style={styles.materialChipBasic5}
            ></Chip>
          </View>
          <Text style={styles.chooseProtein2}>{strings.choose_carbonhydrates}</Text>
          <View style={styles.materialChipBasic6Row}>
            <Chip
              text1={strings.grams_10_less}
              style={styles.materialChipBasic6}
            ></Chip>
            <View style={styles.materialChipBasic6Filler}></View>
            <Chip
              text1={strings.grams_10_20}
              style={styles.materialChipBasic7}
            ></Chip>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
