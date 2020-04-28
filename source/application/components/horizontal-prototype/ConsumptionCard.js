import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";
import "@material/react-card/dist/card.css";

function ConsumptionCard(props) {
  return (
    <Card>
      <CardPrimaryContent>
        <View style={[styles.container, props.style]}>
          <View style={styles.cardItem1Style}>
            <View style={styles.headerStyle}>
              <CardMedia square imageUrl={props.leftImage}>
                <span></span>
              </CardMedia>
              {/*<Image
            source={props.leftImage}
            style={styles.leftImage}
          ></Image>*/}
              <View style={styles.headerContent}>
                <Text style={styles.textStyle}>{props.text1 || "Title"}</Text>
                <Text style={styles.noteTextStyle}>{props.text2 || "Subhead"}</Text>
              </View>
            </View>
          </View>
          <CardMedia wide imageUrl={props.cardItemimage}>
            <span></span>
          </CardMedia>
          {/* <Image
        source={props.cardItemimage}
        style={styles.cardItemImage}
      ></Image>*/}
          <View style={styles.body}>
            <Text style={styles.bodyText}>{props.text3}</Text>
          </View>
          <CardActions>
            <View style={styles.actionBody}>
              <CardActionButtons>
                <button onClick={props.onPressAction1}>{props.text4 || "ACTION 1"} </button>
                <button onClick={props.onPressAction2}>{props.text5 || "ACTION 2"}</button>
              </CardActionButtons>
            </View>
          </CardActions>
        </View>
      </CardPrimaryContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden"
  },
  cardItem1Style: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  headerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  leftImage: {
    width: 40,
    height: 40,
    backgroundColor: "#CCC",
    borderRadius: 20
  },
  headerContent: {
    justifyContent: "center",
    paddingLeft: 16
  },
  textStyle: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Roboto",
    lineHeight: 20
  },
  noteTextStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
    fontFamily: "Roboto",
    lineHeight: 16
  },
  cardItemImage: {
    flex: 1,
    backgroundColor: "#ccc",
    minHeight: 210
  },
  body: {
    padding: 16
  },
  bodyText: {
    color: "#424242",
    fontSize: 14,
    lineHeight: 20
  },
  actionBody: {
    flexDirection: "row",
    padding: 8
  },
  actionButton1: {
    height: 36,
    padding: 8,
    textTransform: "uppercase"
  },
  actionText1: {
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  },
  actionButton2: {
    height: 36,
    marginLeft: 8,
    padding: 8,
    textTransform: "uppercase"
  },
  actionText2: {
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  }
});

export default ConsumptionCard;
