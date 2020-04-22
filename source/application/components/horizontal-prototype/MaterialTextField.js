import React, { Component, useState } from "react";
import { View } from "react-native";
import TextField, { HelperText, Input } from "@material/react-text-field";
import MaterialIcon from "@material/react-material-icon";
import "@material/react-text-field/dist/text-field.css";
import "@material/react-material-icon/dist/material-icon.css";

function MaterialTextField(props) {
  return (
    <View>
      <TextField
        label={props.label}
        helperText={<HelperText>{props.helperText}</HelperText>}
        onTrailingIconSelect={props.onTrailingIconSelect}
        trailingIcon={<MaterialIcon role="button" icon="delete"/>}
      ><Input
         value={props.value}
         onChange={props.onChange} />
      </TextField>
    </View>
  );
}

export default MaterialTextField;
