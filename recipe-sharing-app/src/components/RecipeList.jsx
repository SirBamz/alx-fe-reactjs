import React from 'react';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import { Link } from 'react-router-dom'; // Import Link

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes.length > 0 ? state.filteredRecipes : state.recipes);

  return (
    <div>
      <h2>📋 Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {/* Wrap the recipe title in a Link component */}
            <Link to={`/recipes/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>
            <DeleteRecipeButton id={recipe.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
