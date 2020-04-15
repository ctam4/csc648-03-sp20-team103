import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

function RecipeCard(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/cardImage.png")}
        style={styles.cardItemImagePlace}
      ></Image>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.leftBtn}>
          <MaterialCommunityIconsIcon
            name="heart"
            style={styles.icon1}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          style={styles.centerBtn}
        >
          <MaterialIconsIcon
            name="edit"
            style={styles.icon2}
          ></MaterialIconsIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightBtn}>
          <MaterialIconsIcon
            name="history"
            style={styles.icon3}
          ></MaterialIconsIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 185,
    flex: 1,
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
    minHeight: 180
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8
  },
  leftBtn: {
    padding: 8
  },
  icon1: {
    fontSize: 24,
    color: "#000",
    opacity: 0.5
  },
  centerBtn: {
    padding: 8
  },
  icon2: {
    fontSize: 24,
    color: "#000",
    opacity: 0.5
  },
  rightBtn: {
    padding: 8
  },
  icon3: {
    fontSize: 24,
    color: "#000",
    opacity: 0.5
  }
});

export default RecipeCard;
