import React, { Component } from "react";
import { StyleSheet } from "react-native";
import TopAppBar, { TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
import "@material/react-top-app-bar/dist/top-app-bar.css";
import "@material/react-material-icon/dist/material-icon.css";
//import { IconContext } from "react-icons";
//import { MdMenu, MdSearch, MdMoreVert } from "react-icons/md";

function MaterialTopAppBar(props) {
  return (
    <TopAppBar style={{background: 'rgba(65,117,5,1)'}}>
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon hasRipple icon='menu' onClick={props.onClick}/>
          </TopAppBarIcon>
          <TopAppBarTitle>{props.title}</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align='end' role='toolbar'>
          <TopAppBarIcon actionItem tabIndex={0}>
            <MaterialIcon
              aria-label="search"
              hasRipple
              icon='search'
              onClick={() => console.log('print')}
            />
          </TopAppBarIcon>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    /*
    <View style={[styles.container, props.style]}>
      <View style={styles.leftIconButtonRow}>
        <TouchableOpacity style={styles.leftIconButton} onPress={props.onPressLeft}>
          <IconContext.Provider value={{ style: iconStyles.leftIcon2 }}>
            <MdMenu />
          </IconContext.Provider>
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.title}>

          </Text>
        </View>
      </View>
      <View style={styles.leftIconButtonRowFiller}></View>
      <View style={styles.rightIconsWrapper}>
        <TouchableOpacity /* Conditional navigation not supported at the moment *\/
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
    */
  );
}

const styles = StyleSheet.create({


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

export default MaterialTopAppBar;
