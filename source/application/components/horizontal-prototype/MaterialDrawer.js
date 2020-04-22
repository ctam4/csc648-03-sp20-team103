import React, { Component, useState } from "react";
import Drawer, { DrawerContent, DrawerHeader, DrawerTitle } from "@material/react-drawer";
import List, { ListItem, ListItemGraphic, ListItemText } from "@material/react-list";
import MaterialIcon from "@material/react-material-icon";
import "@material/react-drawer/dist/drawer.css";
import "@material/react-list/dist/list.css";
import "@material/react-material-icon/dist/material-icon.css";
import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
  en: {
    meal_plans: "Meal Plans",
    inventory: "Inventory",
    consumption: "Consumption",
    carts: "Carts",
    users: "Users",
    recipes: "Recipes",
  },
});

function MaterialDrawer(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Drawer modal open={props.open}>
      <DrawerHeader>
        <DrawerTitle tag='h2'>
          {props.title}
        </DrawerTitle>
      </DrawerHeader>
      <DrawerContent>
        <List singleSelection selectedIndex={selectedIndex}>
          <ListItem  onClick={() => window.location.href = './meal-plans'}>
            <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
            <ListItemText primaryText={strings.meal_plans} />
          </ListItem>
          <ListItem  onClick={() => window.location.href = './inventory'}>
            <ListItemGraphic graphic={<MaterialIcon icon='list_alt'/>} />
            <ListItemText primaryText={strings.inventory} />
          </ListItem>
          <ListItem onClick={() => window.location.href = './consumption'}>
            <ListItemGraphic graphic={<MaterialIcon icon='bar_chart'/>} />
            <ListItemText primaryText={strings.consumption} />
          </ListItem>
          <ListItem onClick={() => window.location.href = './carts'}>
            <ListItemGraphic graphic={<MaterialIcon icon='shopping_cart'/>} />
            <ListItemText primaryText={strings.carts} />
          </ListItem>
          <ListItem onClick={() => window.location.href = './recipes'} >
            <ListItemGraphic graphic={<MaterialIcon icon='description'/>} />
            <ListItemText primaryText={strings.recipes} />
          </ListItem>
        </List>
      </DrawerContent>
    </Drawer>
  );
}

export default MaterialDrawer;
