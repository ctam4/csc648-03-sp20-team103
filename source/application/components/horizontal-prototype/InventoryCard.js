import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";
import "@material/react-card/dist/card.css";

function InventoryCard(props) {
  return (
    <Card>
      <CardPrimaryContent>
        <View style={[styles.container, props.style]}>
          <View style={styles.cardBody}>
            <View style={styles.bodyContent}>
              <Text style={styles.titleStyle}>
                {props.text1 || "Title goes here"}
              </Text>
              <Text style={styles.subtitleStyle}>
                {props.text2 || "Subtitle here"}
              </Text>
            </View>
            <Image
              source={props.cardItemimage}
              style={styles.cardItemImage}
            ></Image>
          </View>
          <CardActions>
            <View style={styles.actionBody}>
              <CardActionButtons>
                <button onClick={props.onPressAction1}>{props.text3 || "ACTION 1"} </button>
                <button onClick={props.onPressAction2}>{props.text4 || "ACTION 2"}</button>
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
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    flex: 1,
    padding: 16,
    paddingTop: 24
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24,
    fontFamily: "Roboto"
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
    fontFamily: "Roboto",
    lineHeight: 16
  },
  cardItemImage: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc",
    margin: 16
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
    padding: 8,
    textTransform: "uppercase"
  },
  actionText2: {
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  }
});

export default InventoryCard;
