import React, { Component } from "react";
import TopAppBar, { TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
import "@material/react-top-app-bar/dist/top-app-bar.css";
import "@material/react-material-icon/dist/material-icon.css";
//import { IconContext } from "react-icons";
//import { MdMenu, MdSearch, MdMoreVert } from "react-icons/md";

function MaterialTopAppBar(props) {
  return (
    <TopAppBar style={{background: 'rgba(65,117,5,1)'}}>
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon hasRipple icon='menu' onClick={props.onClick}/>
          </TopAppBarIcon>
          <TopAppBarTitle>{props.title}</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align='end' role='toolbar'>
          <TopAppBarIcon actionItem tabIndex={0}>
            <MaterialIcon
              aria-label="search"
              hasRipple
              icon='search'
              onClick={() => console.log('print')}
            />
          </TopAppBarIcon>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
}

export default MaterialTopAppBar;
