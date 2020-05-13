import React, { Component } from 'react';
import Dialog, { DialogTitle, DialogContent } from '@material/react-dialog';
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-dialog/dist/dialog.css';
import '@material/react-list/dist/list.css';
import '@material/react-material-icon/dist/material-icon.css';

function MaterialSimpleDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <List avatarList handleSelect={props.handleSelect}>
          {props.choices.map((choice, i) => (
          <ListItem key={i} data-mdc-dialog-action={choice.text}>
            <ListItemGraphic graphic={<MaterialIcon icon={choice.text.match(/@/) ? 'person' : 'add'} />} />
            <ListItemText primaryText={choice.text} />
          </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default MaterialSimpleDialog;
