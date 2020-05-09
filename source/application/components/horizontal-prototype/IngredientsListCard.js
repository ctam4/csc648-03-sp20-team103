import React, { Component } from 'react';

import MaterialCard from './MaterialCard';
import List, { ListGroup, ListGroupSubheader, ListDivider, ListItem, ListItemText } from '@material/react-list';
import '@material/react-list/dist/list.css';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    required_ingredients: 'Ingredients (Required)',
    optional_ingredients: 'Ingredients (Optional)',
  },
});

function IngredientsListCard(props) {
  return (
    <MaterialCard className='mdc-card'>
      <ListGroup>
        {props.list1 && (
        <>
          <ListGroupSubheader tag='h2'>{strings.required_ingredients}</ListGroupSubheader>
          <List twoLine>
            {props.list1.map((item, i) => (
            <ListItem>
              <ListItemText
                primaryText={item.primaryText}
                secondaryText={item.secondaryText}
              />
            </ListItem>
            ))}
          </List>
        </>
        )}
        {props.list1 && props.list2 && (
        <ListDivider tag='div' />
        )}
        {props.list2 && (
        <>
          <ListGroupSubheader tag='h2'>{strings.optional_ingredients}</ListGroupSubheader>
          <List twoLine>
            {props.list2.map((item, i) => (
            <ListItem>
              <ListItemText
                primaryText={item.primaryText}
                secondaryText={item.secondaryText}
              />
            </ListItem>
            ))}
          </List>
        </>
        )}
      </ListGroup>
    </MaterialCard>
  );
}

export default IngredientsListCard;
