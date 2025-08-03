import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const { filteredRecipes, searchTerm, filterRecipes } = useRecipeStore((state) => ({
    filteredRecipes: state.filteredRecipes,
    searchTerm: state.searchTerm,
    filterRecipes: state.filterRecipes,
  }));

  useEffect(() => {
    filterRecipes(searchTerm);
  }, [searchTerm, filterRecipes]);

  return (
    <div>
      <h2>📋 Recipe List</h2>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <DeleteRecipeButton id={recipe.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
