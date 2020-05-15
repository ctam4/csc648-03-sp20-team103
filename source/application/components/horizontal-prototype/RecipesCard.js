import React, { Component } from 'react';
import { View } from 'react-native';

import { Headline6, Subtitle2 } from './MaterialTypography';
import MaterialIcon from '@material/react-material-icon';
import MaterialCard, { CardPrimaryContent, CardMedia, CardActions, CardActionButtons, CardActionIcons } from './MaterialCard';
import MaterialButton from './MaterialButton';
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
        {(props.actionText1 || props.actionText2) && (
        <CardActionButtons>
          <MaterialButton onClick={props.onClickAction1}>{props.actionText1}</MaterialButton>
          <MaterialButton onClick={props.onClickAction2}>{props.actionText2}</MaterialButton>
        </CardActionButtons>
        )}
        {!(props.actionText1 || props.actionText2) && (
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
        </CardActionIcons>
        )}
      </CardActions>
    </MaterialCard>
  );
}

export default RecipesCard;
