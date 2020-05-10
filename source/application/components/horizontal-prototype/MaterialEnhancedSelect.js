import React, { Component } from 'react';
import Select, { Option } from '@material/react-select';
import '@material/react-list/dist/menu.css';
import '@material/react-menu-surface/dist/menu.css';
import '@material/react-menu/dist/menu.css';
import '@material/react-select/dist/select.css';

function MaterialEnhancedSelect(props) {
  return (
    <Select enhanced label={props.label} value={props.value} onEnhancedChange={props.onEnhancedChange}>
      {props.options.map((option, i) => (
        <Option value={option.value}>{option.text}</Option>
      ))}
    </Select>
  );
}

export default MaterialEnhancedSelect;
