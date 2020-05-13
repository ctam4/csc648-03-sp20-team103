import React, { Component } from 'react';
import TextField, { HelperText, Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-text-field/dist/text-field.css';
import '@material/react-material-icon/dist/material-icon.css';

function MaterialFilledTextField(props) {
  return (
    <TextField
      label={props.label}
      helperText={<HelperText>{props.helperText}</HelperText>}
      onTrailingIconSelect={props.onTrailingIconSelect}
      trailingIcon={<MaterialIcon role='button' icon={props.trailingIcon || 'clear'} />}
      style={{ width: '100%' }}
    >
      <Input
        inputType={props.inputType}
        value={props.value}
        onChange={props.onChange}
      />
    </TextField>
  );
}

export default MaterialFilledTextField;
