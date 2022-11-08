import React, { useEffect, useContext } from 'react';

import { RecipesContext } from '../contexts/RecipesContext';
import { getRecipeDetails } from '../services/recipesAPI';

import Card from '../components/Card';
import StartButton from '../components/StartButton';
import Loading from '../components/Loading';

export default function RecipeDetails() {
  const {
    setRecipeDetails,
    recipeType,
    recipeId,
    setIsLoading,
    isLoading,
  } = useContext(RecipesContext);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const newRecipeDetails = await getRecipeDetails(recipeId, recipeType);
      setRecipeDetails(newRecipeDetails[[recipeType]][0]);
      setIsLoading(false);
    };

    fetch();
  }, [
    recipeId,
    recipeType,
    setRecipeDetails,
    setIsLoading,
  ]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Card />
      <StartButton />
    </div>
  );
}
