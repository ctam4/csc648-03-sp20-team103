import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { View, useWindowDimensions } from 'react-native';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import LocalizedStrings from 'react-localization';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import CartsCardFull from '../../components/horizontal-prototype/CartsCardFull';

let apiUrl = location.protocol + '//' + (process.env.API_HOST || location.hostname);
if (process.env.API_PORT) {
  apiUrl += ':' + process.env.API_PORT;
}

let strings = new LocalizedStrings({
  en: {
    clear_cart: 'Clear cart',
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session']);
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    await fetch(apiUrl + '/v2/carts?carts_id=' + urlParams.get('id'), {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      // TODO: fetch Carts info of user
      setQuantity(data.quantity);
      setUnit(data.unit);
      setPrice(data.price);
      setState(data.state);
    })
    .catch(console.log);
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      history.back();
    }
  };

  const handleClearCart = async () => {
    // TODO: fetch
  };

  return (
    <View className='drawer-container'>
      <MaterialTopAppBarDialog
        onClick1={handleGoBack}
      ></MaterialTopAppBarDialog>
      <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
        <DrawerAppContent className='drawer-app-content'>
          <Grid style={{ height: useWindowDimensions().height - 64 }}>
            <Row>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={8}>
                <CartsCardFull
                  mainText1='Apple'
                  mainText2='whatever'
                  actionText1={strings.clear_cart}
                  onClickAction1={handleClearCart}
                ></CartsCardFull>
              </Cell>
            </Row>
          </Grid>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
