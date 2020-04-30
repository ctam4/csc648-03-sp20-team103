import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { View, useWindowDimensions } from 'react-native';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { DrawerAppContent } from '@material/react-drawer';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import LocalizedStrings from 'react-localization';

import MaterialTopAppBar from '../../components/horizontal-prototype/MaterialTopAppBar';
import MaterialDrawer from '../../components/horizontal-prototype/MaterialDrawer';
import CartsCard from '../../components/horizontal-prototype/CartsCard';

let strings = new LocalizedStrings({
  en: {
    carts: 'Carts',
    last_updated: 'last updated',
    user_cart: ' \'s cart',
    preview_cart: 'This is the preview of the cart. It may shows up to 10 lines of items with quantity.',
    edit: 'Edit',
    clear_cart: 'Clear cart',
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session']);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    // TODO: fetch
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClearCart = async () => {
    // TODO: fetch
  };

  return (
    <View className='drawer-container'>
      <MaterialTopAppBar
        title={strings.carts}
        onClick1={toggleDrawer}
        //onClick2={() => window.location.href = './' }
      ></MaterialTopAppBar>
      <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
        <MaterialDrawer
          open={drawerOpen}
          selectedIndex={2}
          onClose={toggleDrawer}
        ></MaterialDrawer>
        <DrawerAppContent className='drawer-app-content'>
          <Grid style={{ height: useWindowDimensions().height - 64 }}>
            <Row>
              <Cell desktopColumns={4} phoneColumns={4} tabletColumns={4}>
                <CartsCard
                  mainText1={strings.user_cart}
                  mainText2={strings.last_updated}
                  bodyText={strings.preview_cart}
                  actionText1={strings.edit}
                  actionText2={strings.clear_cart}
                  onClickAction1={() => { window.location.href = './carts/view?id=' }}
                  onClickAction2={handleClearCart}
                ></CartsCard>
              </Cell>
            </Row>
          </Grid>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
