import React, { Component } from "react";
import { View } from "react-native";

import { Headline6, Subtitle2 } from "./MaterialTypography";
import MaterialCard, { CardPrimaryContent, CardMedia, CardActions, CardActionButtons } from "./MaterialCard";
import MaterialButton from "./MaterialButton";

function InventoryCard(props) {
  return (
    <MaterialCard className="mdc-card">
      <CardPrimaryContent onClick={props.onClickMain} style={{padding: 16}}>
        <CardMedia wide imageUrl={props.mainImage}></CardMedia>
        <View style={{padding: 16}}>
          <Headline6 style={{margin: 0}}>{props.mainText1}</Headline6>
          <Subtitle2 style={{margin: 0}}>{props.mainText2}</Subtitle2>
        </View>
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

export default InventoryCard;
