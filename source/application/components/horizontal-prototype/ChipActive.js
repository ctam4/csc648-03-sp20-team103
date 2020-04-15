import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/";

function ChipActive(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.chipText}>{props.text1 || "Filter"}</Text>
      <Icon name="close-circle" style={styles.iconStyle}></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 12,
    borderRadius: 50
  },
  chipText: {
    color: "rgba(0,0,0,0.87)",
    fontSize: 13
  },
  iconStyle: {
    color: "#9E9E9E",
    fontSize: 24,
    marginLeft: 4,
    marginRight: 4
  }
});

export default ChipActive;
