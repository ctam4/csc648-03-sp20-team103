import React, { Component } from 'react';
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from '@material/react-dialog';
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';
import '@material/react-dialog/dist/dialog.css';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    cancel: 'Cancel',
    okay: 'OK',
  },
});

function MaterialConfirmationDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <List checkboxList handleSelect={props.handleSelect}>
          {props.choices.map((choice, i) => (
          <ListItem key={i} data-mdc-dialog-action={choice.text}>
            <Checkbox />
            <ListItemText primaryText={choice.text} />
          </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogFooter>
        <DialogButton action='dismiss'>{strings.cancel}</DialogButton>
        <DialogButton action='confirm' isDefault>{strings.okay}</DialogButton>
      </DialogFooter>
    </Dialog>
  );
}

export default MaterialConfirmationDialog;
