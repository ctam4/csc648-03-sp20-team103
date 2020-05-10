import React, { Component } from 'react';
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from '@material/react-dialog';
import MaterialFilledTextField from './MaterialFilledTextField';
import '@material/react-dialog/dist/dialog.css';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    discard_inventory: 'DISCARD inventory',
    quantity: 'Quantity',
    quantity_helper: 'This is the quantity to be discarded.',
    unit: 'Unit',
    unit_helper: 'This is the unit to be discarded.',
    cancel: 'Cancel',
    discard: 'Discard',
  },
});

function InventoryDiscardDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{strings.consume_inventory}</DialogTitle>
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
      </DialogContent>
      <DialogFooter>
        <DialogButton action='dismiss'>{strings.cancel}</DialogButton>
        <DialogButton action='confirm' isDefault>{strings.discard}</DialogButton>
      </DialogFooter>
    </Dialog>
  );
}

export default InventoryDiscardDialog;
