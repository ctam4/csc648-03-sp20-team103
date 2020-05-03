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

import MaterialFab from '../../components/horizontal-prototype/MaterialFab';
import FixedLabelTextbox from '../../components/horizontal-prototype/FixedLabelTextbox';
import DialogHeader from '../../components/horizontal-prototype/DialogHeader';

let strings = new LocalizedStrings({
  en: {
    recipe_info: 'Recipe info',
    name: 'Name',
    servings: 'Servings',
    cooking_time: 'Cooking time',
    ingredients: 'Ingredients',
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

  const handleSave = async () => {
    // TODO: fetch to post
    if (history.length > 0) {
      history.back();
    }
  };

  return (
    <View className='drawer-container'>
      <DialogHeader style={styles.materialHeader1}></DialogHeader>
      <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
        <DrawerAppContent className='drawer-app-content'>
          <Grid style={{ height: useWindowDimensions().height - 64 }}>
            <Row>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
              <Text style={styles.recipeInfo}>{strings.recipe_info}</Text>
              </Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
              <FixedLabelTextbox
                text1={strings.name}
                textInput1={state.name}
                style={styles.materialFixedLabelTextbox}
                onChange={(e) => dispatch(setName(e.target.value))}
              ></FixedLabelTextbox>
              </Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
              <FixedLabelTextbox
                text1={strings.servings}
                textInput1={state.servings}
                style={styles.materialFixedLabelTextbox1}
                onChange={(e) => dispatch(setServings(e.target.value))}
              ></FixedLabelTextbox>
              </Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
              <FixedLabelTextbox
                text1={strings.cooking_time}
                textInput1={state.cooking_time}
                style={styles.materialFixedLabelTextbox2}
                onChange={(e) => dispatch(setCookingTime(e.target.value))}
              ></FixedLabelTextbox>
              </Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={4}>
              <Text style={styles.ingredients3}>{strings.ingredients}</Text>
              </Cell>
            </Row>
          </Grid>
        </DrawerAppContent>

        <MaterialFab
          icon={<MaterialIcon icon='check'/>}
          style={{ position: 'absolute', right: 16, bottom: 16 }}
          onClick={handleSave}
        ></MaterialFab>
      </TopAppBarFixedAdjust>
    </View>
  );
};
