import React, { useEffect, useReducer, useState } from 'react';
import { useCookies } from 'react-cookie';
import LocalizedStrings from 'react-localization';


import { View, useWindowDimensions } from 'react-native';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import {
  setInventoryID,
  setName,
  setImage,
  setQuantity,
  setUnit,
  setPrice,
  setExpirationDate,
} from '../../actions/horizontal-prototype/InventoryView';
import { inventoryViewReducer, initialState } from '../../reducers/horizontal-prototype/InventoryView';
import '@material/react-layout-grid/dist/layout-grid.css';


import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialSnackbar from '../../components/horizontal-prototype/MaterialSnackbar';
import InventoryCardFull from '../../components/horizontal-prototype/InventoryCardFull';

import { apiUrl } from '../../url';

const strings = new LocalizedStrings({
  en: {
    expiring: 'Expiring',
    expired: 'Expired',
    discard: 'Discard',
    toast_consumed: 'Item consumed from inventory.',
    toast_discarded: 'Item discarded from inventory.',
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session', 'userID']);
  const [state, dispatch] = useReducer(inventoryViewReducer, initialState);
  const [toast, setToast] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    await fetch(`${apiUrl}/v4/inventory?session=${cookies.session}&inventoryID=${urlParams.get('id')}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`error ${res.status}`);
        }
        return res.json();
      })
      .then(async (data) => {
        await fetch(`${apiUrl}/v4/ingredients?session=${cookies.session}&ingredientIDs=${data.ingredientID}`, {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res2) => {
            if (!res2.ok) {
              if (res2.status !== 406) {
                throw new Error(`${res2.status} ${res2.statusText}`);
              } else {
                return null;
              }
            }
            return res2.json();
          })
          .then((data2) => {
            dispatch(setInventoryID(data.inventoryID));
            dispatch(setName(data2.name));
            dispatch(setImage(data2.image));
            dispatch(setQuantity(data.quantity));
            dispatch(setUnit(data.unit));
            dispatch(setPrice(data.price));
            dispatch(setExpirationDate(data.expirationDate));
          });
      })
      .catch((error) => setToast(error.toString()));
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      history.back();
    }
  };

  const handleDiscard = async () => {
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
                <InventoryCardFull
                  mainText1={state.name}
                  mainText2={(() => {
                    let value = `${state.quantity} ${state.unit}`;
                    if (state.expirationDate) {
                      value += ' | ';
                      const expirationDate = Moment.utc(state.expirationDate);
                      if (expirationDate.unix() >= Moment.utc()) {
                        value += strings.expiring;
                      } else {
                        value += strings.expired;
                      }
                      value += ` ${expirationDate.fromNow()}`;
                    }
                    if (state.price) {
                      value += ` | $${state.price}`;
                    }
                    return value;
                  })()}
                  actionText1={strings.discard}
                  onClickAction1={handleDiscard}
                  mainImage={state.image}
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
