import React from "react";
import { AppRegistry } from "react-native";

import InventoryScanReciept from "../pages/horizontal-prototype/InventoryScanReciept.jsx";

AppRegistry.registerComponent("InventoryScanReciept", () => InventoryScanReciept);

AppRegistry.runApplication("InventoryScanReciept", {
  initialProps: {},
  rootTag: document.getElementById("react-root")
});
