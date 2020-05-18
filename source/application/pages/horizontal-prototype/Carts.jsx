import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LocalizedStrings from 'react-localization';

import { View, useWindowDimensions } from 'react-native';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { DrawerAppContent } from '@material/react-drawer';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';

import MaterialTopAppBar from '../../components/horizontal-prototype/MaterialTopAppBar';
import MaterialDrawer from '../../components/horizontal-prototype/MaterialDrawer';
import MaterialSnackbar from '../../components/horizontal-prototype/MaterialSnackbar';
import CartsCard from '../../components/horizontal-prototype/CartsCard';

import { apiUrl } from '../../url';

const strings = new LocalizedStrings({
  en: {
    carts: 'Carts',
    last_updated: 'last updated ',
    user_cart: ' \'s cart',
    edit: 'Edit',
    clear_cart: 'Clear cart',
    toast_edited: 'Cart edited.',
    toast_cleared: 'Cart cleared.',
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session', 'userID']);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [carts, setCarts] = useState([]);

  const dummySetup = () => {
    // TODO: hard code carts array
    setCarts([
      {
        title: 'user 1',
        subtitle: '21 days ago',
        content: 'This is the preview of the cart. It may shows up to 10 lines of items with quantity.',
      },
    ]);
  };

  const load = async () => {
    // TODO: fetch
    await fetch(`${apiUrl}/v3/carts/list/all?session=${cookies.session}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status !== 406) {
            throw new Error(`${res.status} ${res.statusText}`);
          } else {
            return null;
          }
        }
        return res.json();
      })
      .then(async (data) => {
        if (data !== null) {
          const carts2 = data.map((item) => ({
            key: item.recipeID,
            title: item.title,
            subtitle: item.servings, // need to have date last edited here, not servings
            image: item.image,
          }));
          setCarts(carts2);
        }
      })
      .catch((error) => setToast(error.toString()));
  };

  useEffect(() => {
    dummySetup();
    load();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClearCart = async () => {
    // TODO: fetch
  };

  return (
    <View className="drawer-container">
      <MaterialTopAppBar
        title={strings.carts}
        onClick1={toggleDrawer}
      />
      <TopAppBarFixedAdjust className="top-app-bar-fix-adjust">
        <MaterialDrawer
          open={drawerOpen}
          selectedIndex={2}
          onClose={toggleDrawer}
        />
        <DrawerAppContent className="drawer-app-content">
          <Grid style={{ height: useWindowDimensions().height - 64 }}>
            {carts.length > 0 && (
            <Row>
              {carts.map((item) => (
                <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
                  <CartsCard
                    mainText1={item.title + strings.user_cart}
                    mainText2={strings.last_updated + item.subtitle}
                    bodyText={item.content}
                    actionText1={strings.edit}
                    actionText2={strings.clear_cart}
                    onClickAction1={() => { window.location.href = 'view/?id='; }}
                    onClickAction2={handleClearCart}
                  />
                </Cell>
              ))}
            </Row>
            )}
          </Grid>
        </DrawerAppContent>
        {toast && (
        <MaterialSnackbar message={toast} onClose={() => setToast('')} />
        )}
      </TopAppBarFixedAdjust>
    </View>
  );
};
