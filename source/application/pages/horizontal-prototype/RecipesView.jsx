import React, { useEffect, useReducer, useState } from 'react';
import { useCookies } from 'react-cookie';

import { recipeViewReducer, initialState } from '../../reducers/horizontal-prototype/RecipeView';
import {
  setRecipeID,
  setTitle,
  setImage,
  setServings,
  setCookingTime,
  setInstructions,
  setIngredients,
} from '../../actions/horizontal-prototype/RecipeView';

import { View, useWindowDimensions } from 'react-native';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import LocalizedStrings from 'react-localization';

import MaterialTopAppBarDialog from '../../components/horizontal-prototype/MaterialTopAppBarDialog';
import MaterialSnackbar from '../../components/horizontal-prototype/MaterialSnackbar';
import RecipesCardFull from '../../components/horizontal-prototype/RecipesCardFull';
import IngredientsListCard from '../../components/horizontal-prototype/IngredientsListCard';

import { apiUrl } from '../../url';

let strings = new LocalizedStrings({
  en: {
    servings: 'servings',
    minutes: 'minutes',
    toast_favorited: 'Recipe favorited.',
    toast_added_to_cart: 'Recipe added to cart.',
  },
});

export default () => {
  const [cookies, setCookie] = useCookies(['session', 'userID']);
  const [state, dispatch] = useReducer(recipeViewReducer, initialState);
  const [toast, setToast] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    await fetch(apiUrl + '/v4/recipes?session=' + cookies.session + '&recipeIDs=' + urlParams.get('id'), {
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
      dispatch(setRecipeID(data.recipeID));
      dispatch(setTitle(data.title));
      dispatch(setImage(data.image));
      dispatch(setServings(data.servings));
      dispatch(setCookingTime(data.cookingTime));
      dispatch(setInstructions(data.instructions));
      const ingredients = data.ingredients.map((item) => {
        return {
          primaryText: item.name,
          secondaryText: item.quantity + ' ' + item.unit,
        };
      });
      dispatch(setIngredients(ingredients));
    })
    .catch((error) => setToast(error.toString()));
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      history.back();
    }
  };

  const handleFavorite = async () => {
    // TODO: fetch
  };

  const handleHistory = async () => {
    // TODO: fetch
  };

  const handleAddToCart = async () => {
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
                <RecipesCardFull
                  mainText1={state.title}
                  mainText2={state.servings + ' ' + strings.servings + ' | ' + state.cookingTime + ' ' + strings.minutes}
                  bodyText={state.instructions}
                  onClickAction1={() => handleFavorite(state.recipeID)}
                  onClickAction2={handleHistory}
                  onClickAction3={handleAddToCart}
                  mainImage={state.image}
                ></RecipesCardFull>
              </Cell>
              <Cell desktopColumns={6} phoneColumns={4} tabletColumns={8}>
                <IngredientsListCard
                  list1={state.ingredients}
                  list2={[]}
                ></IngredientsListCard>
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
