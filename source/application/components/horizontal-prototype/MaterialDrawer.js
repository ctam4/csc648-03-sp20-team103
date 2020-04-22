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
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
            <ListItemText primaryText={strings.meal_plans} />
          </ListItem>
        </List>
      </DrawerContent>
    </Drawer>
  );
}

export default MaterialDrawer;
