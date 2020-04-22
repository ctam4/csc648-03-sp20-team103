import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { IconContext } from "react-icons";
import { MdEdit, MdFavorite, MdHistory } from "react-icons/md";

function RecipesCard(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={props.cardItemimage}
        style={styles.cardItemImage}
      ></Image>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.leftBtn} onPress={props.onPressLeft}>
          <IconContext.Provider value={{ style: iconStyles.icon1 }}>
            <MdFavorite />
          </IconContext.Provider>
        </TouchableOpacity>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          style={styles.centerBtn}
          onPress={props.onPressCenter}
        >
          <IconContext.Provider value={{ style: iconStyles.icon2 }}>
            <MdEdit />
          </IconContext.Provider>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightBtn} onPress={props.onPressRight}>
          <IconContext.Provider value={{ style: iconStyles.icon3 }}>
            <MdHistory />
          </IconContext.Provider>
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
  cardItemImage: {
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
  centerBtn: {
    padding: 8
  },
  rightBtn: {
    padding: 8
  }
});
const iconStyles = {
  icon1: {
    color: "#000",
    fontSize: 24,
    opacity: 0.5
  },
  icon2: {
    color: "#000",
    fontSize: 24,
    opacity: 0.5
  },
  icon3: {
    color: "#000",
    fontSize: 24,
    opacity: 0.5
  }
};

export default RecipesCard;
