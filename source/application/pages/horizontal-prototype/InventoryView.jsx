import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import LocalizedStrings from "react-localization";

import DialogHeader from "../../components/horizontal-prototype/DialogHeader";
import InventoryCardFull from "../../components/horizontal-prototype/InventoryCardFull";

let apiUrl = location.protocol + '//' + (process.env.API_HOST || location.hostname);
if (process.env.API_PORT) {
  apiUrl += ":" + process.env.API_PORT;
}

let strings = new LocalizedStrings({
  en: {
    discard: "Discard",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialHeader1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
  scrollArea1: {
    minWidth: 360,
    width: "100%",
    minHeight: 628,
    backgroundColor: "rgba(230, 230, 230,1)",
  },
  scrollArea1_contentContainerStyle: {
    minWidth: 360,
    width: "100%",
    flexDirection: "column",
  },
  materialCard6: {
    alignSelf: "stretch",
    margin: 15,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id"]);
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    await fetch(apiUrl + '/v2/inventory?inventory_id=' + urlParams.get('id'), {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      // TODO: fetch ingrdients info
      setQuantity(data.quantity);
      setUnit(data.unit);
      setPrice(data.price);
      setState(data.state);
    })
    .catch(console.log);
  });

  return (
    <View style={styles.container}>
      <DialogHeader style={styles.materialHeader1}></DialogHeader>
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        >
          <InventoryCardFull
            text3={strings.discard}
            style={styles.materialCard6}
          ></InventoryCardFull>
        </ScrollView>
      </View>
    </View>
  );
};
