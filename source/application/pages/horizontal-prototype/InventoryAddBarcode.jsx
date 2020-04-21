import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View } from "react-native";
import LocalizedStrings from "react-localization";

import DialogHeader from "../../components/horizontal-prototype/DialogHeader";
//import Icon from "react-icons/md";
import MaterialToast1 from "../../components/horizontal-prototype/MaterialToast1";
//import Svg { Ellipse } from "react-native-svg";

let strings = new LocalizedStrings({
  en: {
    center_barcode: "Center barcode inside box area",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dialogHeader1: {
    width: 364,
    height: 56,
    marginLeft: -4
  },
  rect1: {
    width: 360,
    height: 684,
    backgroundColor: "rgba(10,9,9,1)",
    alignSelf: "center"
  },
  rect2: {
    top: 0,
    left: 8,
    width: 313,
    height: 547,
    backgroundColor: "rgba(0,0,0,1)",
    position: "absolute",
    borderColor: "rgba(74,74,74,1)",
    borderWidth: 5
  },
  icon1: {
    color: "rgba(255,255,255,1)",
    fontSize: 21,
    height: 21,
    width: 18,
    marginTop: 24,
    marginLeft: 269
  },
  materialToast1: {
    top: 10,
    left: 0,
    width: 329,
    height: 48,
    position: "absolute"
  },
  rect2Stack: {
    width: 329,
    height: 547,
    marginTop: 26,
    marginLeft: 13
  },
  ellipse2: {
    top: 0,
    width: 62,
    height: 62,
    position: "absolute",
    left: 0
  },
  ellipse3: {
    top: 6,
    width: 47,
    height: 47,
    position: "absolute",
    left: 7
  },
  ellipse2Stack: {
    width: 62,
    height: 62,
    marginTop: 27,
    marginLeft: 149
  }
});


export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);

  useEffect(() => {

  });
  
  return (
    <View style={styles.container}>
      <DialogHeader style={styles.dialogHeader1}></DialogHeader>
      <View style={styles.rect1}>
        <View style={styles.rect2Stack}>
          <View style={styles.rect2}>
            {/*<Icon name="info-circle" style={styles.icon1}></Icon>*/}
          </View>
          <MaterialToast1
            text1={strings.center_barcode}
            style={styles.materialToast1}
          ></MaterialToast1>
        </View>
        {/*
        <View style={styles.ellipse2Stack}>
          <Svg viewBox="0 0 61.57 62.24" style={styles.ellipse2}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(0,0,0,1)"
              stroke="rgba(230, 230, 230,1)"
              cx={31}
              cy={31}
              rx={30}
              ry={31}
            ></Ellipse>
          </Svg>
          <Svg viewBox="0 0 47.49 46.85" style={styles.ellipse3}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(255,255,255,1)"
              stroke="rgba(230, 230, 230,1)"
              cx={24}
              cy={23}
              rx={23}
              ry={23}
            ></Ellipse>
          </Svg>
        
        </View>
        */}
      </View>
    </View>
  );
};