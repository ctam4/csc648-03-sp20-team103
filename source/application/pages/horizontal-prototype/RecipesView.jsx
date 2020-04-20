import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import DialogHeader from "../../components/horizontal-prototype/DialogHeader";
import RecipesCardFull from "../../components/horizontal-prototype/RecipesCardFull";

let apiUrl = location.protocol + '//' + (process.env.API_HOST || location.hostname);
if (process.env.API_PORT) {
  apiUrl += ":" + process.env.API_PORT;
}

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
    minHeight: 684,
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCard6: {
    alignSelf: "stretch",
    margin: 15,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [servings, setServings] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    await fetch(apiUrl + '/v2/recipes?recipe_id=' + urlParams.get('id'), {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      setName(data.name);
      setTitle(data.title);
      setImage(data.image);
      setServings(data.servings);
      setCookingTime(data.cooking_time);
      setInstructions(data.instructions);
    })
    .catch(console.log);
  });

  return (
    <View style={styles.container}>
      <DialogHeader style={styles.materialHeader1}></DialogHeader>
      <View style={styles.scrollArea}>
        <ScrollView contentContainerStyle={styles.scrollArea_contentContainerStyle}>
          <RecipesCardFull
            text1={name}
            text2="# servings / # calories per serving"
            text3={strings.save}
            text4={strings.add_to_cart}
            bodyText1={instructions}
            style={styles.materialCard6}
          ></RecipesCardFull>
        </ScrollView>
      </View>
    </View>
  );
};
