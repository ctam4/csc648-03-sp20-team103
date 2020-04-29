import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { StyleSheet, View } from 'react-native';
import { MdAdd } from 'react-icons/md';
import LocalizedStrings from 'react-localization';

import MaterialSnackbar from '../../components/horizontal-prototype/MaterialSnackbar';
import DialogHeader from '../../components/horizontal-prototype/DialogHeader';

//import Icon from 'react-icons/md';
//import Svg { Ellipse } from 'react-native-svg';

let strings = new LocalizedStrings({
  en: {
    center_barcode: 'Center barcode inside box area',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dialogHeader1: {
    minWidth: 360,
    width: '100%',
    height: 56,
  },
  rect1: {
    minWidth: 360,
    width: '100%',
    minHeight: 684,
    maxHeight: '100%',
    backgroundColor: 'rgba(10,9,9,1)',
    alignSelf: 'center',
  },
  rect2: {
    width: 330,
    height: 550,
    backgroundColor: 'rgba(0,0,0,1)',
    borderColor: 'rgba(74,74,74,1)',
    borderWidth: 5,
  },
  icon1: {
    color: 'rgba(255,255,255,1)',
    fontSize: 21,
    height: 21,
    width: 18,
    marginTop: 24,
    marginLeft: 269,
  },
  rect2Stack: {
    width: 330,
    height: 550,
    margin: 'auto',
  },
  ellipse2: {
    top: 0,
    width: 62,
    height: 62,
    position: 'absolute',
    left: 0,
  },
  ellipse3: {
    top: 6,
    width: 47,
    height: 47,
    position: 'absolute',
    left: 7,
  },
  ellipse2Stack: {
    width: 62,
    height: 62,
    marginTop: 27,
    marginLeft: 149,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session']);

  return (
    <View style={styles.container}>
      <DialogHeader
        rightIcon={<MdAdd />}
        style={styles.dialogHeader1}
        onPressRight={() => { window.location.href = '../add' }}
      ></DialogHeader>
      <View style={styles.rect1}>
        <View style={styles.rect2Stack}>
          <View style={styles.rect2}>
            {/*<Icon name='info-circle' style={styles.icon1}></Icon>*/}
          </View>
        </View>
        {/*
        <View style={styles.ellipse2Stack}>
          <Svg viewBox='0 0 61.57 62.24' style={styles.ellipse2}>
            <Ellipse
              strokeWidth={1}
              fill='rgba(0,0,0,1)'
              stroke='rgba(230, 230, 230,1)'
              cx={31}
              cy={31}
              rx={30}
              ry={31}
            ></Ellipse>
          </Svg>
          <Svg viewBox='0 0 47.49 46.85' style={styles.ellipse3}>
            <Ellipse
              strokeWidth={1}
              fill='rgba(255,255,255,1)'
              stroke='rgba(230, 230, 230,1)'
              cx={24}
              cy={23}
              rx={23}
              ry={23}
            ></Ellipse>
          </Svg>
        </View>
        */}
      </View>
      <MaterialSnackbar message={strings.center_barcode} />
    </View>
  );
};
