import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonWithVioletText(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Text style={styles.caption}>{props.text1 || "BUTTON"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    minWidth: 88
  },
  caption: {
    color: "#3F51B5",
    fontSize: 14,
    fontFamily: "Roboto",
    textTransform: "uppercase"
  }
});

export default MaterialButtonWithVioletText;