import React, { useReducer } from 'react';
import { useCookies } from 'react-cookie';

import { recipesCreateReducer, initialState } from '../../reducers/horizontal-prototype/RecipesCreate';
import { setName, setServings, setCookingTime } from '../../actions/horizontal-prototype/RecipesCreate';

import { StyleSheet, View, useWindowDimensions, Text } from 'react-native';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';
import LocalizedStrings from 'react-localization';

import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialFab from '../../components/horizontal-prototype/MaterialFab';
import MaterialOutlinedTextField from '../../components/horizontal-prototype/MaterialOutlinedTextField';

let strings = new LocalizedStrings({
  en: {
    name: 'Name',
    name_helper: 'This is the name of the recipe.',
    servings: 'Servings',
    servings_helper: 'This is the servings of this recipe.',
    cooking_time: 'Cooking time',
    cooking_time_helper: 'This is the cooking time of this recipe in minutes.',
  },
});
const styles = StyleSheet.create({
  recipeInfo: {
    height: 14,
    color: '#121212',
    alignSelf: 'stretch',
    margin: 15,
    fontFamily: 'Roboto',
  },
  materialFixedLabelTextbox: {
    height: 43,
    backgroundColor: 'rgba(230, 230, 230,1)',
    alignSelf: 'stretch',
    margin: 15,
  },
  materialFixedLabelTextbox1: {
    height: 43,
    backgroundColor: 'rgba(230, 230, 230,1)',
    alignSelf: 'stretch',
    margin: 15,
  },
  materialFixedLabelTextbox2: {
    height: 43,
    backgroundColor: 'rgba(230, 230, 230,1)',
    alignSelf: 'stretch',
    margin: 15,
  },
  ingredients3: {
    height: 14,
    color: '#121212',
    alignSelf: 'stretch',
    margin: 15,
    fontFamily: 'Roboto',
  },
  materialHeader1: {
    minWidth: 360,
    width: '100%',
    height: 56,
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session']);
  const [state, dispatch] = useReducer(recipesCreateReducer, initialState);

  const handleGoBack = () => {
    if (history.length > 0) {
      history.back();
    }
  };

  const handleSave = async () => {
    // TODO: fetch to post
    if (history.length > 0) {
      history.back();
    }
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
              <Cell columns={12}>
                <MaterialOutlinedTextField
                  label={strings.name}
                  helperText={strings.name_helper}
                  value={state.name}
                  onChange={(e) => dispatch(setName(e.target.value))}
                  onTrailingIconSelect={() => dispatch(setName(''))}
                ></MaterialOutlinedTextField>
              </Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
                <MaterialOutlinedTextField
                  label={strings.servings}
                  helperText={strings.servings_helper}
                  value={state.servings}
                  onChange={(e) => dispatch(setServings(e.target.value))}
                  onTrailingIconSelect={() => dispatch(setServings(''))}
                ></MaterialOutlinedTextField>
              </Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
                <MaterialOutlinedTextField
                  label={strings.cooking_time}
                  helperText={strings.cooking_time_helper}
                  value={state.cooking_time}
                  onChange={(e) => dispatch(setCookingTime(e.target.value))}
                  onTrailingIconSelect={() => dispatch(setCookingTime(''))}
                ></MaterialOutlinedTextField>
              </Cell>
            </Row>
          </Grid>
        </DrawerAppContent>
        <MaterialFab
          icon={<MaterialIcon icon='check' />}
          style={{ position: 'absolute', right: 16, bottom: 16 }}
          onClick={handleSave}
        ></MaterialFab>
      </TopAppBarFixedAdjust>
    </View>
  );
};
