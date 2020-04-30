import React, { Component } from 'react';
import { View } from 'react-native';

import { Headline6, Subtitle2 } from './MaterialTypography';
import MaterialIcon from '@material/react-material-icon';
import MaterialCard, { CardPrimaryContent, CardMedia, CardActions, CardActionIcons } from './MaterialCard';
import '@material/react-material-icon/dist/material-icon.css';

function RecipesCard(props) {
  return (
    <MaterialCard className='mdc-card'>
      <CardPrimaryContent onClick={props.onClickMain}>
        <CardMedia wide imageUrl={props.mainImage}></CardMedia>
        <View style={{padding: 16}}>
          <Headline6 style={{margin: 0}}>{props.mainText1}</Headline6>
          <Subtitle2 style={{margin: 0}}>{props.mainText2}</Subtitle2>
        </View>
      </CardPrimaryContent>
      <CardActions>
        <CardActionIcons>
          <MaterialIcon
            aria-label='favorite'
            hasRipple
            icon='favorite'
            onClickAction1={props.onClickAction1}
          />
          <MaterialIcon
            aria-label='history'
            hasRipple
            icon='history'
            onClickAction1={props.onClickAction2}
          />
        </CardActionIcons>
      </CardActions>
    </MaterialCard>
  );
}

export default RecipesCard;
