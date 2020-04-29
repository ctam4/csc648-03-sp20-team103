import React, { Component } from 'react';

import { Headline6, Subtitle2, Body2 } from './MaterialTypography';
import MaterialCard, { CardPrimaryContent, CardActions, CardActionButtons } from './MaterialCard';
import MaterialButton from './MaterialButton';

function MealPlansCard(props) {
  return (
    <MaterialCard className='mdc-card'>
      <CardPrimaryContent onClick={props.onClickMain} style={{padding: 16}}>
        <Headline6 style={{margin: 0}}>{props.mainText1}</Headline6>
        <Subtitle2 style={{margin: 0}}>{props.mainText2}</Subtitle2>
        <Body2>{props.bodyText}</Body2>
      </CardPrimaryContent>
      <CardActions>
        <CardActionButtons>
          <MaterialButton onClick={props.onClickAction1}>{props.actionText1}</MaterialButton>
        </CardActionButtons>
      </CardActions>
    </MaterialCard>
  );
}

export default MealPlansCard;
