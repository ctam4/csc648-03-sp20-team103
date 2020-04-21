import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { IconContext } from "react-icons";
import { MdArrowBack, MdClose } from "react-icons/md";

function Search(props) {
  const handleClear = () => {
    // TODO
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect1}>
        <TouchableOpacity
          onPress={props.onPressLeft}
          style={styles.leftIconButton}
        >
          <IconContext.Provider value={{ style: iconStyles.leftIcon2 }}>
            <MdArrowBack />
          </IconContext.Provider>
        </TouchableOpacity>
        <View style={styles.inputStyleStack}>
          <TextInput
            placeholder={props.textInput1 || "Search"}
            placeholderTextColor="#ffffff"
            selectTextOnFocus={true}
            dataDetector="all"
            style={styles.inputStyle}
            onChange={props.onChange}
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <IconContext.Provider value={{ style: iconStyles.rightIcon2 }}>
            <MdClose />
          </IconContext.Provider>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(65,117,5,1)",
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
  rect1: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  leftIconButton: {
    padding: 11,
    marginLeft: 5,
    marginTop: 5
  },
  inputStyle: {
    top: 0,
    left: 0,
    width: 263,
    height: 48,
    color: "#FFFFFF",
    position: "absolute",
    alignSelf: "flex-start",
    paddingRight: 5,
    fontSize: 16,
    fontFamily: "Roboto",
    lineHeight: 16
  },
  button: {
    top: 1,
    position: "absolute",
    alignItems: "center",
    right: 0,
    padding: 11
  },
  inputStyleStack: {
    minWidth: 298,
    height: 48,
    marginLeft: 21,
    marginTop: 4
  }
});
const iconStyles = {
  leftIcon2: {
    color: "#FFFFFF",
    fontSize: 24
  },
  rightIcon2: {
    color: "#FFFFFF",
    fontSize: 24
  }
};

export default Search;
