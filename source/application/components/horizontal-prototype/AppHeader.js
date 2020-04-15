import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function AppHeader(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftIconButtonRow}>
        <TouchableOpacity style={styles.leftIconButton}>
          <MaterialCommunityIconsIcon
            name="menu"
            style={styles.leftIcon2}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.title}>
            {props.text1 || "Title"}
          </Text>
        </View>
      </View>
      <View style={styles.leftIconButtonRowFiller}></View>
      <View style={styles.rightIconsWrapper}>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          style={styles.iconButton}
        >
          <MaterialCommunityIconsIcon
            name={props.icon2Name || "magnify"}
            style={styles.rightIcon1}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton2}>
          <MaterialCommunityIconsIcon
            name="dots-vertical"
            style={styles.rightIcon2}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(65,117,5,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    elevation: 3,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  leftIconButton: {
    padding: 11
  },
  leftIcon2: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 24
  },
  textWrapper: {
    alignSelf: "flex-end",
    marginLeft: 21,
    marginBottom: 14
  },
  title: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "roboto-regular",
    lineHeight: 18
  },
  leftIconButtonRow: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5
  },
  leftIconButtonRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rightIconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    marginTop: 5
  },
  iconButton: {
    padding: 11
  },
  rightIcon1: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 24
  },
  iconButton2: {
    padding: 11
  },
  rightIcon2: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 24
  }
});

export default AppHeader;
