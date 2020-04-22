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
    Name: "Pasta Alfredo",
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
    maxHeight: "100%",
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
    load();
  }, []);

  const load = async () => {
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
  };

  const handleSave = async () => {
    // TODO: fetch
  };

  const handleAddToCart = async () => {
    // TODO: fetch
  };

  return (
    <View style={styles.container}>
      <DialogHeader style={styles.materialHeader1}></DialogHeader>
      <View style={styles.scrollArea}>
        <ScrollView contentContainerStyle={styles.scrollArea_contentContainerStyle}>
          <RecipesCardFull
            text1={strings.Name}
            text2="2 servings / 500 calories per serving"
            text3={strings.save}
            text4={strings.add_to_cart}
            bodyText1={"1. Cook the pasta according to the package instructions \n2. Melt the butter in a large skillet over medium high heat. Add the garlic and cook for 30 seconds, or until fragrant.\n3. Pour in the milk and cream. Stir consistently to avoid burning on the bottom of the pan until the mixture comes to a boil. Turn the heat down to medium, and mix in the parmesan cheese, salt, and pepper. Adjust the seasoning to your own taste \n4. Remove the pan from the heat and mix in the cooked pasta until the sauce begins to thicken. Garnish with parsley, and serve."}
            style={styles.materialCard6}
            onPressAction1={handleSave}
            onPressAction2={handleAddToCart}
          ></RecipesCardFull>
        </ScrollView>
      </View>
    </View>
  );
};
