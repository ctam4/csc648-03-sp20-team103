import React, { Component } from 'react';
import TopAppBar, { TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@material/react-top-app-bar';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-text-field/dist/text-field.css';
import '@material/react-material-icon/dist/material-icon.css';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    search: 'Search',
  },
});

function MaterialTopAppBarSearchDialog(props) {
  return (
    <TopAppBar style={{background: 'rgba(65,117,5,1)'}}>
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              aria-label={props.icon1 || 'arrow_back'}
              hasRipple
              icon={props.icon1 || 'arrow_back'}
              onClick={props.onClick1}
            />
          </TopAppBarIcon>
        </TopAppBarSection>
        <TopAppBarSection align='end' role='toolbar'>
          <TextField
            label={strings.search}
            onTrailingIconSelect={props.onTrailingIconSelect}
            trailingIcon={<MaterialIcon role='button' icon='clear' style={{color: '#fff'}}/>}
            fullWidth
          >
            <Input value={props.value} onChange={props.onChange} style={{color: '#fff', borderBottomColor: '#fff'}} />
          </TextField>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
}

export default MaterialTopAppBarSearchDialog;
