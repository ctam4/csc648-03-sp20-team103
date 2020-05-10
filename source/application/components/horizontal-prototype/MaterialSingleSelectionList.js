import React, { Component } from 'react';

import List, { ListItem, ListItemText } from '@material/react-list';
import '@material/react-list/dist/list.css';

function MaterialSingleSelectionList(props) {
  return (
    <List
      singleSelection
      twoLine
      selectedIndex={props.selectedIndex}
      handleSelect={props.handleSelect}
    >
      {props.items.map((item, i) => (
      <ListItem>
        <ListItemText
          primaryText={item.primaryText}
          secondaryText={item.secondaryText}
        />
      </ListItem>
      ))}
    </List>
  );
}

export default MaterialSingleSelectionList;
