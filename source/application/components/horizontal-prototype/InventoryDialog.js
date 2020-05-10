import React, { Component } from 'react';
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from '@material/react-dialog';
import MaterialFilledTextField from './MaterialFilledTextField';
import '@material/react-dialog/dist/dialog.css';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    add_edit_inventory: 'ADD / EDIT inventory',
    quantity: 'Quantity',
    quantity_helper: 'This is the name of the storable.',
    unit: 'Unit',
    unit_helper: 'This is the unit of the storable.',
    price: 'Price',
    price_helper: 'This is the price of the storable.',
    expiration_date: 'Expiration date',
    expiration_date_helper: 'This is the expiration date of the storable.',
    cancel: 'Cancel',
    okay: 'OK',
  },
});

function InventoryDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{strings.add_edit_inventory}</DialogTitle>
      <DialogContent>
        <MaterialFilledTextField
          label={strings.quantity}
          helperText={strings.quantity_helper}
          value={props.quantity}
          onChange={props.onChange1}
          onTrailingIconSelect={props.onTrailingIconSelect1}
        ></MaterialFilledTextField>
        <MaterialFilledTextField
          label={strings.unit}
          helperText={strings.unit_helper}
          value={props.unit}
          onChange={props.onChange2}
          onTrailingIconSelect={props.onTrailingIconSelect2}
        ></MaterialFilledTextField>
        <MaterialFilledTextField
          label={strings.price}
          helperText={strings.price_helper}
          value={props.price}
          onChange={props.onChange3}
          onTrailingIconSelect={props.onTrailingIconSelect3}
        ></MaterialFilledTextField>
        <MaterialFilledTextField
          label={strings.expiration_date}
          helperText={strings.expiration_date_helper}
          value={props.expirationDate}
          onChange={props.onChange4}
          onTrailingIconSelect={props.onTrailingIconSelect4}
        ></MaterialFilledTextField>
      </DialogContent>
      <DialogFooter>
        <DialogButton action='cancel'>{strings.cancel}</DialogButton>
        <DialogButton action='confirm' isDefault>{strings.okay}</DialogButton>
      </DialogFooter>
    </Dialog>
  );
}

export default InventoryDialog;
