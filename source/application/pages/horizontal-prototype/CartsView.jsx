import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { View, useWindowDimensions } from 'react-native';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import LocalizedStrings from 'react-localization';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialSnackbar from '../../components/horizontal-prototype/MaterialSnackbar';
import CartsCardFull from '../../components/horizontal-prototype/CartsCardFull';

import { apiUrl } from '../../url';
import InventoryCard from "../../components/horizontal-prototype/InventoryCard";

let strings = new LocalizedStrings({
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
  const [itemsInCart, setCart] = useState([]);

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
    .then(async (data) => {
      // TODO: fetch Carts info of user
      if (data !== null) {
        let ingredientIDs = [];
        data.forEach((item) => ingredientIDs.push(item.ingredientID));
        if (ingredientIDs.length > 0) {
          ingredientIDs = [...new Set(ingredientIDs)];
          await fetch(apiUrl + '/v3/ingredients?session=' + cookies.session + '&ingredientIDs=' + ingredientIDs.join(','), {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then((res2) => {
            if (!res2.ok) {
              if (res2.status !== 406) {
                throw new Error(res2.status + ' ' + res2.statusText);
              } else {
                return null;
              }
            }
            return res2.json();
          })
          .then((data2) => {
            if (data2 !== null) {
              let itemsInCart = [];
              data.forEach((item2) => {
                let ingredient = data2.find((item3) => item2.ingredientID === item3.ingredientID);
                if (ingredient) {
                  itemsInCart.push({
                    key: item2.inventoryID,
                    title: ingredient.name,
                    subtitle: (() => {
                      let value = item2.totalQuantity + ' ' + item2.unit;
                      if (item2.price) {
                        value += ' | $' + item2.price;
                      }
                      return value;
                    })
                  })
                }
              });
              setCart(itemsInCart);
            }
          });
        }
      }
      setQuantity(data.quantity);
      setUnit(data.unit);
      setPrice(data.price);
      setState(data.state);
    })
    .catch((error) => setToast(error.toString()));
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
              {itemsInCart.map((item) => (
                  <Cell desktopColumns={6} phoneColumns={4} tabletColumns={8}>
                    <InventoryCard
                        mainText1={item.title}
                        mainText2={item.subtitle}
                        actionText1={strings.clear_cart}
                        mainImage={item.image}
                    ></InventoryCard>
                  </Cell>
              ))}
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
