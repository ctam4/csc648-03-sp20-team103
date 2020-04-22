import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";

function ChipActive(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.chipText}>{props.text1 || "Filter"}</Text>
      <IconContext.Provider value={{ style: iconStyles.iconStyle }}>
        <MdClose />
      </IconContext.Provider>
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
  }
});
const iconStyles = {
  icon: {
    color: "#9E9E9E",
    fontSize: 24,
    marginLeft: 4,
    marginRight: 4
  }
};

export default ChipActive;
