import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  // Always use filteredRecipes for display
  const recipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Trigger filtering whenever searchTerm changes
  useEffect(() => {
    filterRecipes(searchTerm);
  }, [searchTerm, filterRecipes]);

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
