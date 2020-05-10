import React, { Component } from 'react';

import MaterialCard from './MaterialCard';
import MaterialIcon from '@material/react-material-icon';
import List, { ListGroup, ListGroupSubheader, ListDivider, ListItemGraphic, ListItem, ListItemText, ListItemMeta } from '@material/react-list';
import '@material/react-list/dist/list.css';
import LocalizedStrings from 'react-localization';
import MaterialButton from './MaterialButton';

let strings = new LocalizedStrings({
  en: {
   edit: 'EDIT',
  },
});

  function UsersListCard(props) {


    return(
        <MaterialCard className='mdc-card'>
      <ListGroup>
        <ListGroupSubheader tag='h2'>USERS</ListGroupSubheader>

        <List twoLine>
        <ListItem >
          <ListItemGraphic graphic={<MaterialIcon icon='account_circle'/>} />
          <ListItemText  primaryText={props.primaryText}
                secondaryText={props.secondaryText} />
         <ListItemMeta meta={strings.edit} />
        </ListItem>
        <ListGroupSubheader tag='h2'>Intolerances:</ListGroupSubheader>

      </List>
        <ListDivider tag="div" />
        {props.list1.map((item, i) => (
            <ListItem>
              <ListItemText
                primaryText={item.primaryText}
                secondaryText={item.secondaryText}
              />
            </ListItem>
            ))}
      </ListGroup>
        </MaterialCard>
    );
  }

  export default UsersListCard;