import React, { Component } from 'react';
import { View } from 'react-native';
import LocalizedStrings from 'react-localization';

import { Headline6, Subtitle1, Subtitle2, Body2 } from './MaterialTypography';
import MaterialCard from './MaterialCard';
import '@material/react-material-icon/dist/material-icon.css';

function MealPlansCardFull(props) {
  return (
    <MaterialCard className='mdc-card'>
      <View style={{padding: 16}}>
        <Headline6 style={{margin: 0}}>{props.mainText1}</Headline6>
        <Subtitle2 style={{margin: 0}}>{props.mainText2}</Subtitle2>
      </View>
      <View style={{padding: 16}}>
        <Subtitle1 style={{margin: 0}}>{strings.info}</Subtitle1>
        <Body2 style={{marginBottom: 0}}>{props.bodyText}</Body2>
      </View>
    </MaterialCard>
  );
}

let strings = new LocalizedStrings({
  en: {
    info: 'Information',
  },
});

export default MealPlansCardFull;