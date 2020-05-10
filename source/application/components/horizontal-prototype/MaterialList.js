import React, { Component } from 'react';

import List, { ListItem, ListItemText } from '@material/react-list';
import '@material/react-list/dist/list.css';

function MaterialList(props) {
  return (
    <List twoLine>
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

export default MaterialList;
