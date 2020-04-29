import React, { Component } from 'react';

import { Headline6, Subtitle2, Body2 } from './MaterialTypography';
import MaterialCard, { CardPrimaryContent, CardActions, CardActionButtons } from './MaterialCard';
import MaterialButton from './MaterialButton';

function CartsCard(props) {
  return (
    <MaterialCard className='mdc-card'>
      <CardPrimaryContent onClick={props.onClickMain} style={{padding: 16}}>
        <Headline6 style={{margin: 0}}>{props.text1}</Headline6>
        <Subtitle2 style={{margin: 0}}>{props.text2}</Subtitle2>
        <Body2 style={{paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 8}}>{props.text3}</Body2>
      </CardPrimaryContent>
      <CardActions>
        <CardActionButtons>
          <MaterialButton onClick={props.onClickAction1}>{props.text4}</MaterialButton>
          <MaterialButton onClick={props.onClickAction2}>{props.text5}</MaterialButton>
        </CardActionButtons>
      </CardActions>
    </MaterialCard>
  );
}

export default CartsCard;
