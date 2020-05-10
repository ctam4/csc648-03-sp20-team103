import React, { Component } from 'react';

import MaterialCard from './MaterialCard';
import MaterialSingleSelectionList from './MaterialSingleSelectionList';

function UsersListCard(props) {
  return (
    <MaterialCard className='mdc-card'>
      <MaterialSingleSelectionList items={props.items} handleSelect={props.handleSelect} />
    </MaterialCard>
  );
}

export default UsersListCard;
