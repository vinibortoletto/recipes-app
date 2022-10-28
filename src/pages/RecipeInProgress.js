import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { RecipesContext } from '../contexts/RecipesContext';
import { getRecipeDetails } from '../services/recipesAPI';

export default function RecipeInProgress() {
  const {
    setRecipeDetails,
    recipeType,
    recipeId,
    ingredientsList,
    usedIngredients,
    recipeDetails,
    type,
  } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      const newRecipeDetails = await getRecipeDetails(recipeId, recipeType);
      setRecipeDetails(newRecipeDetails[[recipeType]][0]);
    };

    fetch();
  }, [recipeId, recipeType, setRecipeDetails]);

  const markRecipeDone = () => {
    history.push('/done-recipes');

    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const newDoneRecipe = {
      id: recipeDetails[`id${type}`],
      type: recipeType.replace('s', ''),
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory || '',
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails[`str${type}`],
      image: recipeDetails[`str${type}Thumb`],
      doneDate: new Date().toISOString(),
      tags: recipeDetails.strTags?.split(',') || [],
    };

    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...localDoneRecipes, newDoneRecipe]),
    );
  };

  return (
    <div>
      <ShareButton />
      <FavoriteButton />
      <Card />

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ usedIngredients.length !== ingredientsList.length }
        onClick={ markRecipeDone }
      >
        Finish Recipe
      </button>
    </div>
  );
}
