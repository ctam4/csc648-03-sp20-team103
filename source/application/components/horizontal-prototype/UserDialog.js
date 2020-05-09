import React, { Component } from 'react';
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from '@material/react-dialog';
import List, { ListItem, ListItemText } from '@material/react-list';
import MaterialFilledTextField from './MaterialFilledTextField';
import '@material/react-dialog/dist/dialog.css';
import '@material/react-list/dist/list.css';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    edit_user: 'CREATE / EDIT user',
    name: 'Name',
    name_helper: 'This is the name of the user.',
    role: 'Role',
    role_helper: 'This is the role of the user.',
    intolerances: 'Intolerances',
    intolerances_helper: 'This is the intolerances of the user.',
    cancel: 'Cancel',
    okay: 'OK',
  },
});

function UserDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{strings.edit_user}</DialogTitle>
      <DialogContent>
        <MaterialFilledTextField
          label={strings.name}
          helperText={strings.name_helper}
          value={props.name}
          onChange={props.onChange1}
          onTrailingIconSelect={props.onTrailingIconSelect1}
        ></MaterialFilledTextField>
        <MaterialFilledTextField
          label={strings.role}
          helperText={strings.role_helper}
          value={props.role}
          onChange={props.onChange2}
          onTrailingIconSelect={props.onTrailingIconSelect2}
        ></MaterialFilledTextField>
        // intolerances
      </DialogContent>
      <DialogFooter>
        <DialogButton action='dismiss'>{strings.cancel}</DialogButton>
        <DialogButton action='confirm' isDefault>{strings.okay}</DialogButton>
      </DialogFooter>
    </Dialog>
  );
}

export default UserDialog;
