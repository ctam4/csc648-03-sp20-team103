import React, { Component } from 'react';

import { Headline6, Subtitle2, Body2 } from './MaterialTypography';
import MaterialCard, { CardPrimaryContent, CardMedia, CardActions, CardActionButtons } from './MaterialCard';
import MaterialButton from './MaterialButton';

function ConsumptionCard(props) {
  return (
    <MaterialCard className='mdc-card'>
      <CardPrimaryContent onClick={props.onClickUser} style={{padding: 16}}>
        {/*
        <CardMedia square imageUrl={props.userImage} style={{width: 40, height: 40, borderRadius: 20, marginRight: 20}}></CardMedia>
        */}
        <Headline6 style={{margin: 0}}>{props.userText1}</Headline6>
        <Subtitle2 style={{margin: 0}}>{props.userText2}</Subtitle2>
      </CardPrimaryContent>
      <CardPrimaryContent onClick={props.onClickMain}>
        <CardMedia wide imageUrl={props.mainImage}></CardMedia>
        <Body2 style={{paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 8}}>{props.mainText}</Body2>
      </CardPrimaryContent>
      <CardActions>
        <CardActionButtons>
          <MaterialButton onClick={props.onClickAction1}>{props.actionText1}</MaterialButton>
          <MaterialButton onClick={props.onClickAction2}>{props.actionText2}</MaterialButton>
        </CardActionButtons>
      </CardActions>
    </MaterialCard>
  );
}

export default ConsumptionCard;
