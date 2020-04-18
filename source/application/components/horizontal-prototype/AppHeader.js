import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { IconContext } from "react-icons";
import { MdMenu, MdSearch, MdMoreVert } from "react-icons/md";

function AppHeader(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftIconButtonRow}>
        <TouchableOpacity style={styles.leftIconButton} onPress={props.onPressLeft}>
          <IconContext.Provider value={{ style: iconStyles.leftIcon2 }}>
            <MdMenu />
          </IconContext.Provider>
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
          onPress={props.onPressRight1}
        >
          <IconContext.Provider value={{ style: iconStyles.rightIcon1 }}>
            {props.rightIcon1 || <MdSearch />}
          </IconContext.Provider>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton2} onPress={props.onPressRight2}>
          <IconContext.Provider value={{ style: iconStyles.rightIcon2 }}>
            {props.rightIcon2 || <MdMoreVert />}
          </IconContext.Provider>
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
  textWrapper: {
    alignSelf: "flex-end",
    marginLeft: 21,
    marginBottom: 14
  },
  title: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
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
  iconButton2: {
    padding: 11
  },
});
const iconStyles = {
  leftIcon2: {
    color: "#FFFFFF",
    fontSize: 24
  },
  rightIcon1: {
    color: "#FFFFFF",
    fontSize: 24
  },
  rightIcon2: {
    color: "#FFFFFF",
    fontSize: 24
  }
};

export default AppHeader;
