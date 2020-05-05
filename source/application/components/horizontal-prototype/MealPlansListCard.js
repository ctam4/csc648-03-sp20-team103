import React, { Component } from 'react';

import MaterialCard from './MaterialCard';
import List, { ListGroup, ListGroupSubheader, ListDivider, ListItem, ListItemText } from '@material/react-list';
import '@material/react-list/dist/list.css';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    meal_one: 'Meal 1: Breakfast',
    meal_two: 'Meal 2: Lunch',
    meal_three: 'Meal 3: Dinner'
  },
});

function MealPlansListCard(props) {
  console.log(props.list1);
  return (
    <MaterialCard className='mdc-card'>
      <ListGroup>
        {props.list1 && (
        <>
          <ListGroupSubheader tag='h2'>{strings.meal_one}</ListGroupSubheader>
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
        <ListDivider tag="div" />
        )}
        {props.list2 && (
        <>
          <ListGroupSubheader tag='h2'>{strings.meal_two}</ListGroupSubheader>
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
        {props.list2 && props.list3 && (
        <ListDivider tag="div" />
        )}
        {props.list3 && (
        <>
          <ListGroupSubheader tag='h2'>{strings.meal_three}</ListGroupSubheader>
          <List twoLine>
            {props.list3.map((item, i) => (
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

export default MealPlansListCard;
