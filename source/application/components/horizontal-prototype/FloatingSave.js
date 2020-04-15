import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function FloatingSave(props) {
  return (
    <TouchableOpacity
      /* Conditional navigation not supported at the moment */ style={[
        styles.container,
        props.style
      ]}
    >
      <Icon name="save" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,1)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
    borderRadius: 28,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  icon: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 24,
    alignSelf: "center"
  }
});

export default FloatingSave;
