import React, { useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import { inventorySearchReducer, initialState } from '../../reducers/horizontal-prototype/InventorySearch';
import { setKeywords } from '../../actions/horizontal-prototype/InventorySearch';

import { StyleSheet, View, useWindowDimensions } from 'react-native';
import LocalizedStrings from 'react-localization';

import { Cell, Grid, Row } from '@material/react-layout-grid';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import '@material/react-layout-grid/dist/layout-grid.css';
import InventoryCard from '../../components/horizontal-prototype/InventoryCard';

import Search from '../../components/horizontal-prototype/Search';

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

  return (
    <View className='drawer-container'>
      <Search
        textInput1={state.keywords}
        style={styles.materialSearchBarWithBackground1}
        onChange={(e) => dispatch(setKeywords(e.target.value))}
      ></Search>
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
