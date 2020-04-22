import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { IconContext } from "react-icons";
import { MdPieChart, MdReceipt, MdShoppingCart, MdStorage, MdContentPaste, MdDescription, MdEqualizer, MdEventNote, MdGroup, MdGpsFixed } from "react-icons/md";


function DrawerPanel(props) {
  return (

    <View style={styles.overlay_container}>
    <ScrollView>
    <View style={styles.footerContainer}>
      <Text style={styles.text}>  <MdStorage/>Username</Text>
    </View>
      <View>
        <View style={styles.navSectionStyle}>
          <TouchableOpacity style={styles.navItemStyle} onPress={() => window.location.href = './inventory'}>
          <Text style={styles.text}>   <MdContentPaste/> Inventory</Text>

          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.navSectionStyle}>
          <TouchableOpacity style={styles.navItemStyle} onPress={() => window.location.href = './meal-plans'}>
            <Text style={styles.text}> <MdShoppingCart/>Carts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemStyle} onPress={() => window.location.href = './recipes'}>
           <Text style={styles.text}>   <MdDescription/> Recipes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navSectionStyle}>
          <TouchableOpacity style={styles.navItemStyle} onPress={() => window.location.href = './meal-plans'}>
            <Text style={styles.text}>  <MdEventNote/> Meal Plans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemStyle} onPress={() => window.location.href = './recipes'}>
           <Text style={styles.text}>   <MdEqualizer/> Consumption</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navSectionStyle}>
          <TouchableOpacity style={styles.navItemStyle}>
            <Text style={styles.text}>  <MdGroup/> Users</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    <View style={styles.footerContainer}>
      <Text style={styles.text}>This is my fixed footer</Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    overlay_container: {
        width: 276,
        height: '100%',
        flexDirection: 'column',
        minHeight: 800,
        backgroundColor: "lightgrey",
        elevation: 54,
        transition: 0.3,
        zIndex: 1,
        flex: 1,
        position: 'absolute',
    },
      navItemStyle: {
        padding: 25,
        justifyContent: 'center',
        paddingLeft: 35, 
      },
      navSectionStyle: {
        backgroundColor: 'white'
      },
      sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
      },
      footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey',
        borderBottomWidth: 1,
        borderBottomColor: "grey",
      },
      text: {
          color: "green",
          fontSize: 15,
      },


});

function openNav() {
     
};


export default DrawerPanel;