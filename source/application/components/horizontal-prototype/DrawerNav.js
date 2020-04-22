import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { IconContext } from "react-icons";
import { MdPieChart, MdReceipt, MdShoppingCart, MdStorage, MdContentPaste, MdDescription, MdEqualizer, MdEventNote, MdGroup, MdGpsFixed } from "react-icons/md";


function Drawer(props) {
  return (
    <body>
    <header class="mdc-top-app-bar app-bar" id="app-bar">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
          <span class="mdc-top-app-bar__title">Dismissible Drawer</span>
        </section>
      </div>
    </header>
    <aside class="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust">
      <div class="mdc-drawer__content">
        <div class="mdc-list">
          <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
            <span class="mdc-list-item__text">Inbox</span>
          </a>
          <a class="mdc-list-item" href="#">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
            <span class="mdc_list_item__text">Outgoing</span>
          </a>
          <a class="mdc-list-item" href="#">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
            <span class="mdc-list-item__text">Drafts</span>
          </a>
        </div>
      </div>
    </aside>
  
    <div class="mdc_drawer_app_content mdc_top_app_bar--fixed-adjust">
      <main class="main_content" id="main_content">
        App Content
      </main>
    </div>
  </body>

  );
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        height: 100,
      },
      mdc_drawer_app_content: {
        flex: 'auto',
        overflow: 'auto',
        position: 'relative',
      },
      
      main_content: {
        overflow: 'auto',
        height: '100%',
      },
      
      appbar: {
        position: 'absolute',
      },
      
      // only apply this style if below top app bar
      mdctopappbar: {
        zIndex: 7,
      },


});



export default Drawer;