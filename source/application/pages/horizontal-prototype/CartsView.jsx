import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LocalizedStrings from 'react-localization';

import { View, useWindowDimensions } from 'react-native';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialSnackbar from '../../components/horizontal-prototype/MaterialSnackbar';
import CartsCardFull from '../../components/horizontal-prototype/CartsCardFull';

import { apiUrl } from '../../url';

const strings = new LocalizedStrings({
  en: {
    clear_cart: 'Clear cart',
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session', 'userID']);
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [toast, setToast] = useState('');

  const load = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    await fetch(`${apiUrl}/v4/carts?carts_id=${urlParams.get('id')}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
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
      .catch((error) => setToast(error.toString()));
  };

  useEffect(() => {
    load();
  }, []);

  const handleGoBack = () => {
    if (history.length > 0) {
      history.back();
    }
  };

  const handleClearCart = async () => {
    // TODO: fetch
  };

  return (
    <View className="drawer-container">
      <MaterialTopAppBarDialog
        onClick1={handleGoBack}
      />
      <TopAppBarFixedAdjust className="top-app-bar-fix-adjust">
        <DrawerAppContent className="drawer-app-content">
          <Grid style={{ height: useWindowDimensions().height - 64 }}>
            <Row>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={8}>
                <CartsCardFull
                  mainText1="Apple"
                  mainText2="whatever"
                  actionText1={strings.clear_cart}
                  onClickAction1={handleClearCart}
                />
              </Cell>
            </Row>
          </Grid>
        </DrawerAppContent>
        {toast && (
        <MaterialSnackbar message={toast} onClose={() => setToast('')} />
        )}
      </TopAppBarFixedAdjust>
    </View>
  );
};
