import React, { useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import { recipesSearchReducer, initialState } from '../../reducers/horizontal-prototype/RecipesSearch';
import {
  setSearchOpen,
  setKeywords,
  setCaloriesFilter,
  setServingsFilter,
  setFatFilter,
  setProteinFilter,
  setCarbonhydratesFilter,
} from '../../actions/horizontal-prototype/RecipesSearch';

import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import '@material/react-layout-grid/dist/layout-grid.css';
import LocalizedStrings from 'react-localization';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialTopAppBarSearchDialog from '../../components/horizontal-prototype/MaterialTopAppBarSearchDialog';
import { Body1 } from '../../components/horizontal-prototype/MaterialTypography';
import MaterialChoiceChips from '../../components/horizontal-prototype/MaterialChoiceChips';
import MaterialFilterChips from '../../components/horizontal-prototype/MaterialFilterChips';

let strings = new LocalizedStrings({
  en: {
    choose_calories: 'Choose calories per serving',
    choose_servings: 'Choose servings',
    choose_fat: 'Choose fat per serving',
    choose_protein: 'Choose protein per serving',
    choose_carbonhydrates: 'Choose carbonhydrates per serving',
    calories_500_less: '500 calories or less',
    calories_500_1000: '500-1000 calories',
    servings_1_2: '1-2 servings',
    servings_3_4: '3-4 servings',
    grams_10_less: '10 grams or less',
    grams_10_20: '10-20 grams',
  },
});
const styles = StyleSheet.create({
  chooseCalories: {
    color: '#121212',
    fontFamily: 'Roboto',
    marginTop: 15,
    marginLeft: 15,
  },
  materialChipWithCloseButton: {
    width: 160,
    height: 32,
  },
  materialChipWithCloseButtonFiller: {
    flex: 1,
    flexDirection: 'row',
  },
  materialChipBasic1: {
    width: 130,
    height: 32,
  },
  materialChipWithCloseButtonRow: {
    height: 32,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 45,
  },
  chooseServingSize: {
    color: '#121212',
    fontFamily: 'Roboto',
    marginTop: 20,
    marginLeft: 15,
  },
  materialChipWithCloseButton1: {
    width: 120,
    height: 32,
  },
  materialChipWithCloseButton1Filler: {
    flex: 1,
    flexDirection: 'row',
  },
  materialChipBasic: {
    width: 100,
    height: 32,
  },
  materialChipWithCloseButton1Row: {
    height: 32,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 115,
  },
  chooseFatSize: {
    color: '#121212',
    fontFamily: 'Roboto',
    marginTop: 20,
    marginLeft: 15,
  },
  materialChipBasic2: {
    width: 125,
    height: 32,
  },
  materialChipBasic2Filler: {
    flex: 1,
    flexDirection: 'row',
  },
  materialChipBasic3: {
    width: 100,
    height: 32,
  },
  materialChipBasic2Row: {
    height: 32,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 110,
  },
  chooseProteinSize: {
    color: '#121212',
    fontFamily: 'Roboto',
    marginTop: 20,
    marginLeft: 15,
  },
  materialChipBasic4: {
    width: 125,
    height: 32,
  },
  materialChipBasic4Filler: {
    flex: 1,
    flexDirection: 'row',
  },
  materialChipBasic5: {
    width: 100,
    height: 32,
  },
  materialChipBasic4Row: {
    height: 32,
    flexDirection: 'row',
    marginTop: 11,
    marginLeft: 15,
    marginRight: 110,
  },
  chooseProtein2: {
    color: '#121212',
    fontFamily: 'Roboto',
    marginTop: 20,
    marginLeft: 15,
  },
  materialChipBasic6: {
    width: 125,
    height: 32,
  },
  materialChipBasic6Filler: {
    flex: 1,
    flexDirection: 'row',
  },
  materialChipBasic7: {
    width: 100,
    height: 32,
  },
  materialChipBasic6Row: {
    height: 32,
    flexDirection: 'row',
    marginTop: 11,
    marginLeft: 15,
    marginRight: 110,
  }
});

export default () => {
  const [cookies, setCookie] = useCookies(['session']);
  const [state, dispatch] = useReducer(recipesSearchReducer, initialState);

  const caloriesFilterChoices = [
    { id: '500_less', label: strings.calories_500_less },
    { id: '500_1000', label: strings.calories_500_1000 },
  ];
  const servingsFilterChoices = [
    { id: '1_2', label: strings.servings_1_2 },
    { id: '3_4', label: strings.servings_3_4 },
  ];
  const fatFilterChoices = [
    { id: '10_less', label: strings.grams_10_less },
    { id: '10_20', label: strings.grams_10_20 },
  ];
  const proteinFilterChoices = [
    { id: '10_less', label: strings.grams_10_less },
    { id: '10_20', label: strings.grams_10_20 },
  ];
  const carbonhydratesFilterChoices = [
    { id: '10_less', label: strings.grams_10_less },
    { id: '10_20', label: strings.grams_10_20 },
  ];

  useEffect(() => {
    load();
  });

  const load = async () => {
    // TODO: fetch
  };

  const toggleSearch = () => {
    dispatch(setSearchOpen(!state.searchOpen));
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      history.back();
    }
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
                <Body1>{strings.choose_calories}</Body1>
                <MaterialFilterChips
                  selectedChipIds={state.caloriesFilter}
                  handleSelect={(value) => dispatch(setCaloriesFilter(value))}
                  choices={caloriesFilterChoices}
                ></MaterialFilterChips>
              </Cell>
              <Cell columns={12}>
                <Body1>{strings.choose_servings}</Body1>
                <MaterialFilterChips
                  selectedChipIds={state.servingsFilter}
                  handleSelect={(value) => dispatch(setServingsFilter(value))}
                  choices={servingsFilterChoices}
                ></MaterialFilterChips>
              </Cell>
              <Cell columns={12}>
                <Body1>{strings.choose_fat}</Body1>
                <MaterialFilterChips
                  selectedChipIds={state.fatFilter}
                  handleSelect={(value) => dispatch(setFatFilter(value))}
                  choices={fatFilterChoices}
                ></MaterialFilterChips>
              </Cell>
              <Cell columns={12}>
                <Body1>{strings.choose_protein}</Body1>
                <MaterialFilterChips
                  selectedChipIds={state.proteinFilter}
                  handleSelect={(value) => dispatch(setProteinFilter(value))}
                  choices={proteinFilterChoices}
                ></MaterialFilterChips>
              </Cell>
              <Cell columns={12}>
                <Body1>{strings.choose_carbonhydrates}</Body1>
                <MaterialFilterChips
                  selectedChipIds={state.carbonhydratesFilter}
                  handleSelect={(value) => dispatch(setCarbonhydratesFilter(value))}
                  choices={carbonhydratesFilterChoices}
                ></MaterialFilterChips>
              </Cell>
            </Row>
          </Grid>
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </View>
  );
};
