import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const allRecipes = useRecipeStore((state) => state.recipes);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Trigger filtering whenever searchTerm or recipes change
  useEffect(() => {
    filterRecipes(searchTerm);
  }, [searchTerm, allRecipes, filterRecipes]);

  return (
    <div>
      <h2>📋 Recipe List</h2>
      <ul>
        {recipes.length === 0 ? (
          <li>No recipes found.</li>
        ) : (
          recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <DeleteRecipeButton id={recipe.id} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
