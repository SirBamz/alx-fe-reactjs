import React from 'react';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes.length > 0 ? state.filteredRecipes : state.recipes);

  return (
    <div>
      <h2>📋 Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
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
