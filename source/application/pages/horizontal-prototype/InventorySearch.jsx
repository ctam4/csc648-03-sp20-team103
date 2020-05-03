import React, { useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import { inventorySearchReducer, initialState } from '../../reducers/horizontal-prototype/InventorySearch';
import { setSearchOpen, setKeywords } from '../../actions/horizontal-prototype/InventorySearch';

import { StyleSheet, View, useWindowDimensions } from 'react-native';
import LocalizedStrings from 'react-localization';

import { Cell, Grid, Row } from '@material/react-layout-grid';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import '@material/react-layout-grid/dist/layout-grid.css';
import InventoryCard from '../../components/horizontal-prototype/InventoryCard';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialTopAppBarSearchDialog from '../../components/horizontal-prototype/MaterialTopAppBarSearchDialog';

let strings = new LocalizedStrings({
  en: {
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialSearchBarWithBackground1: {
    minWidth: 360,
    width: '100%',
    height: 56,
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(['session']);
  const [state, dispatch] = useReducer(inventorySearchReducer, initialState);

  useEffect(() => {
    load();
  });

  const load = async () => {
    // TODO: fetch
  };

  const toggleSearch = () => {
    dispatch(setSearchOpen(!state.searchOpen));
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      history.back();
    }
  };

  return (
    <View className='drawer-container'>
      {!state.searchOpen && (
      <MaterialTopAppBarDialog
        icon1={'arrow_back'}
        onClick1={handleGoBack}
        onClick2={toggleSearch}
      ></MaterialTopAppBarDialog>
      )}
      {state.searchOpen && (
      <MaterialTopAppBarSearchDialog
        value={state.keywords}
        onClick1={toggleSearch}
        onChange={(e) => dispatch(setKeywords(e.target.value))}
        onTrailingIconSelect={() => dispatch(setKeywords(''))}
      ></MaterialTopAppBarSearchDialog>
      )}
      <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
        <DrawerAppContent className='drawer-app-content'>
          <Grid style={{ height: useWindowDimensions().height - 64}}>
            <Row>
              
            </Row>
          </Grid>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
