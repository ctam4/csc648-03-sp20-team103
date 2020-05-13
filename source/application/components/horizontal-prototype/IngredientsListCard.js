import React, { Component } from 'react';

import MaterialCard from './MaterialCard';
import MaterialList from './MaterialList';
import { ListGroup, ListGroupSubheader, ListDivider } from '@material/react-list';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    required_ingredients: 'Ingredients (required)',
    optional_ingredients: 'Ingredients (optional)',
  },
});

function IngredientsListCard(props) {
  return (
    <MaterialCard className='mdc-card'>
      <ListGroup>
        {props.list1 && (
        <>
          <ListGroupSubheader tag='h2'>{strings.required_ingredients}</ListGroupSubheader>
          <MaterialList items={props.list1} />
        </>
        )}
        {props.list1 && props.list2 && (
        <ListDivider tag='div' />
        )}
        {props.list2 && (
        <>
          <ListGroupSubheader tag='h2'>{strings.optional_ingredients}</ListGroupSubheader>
          <MaterialList items={props.list2} />
        </>
        )}
      </ListGroup>
    </MaterialCard>
  );
}

export default IngredientsListCard;
