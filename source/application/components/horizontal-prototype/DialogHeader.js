import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function DialogHeader(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftIconButtonRow}>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          style={styles.leftIconButton}
        >
          <MaterialIconsIcon
            name="close"
            style={styles.leftIcon2}
          ></MaterialIconsIcon>
        </TouchableOpacity>
        <View style={styles.textWrapper}></View>
      </View>
      <View style={styles.leftIconButtonRowFiller}></View>
      <TouchableOpacity style={styles.rightIconButton}>
        <MaterialCommunityIconsIcon
          name="dots-vertical"
          style={styles.rightIcon2}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
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
  rightIconButton: {
    alignItems: "center",
    padding: 11,
    marginRight: 5,
    marginTop: 5
  },
  rightIcon2: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 24
  }
});

export default DialogHeader;
