import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { StyleSheet, View, ScrollView } from "react-native";
import { MdFilterList } from "react-icons/md";
import LocalizedStrings from "react-localization";

import AppHeader from "../../components/horizontal-prototype/AppHeader";
import InventoryCard from "../../components/horizontal-prototype/InventoryCard";
import MaterialToast1 from "../../components/horizontal-prototype/MaterialToast1";
import FloatingCreate from "../../components/horizontal-prototype/FloatingCreate";
import AppFooter from "../../components/horizontal-prototype/AppFooter";

let apiUrl = location.protocol + '//' + (process.env.API_HOST || location.hostname);
if (process.env.API_PORT) {
  apiUrl += ":" + process.env.API_PORT;
}

let strings = new LocalizedStrings({
  en: {
    inventory: "Inventory",
    view_log: "View log",
    discard: "Discard",
    toast_added: "Item added to inventory.",
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
  materialCardWithImageAndTitle: {
    alignSelf: "stretch",
    height: 166,
    margin: 15,
  },
  materialCardWithImageAndTitle1: {
    alignSelf: "stretch",
    height: 166,
    margin: 15,
  },
  materialToast1: {
    bottom: 132,
    left: 15,
    minWidth: 330,
    height: 48,
    position: "absolute",
  },
  floatingCreate: {
    bottom: 61,
    right: 15,
    width: 56,
    height: 56,
    position: "absolute",
  },
  materialBasicFooter1: {
    minWidth: 360,
    width: "100%",
    height: 56,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(["session_id", "fridge_id"]);

  let inventory = [];
  let ingredients = [];

  useEffect(async () => {
    await fetch(apiUrl + '/v2/ingredients', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredient_id: '1',
        name: 'milk',
        image: '',
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Dummy ingredients setup successful.');
    })
    .catch(console.log);
    await fetch(apiUrl + '/v2/inventory/manual', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fridge_id: cookies.fridge_id,
        ingredient_id: '1',
        quantity: 1.0,
        unit: 'ct',
        price: 10,
        expiration_date: Math.round(Date.now() / 1000),
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Dummy inventory setup successful.');
    })
    .catch(console.log);
    await fetch(apiUrl + '/v2/inventory/list/all', {
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
      inventory = data;
    })
    .catch(console.log);
    await fetch(apiUrl + '/v2/ingredients', {
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
      ingredients = data;
    })
    .catch(console.log);
  });

  return (
    <View style={styles.container}>
      <AppHeader
        text1={strings.inventory}
        rightIcon2={<MdFilterList />}
        style={styles.materialHeader1}
        onPressRight1={() => window.location.href = './inventory/search' }
      ></AppHeader>
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea1_contentContainerStyle}
        >
          {inventory.map((item, index) => {
            <InventoryCard
              text1={ingredients.find(ingredient => ingredient.ingredient_id == item.ingredient_id).name}
              text2={item.quantity + " " + item.unit + " \n stored 10 days ago \n expiring on " + item.expiration_date}
              text3={strings.view_log}
              text4={strings.discard}
              onPressAction1={() => { window.location.href = './inventory/view?id=' }}
              //onPressAction2={() => { }}
              style={styles.materialCardWithImageAndTitle}
            ></InventoryCard>
          })}
        </ScrollView>
      </View>
      <MaterialToast1
        text1={strings.toast_added}
        style={styles.materialToast1}
      ></MaterialToast1>
      <FloatingCreate style={styles.floatingCreate} onPress={() => window.location.href = './inventory/add' }></FloatingCreate>
      <AppFooter style={styles.materialBasicFooter1}></AppFooter>
    </View>
  );
};
