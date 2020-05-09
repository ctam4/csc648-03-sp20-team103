import React, { useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import { inventorySearchReducer, initialState } from '../../reducers/horizontal-prototype/InventorySearch';
import {
  setSearchOpen,
  setKeywords,
  setAutoComplete,
} from '../../actions/horizontal-prototype/InventorySearch';

import { View, useWindowDimensions } from 'react-native';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import '@material/react-layout-grid/dist/layout-grid.css';
import LocalizedStrings from 'react-localization';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialTopAppBarSearchDialog from '../../components/horizontal-prototype/MaterialTopAppBarSearchDialog';
import MaterialSingleSelectionList from '../../components/horizontal-prototype/MaterialSingleSelectionList';

import { apiUrl } from '../../url';

let strings = new LocalizedStrings({
  en: {
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session', 'userID']);
  const [state, dispatch] = useReducer(inventorySearchReducer, initialState);

  useEffect(() => {
    load();
  });

  const load = async () => {
    // TODO: fetch
    /*
    await fetch(apiUrl + '/v3/ingredients/search?session=' + cookies.session + '&userID=' + cookies.userID + '&query=' + state.keywords, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status + ' ' + res.statusText);
      }
      return res.json();
    })
    .then(async (data) => {
      let ingredients = [];
      data.foreach((item) => ingredients.push({
        key: item.ingredientID,
        // @todo
      }));
      dispatch(setAutoComplete(ingredients));
    });
    */
  };

  const toggleSearch = () => {
    dispatch(setSearchOpen(!state.searchOpen));
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      history.back();
    }
  };

  const handleAutoComplete = (value) => {
    window.location.href = '../inventory/view?id=' + state.autoComplete[value].key;
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
          <Grid style={{ height: useWindowDimensions().height - 64 }}>
            <Row>
              <Cell columns={12}>
                <MaterialSingleSelectionList
                  items={state.autoComplete}
                  handleSelect={handleAutoComplete}
                ></MaterialSingleSelectionList>
              </Cell>
            </Row>
          </Grid>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
