import React, { Component } from 'react';
import TopAppBar, { TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';

function MaterialTopAppBarDialog(props) {
  return (
    <TopAppBar style={{background: 'rgba(65,117,5,1)'}}>
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon
              aria-label={props.icon1 || 'close'}
              hasRipple
              icon={props.icon1 || 'close'}
              onClick={props.onClick1}
            />
          </TopAppBarIcon>
          <TopAppBarTitle>{props.title}</TopAppBarTitle>
        </TopAppBarSection>
        {(props.icon2 || props.onClick2) && (
        <TopAppBarSection align='end' role='toolbar'>
          <TopAppBarIcon actionItem tabIndex={0}>
            <MaterialIcon
              aria-label={props.icon2}
              hasRipple
              icon={props.icon2 || 'search'}
              onClick={props.onClick2}
            />
          </TopAppBarIcon>
        </TopAppBarSection>
        )}
      </TopAppBarRow>
    </TopAppBar>
  );
}

export default MaterialTopAppBarDialog;
