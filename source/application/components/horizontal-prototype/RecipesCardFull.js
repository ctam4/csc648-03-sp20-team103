import React, { Component, useState } from 'react';
import { View } from 'react-native';
import LocalizedStrings from 'react-localization';

import { Headline6, Subtitle1, Subtitle2, Body2 } from './MaterialTypography';
import MaterialIcon from '@material/react-material-icon';
import MaterialCard, { CardMedia, CardActions, CardActionIcons } from './MaterialCard';
import '@material/react-material-icon/dist/material-icon.css';

function RecipesCardFull(props) {
  const [cardOpen, setCardOpen] = useState(false);

  const toggleCard = () => {
    setCardOpen(!cardOpen);
  };

  return (
    <MaterialCard className='mdc-card'>
      <CardMedia wide imageUrl={props.mainImage}></CardMedia>
      <View style={{padding: 16}}>
        <Headline6 style={{margin: 0}}>{props.mainText1}</Headline6>
        <Subtitle2 style={{margin: 0}}>{props.mainText2}</Subtitle2>
      </View>
      <CardActions>
        <CardActionIcons>
          <MaterialIcon
            aria-label='favorite'
            hasRipple
            icon='favorite'
            onClick={props.onClickAction1}
          />
          <MaterialIcon
            aria-label='history'
            hasRipple
            icon='history'
            onClick={props.onClickAction2}
          />
          <MaterialIcon
            aria-label='add_shopping_cart'
            hasRipple
            icon='add_shopping_cart'
            onClick={props.onClickAction3}
          />
          <MaterialIcon
            aria-label={cardOpen && 'expand_less' || 'expand_more'}
            hasRipple
            icon={cardOpen && 'expand_less' || 'expand_more'}
            onClick={toggleCard}
          />
        </CardActionIcons>
      </CardActions>
      <View style={{padding: 16}}>
        <Subtitle1 style={{margin: 0}}>{strings.instructions}</Subtitle1>
        <Body2 style={{marginBottom: 0}}>{props.bodyText}</Body2>
      </View>
    </MaterialCard>
  );
}

let strings = new LocalizedStrings({
  en: {
    instructions: 'Instructions',
  },
});

export default RecipesCardFull;
