import React, { Component } from 'react';
import { ChipSet, Chip } from '@material/react-chips';
import '@material/react-chips/dist/chips.css';

function MaterialChoiceChips(props) {
  return (
    <ChipSet choice selectedChipIds={props.selectedChipIds} handleSelect={props.handleSelect}>
      {props.choices.map((choice, i) => (
      <Chip id={choice.id} label={choice.label} />
      ))}
    </ChipSet>
  );
}

export default MaterialChoiceChips;
