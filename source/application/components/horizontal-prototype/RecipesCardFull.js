import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import LocalizedStrings from "react-localization";
import { IconContext } from "react-icons";
import { MdExpandLess } from "react-icons/md";

function RecipesCardFull(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        //source={require("../assets/images/cardImage1.png")}
        style={styles.cardItemImagePlace}
      ></Image>
      <View style={styles.bodyContent}>
        <Text style={styles.titleStyle}>
          {props.text1 || "Title goes here"}
        </Text>
        <Text style={styles.subtitleStyle}>
          {props.text2 || "Subtitle here"}
        </Text>
      </View>
      <View style={styles.actionBody}>
        <TouchableOpacity style={styles.actionButton1} onPress={props.onPressAction1}>
          <Text style={styles.actionText1}>{props.text3 || "ACTION 1"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton2} onPress={props.onPressAction2}>
          <Text style={styles.actionText2}>{props.text4 || "ACTION 2"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton3} onPress={props.onPressAction3}>
          <IconContext.Provider value={{ style: iconStyles.iconStyle }}>
            <MdExpandLess />
          </IconContext.Provider>
        </TouchableOpacity>
      </View>
      <View style={styles.body2}>
        <Text style={styles.bodyHead1}>{strings.instructions}</Text>
        <Text style={styles.bodyText1}>{props.bodyText1}</Text>
      </View>
    </View>
  );
}

let strings = new LocalizedStrings({
  en: {
    instructions: "instructions",
  },
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden"
  },
  cardItemImagePlace: {
    flex: 1,
    backgroundColor: "#ccc",
    minHeight: 210
  },
  bodyContent: {
    justifyContent: "center",
    padding: 16,
    paddingTop: 24
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24,
    fontFamily: "Roboto"
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
    fontFamily: "Roboto",
    lineHeight: 16
  },
  actionBody: {
    flexDirection: "row",
    padding: 8
  },
  actionButton1: {
    height: 36,
    padding: 8,
    textTransform: "uppercase"
  },
  actionText1: {
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  },
  actionButton2: {
    height: 36,
    padding: 8,
    textTransform: "uppercase"
  },
  actionText2: {
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  },
  actionButton3: {
    height: 36,
    position: "absolute",
    right: 8,
    bottom: 12,
    padding: 8
  },
  body2: {
    padding: 16,
    paddingTop: 8
  },
  bodyHead1: {
    color: "#121212",
    marginBottom: 10,
    fontWeight: "700",
    fontFamily: "Roboto"
  },
  bodyText1: {
    color: "#424242",
    fontSize: 14,
    lineHeight: 20
  }
});
const iconStyles = {
  iconStyle: {
    color: "#000",
    fontSize: 24,
    opacity: 0.7
  }
};

export default RecipesCardFull;
