import React, { Component, useState } from 'react';
import { View } from 'react-native';
import LocalizedStrings from 'react-localization';

import { Headline6, Subtitle1, Subtitle2, Body2 } from './MaterialTypography';
import MaterialIcon from '@material/react-material-icon';
import MaterialCard, { CardMedia, CardActions, CardActionButtons, CardActionIcons } from './MaterialCard';
import MaterialButton from './MaterialButton';
import '@material/react-material-icon/dist/material-icon.css';

function CartsCardFull(props) {
  const [cardOpen, setCardOpen] = useState(false);

  const toggleCard = () => {
    setCardOpen(!cardOpen);
  };

  return (
    <MaterialCard className='mdc-card'>
      <View style={{padding: 16}}>
        <Headline6 style={{margin: 0}}>{props.mainText1}</Headline6>
        <Subtitle2 style={{margin: 0}}>{props.mainText2}</Subtitle2>
      </View>
      <CardActions>
        <CardActionButtons>
          <MaterialButton onClick={props.onClickAction1}>{props.actionText1}</MaterialButton>
        </CardActionButtons>
        <CardActionIcons>
          <MaterialIcon
            aria-label={cardOpen && 'expand_less' || 'expand_more'}
            hasRipple
            icon={cardOpen && 'expand_less' || 'expand_more'}
            onClick={toggleCard}
          />
        </CardActionIcons>
      </CardActions>
    </MaterialCard>
  );
}

let strings = new LocalizedStrings({
  en: {
    log: 'Log',
  },
});

export default CartsCardFull;