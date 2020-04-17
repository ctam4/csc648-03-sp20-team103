import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";

function FloatingCreate(props) {
  return (
    <TouchableOpacity
      /* Conditional navigation not supported at the moment */ style={[
        styles.container,
        props.style
      ]}
    >
      <IconContext.Provider value={{ style: iconStyles.icon }}>
        <MdAdd />
      </IconContext.Provider>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(65,117,5,1)",
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
});
const iconStyles = {
  icon: {
    color: "#fff",
    fontSize: 24
  }
};

export default FloatingCreate;
