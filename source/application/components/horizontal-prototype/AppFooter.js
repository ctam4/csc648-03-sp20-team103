import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import LocalizedStrings from "react-localization";
import { IconContext } from "react-icons";
import { MdPieChart, MdReceipt, MdShoppingCart, MdStorage } from "react-icons/md";

function AppFooter(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity /* Conditional navigation not supported at the moment */
        style={styles.btnWrapper1}
        onPress={() => window.location.href = '/horizontal-prototype/inventory'}
      >
        <IconContext.Provider value={{ style: iconStyles.icon1 }}>
          <MdStorage />
        </IconContext.Provider>
        <Text style={styles.btn1Text}>{strings.inventory}</Text>
      </TouchableOpacity>
      <TouchableOpacity /* Conditional navigation not supported at the moment */
        style={styles.btnWrapper4}
        onPress={() => window.location.href = '/horizontal-prototype/recipes'}
      >
        <IconContext.Provider value={{ style: iconStyles.icon22 }}>
          <MdReceipt />
        </IconContext.Provider>
        <Text style={styles.btn2Text2}>{strings.recipes}</Text>
      </TouchableOpacity>
      <TouchableOpacity /* Conditional navigation not supported at the moment */
        style={styles.btnWrapper2}
        onPress={() => window.location.href = '/horizontal-prototype/carts'}
      >
        <IconContext.Provider value={{ style: iconStyles.icon23 }}>
          <MdShoppingCart />
        </IconContext.Provider>
        <Text style={styles.btn2Text3}>{strings.carts}</Text>
      </TouchableOpacity>
      <TouchableOpacity /* Conditional navigation not supported at the moment */
        style={styles.btnWrapper3}
        onPress={() => window.location.href = '/horizontal-prototype/consumption'}
      >
        <IconContext.Provider value={{ style: iconStyles.icon3 }}>
          <MdPieChart />
        </IconContext.Provider>
        <Text style={styles.btn3Text}>{strings.consumption}</Text>
      </TouchableOpacity>
    </View>
  );
}

let strings = new LocalizedStrings({
  en: {
    inventory: "Inventory",
    recipes: "Recipes",
    carts: "Carts",
    consumption: "Consumption",
  },
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(65,117,5,1)",
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 8,
    paddingBottom: 6,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  btn1Text: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontFamily: "Roboto"
  },
  btnWrapper4: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 8,
    paddingBottom: 6,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  btn2Text2: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontFamily: "Roboto"
  },
  btnWrapper2: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 8,
    paddingBottom: 6,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  btn2Text3: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontFamily: "Roboto"
  },
  btnWrapper3: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 8,
    paddingBottom: 6,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  btn3Text: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontFamily: "Roboto"
  }
});
const iconStyles = {
  icon1: {
    color: "#FFFFFF",
    fontSize: 24
  },
  icon22: {
    color: "#FFFFFF",
    fontSize: 24
  },
  icon23: {
    color: "#FFFFFF",
    fontSize: 24
  },
  icon3: {
    color: "#FFFFFF",
    fontSize: 24
  }
};

export default AppFooter;
