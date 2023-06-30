import { Flex } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import Recipe from "../../../Types/Recipe";
import CardPlaceholder from "../../Atoms/RecipePlaceholder";
import CardRecipe from "../CardRecipe";

function ListRecipes({ searchValue }: { searchValue: string }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch(`https://636a8235c07d8f936da02f4b.mockapi.io/recipes`)
      .then((response) => response.json())
      .then((recipe) => setRecipes(recipe));
  }, []);

  const renderRecipe = (recipe: Recipe, index: number) => (
    <CardRecipe recipe={recipe} key={`${JSON.stringify(recipe)}/${index}`} />
  );

  const renderContent = () => {
    if (!recipes.length) {
      return [0, 1, 2].map((item) => <CardPlaceholder key={item} />);
    }

    return recipes.filter(filterRecipes).map(renderRecipe);
  };

  const filterRecipes = (recipe: Recipe) => {
    if (!searchValue) {
      return true;
    }
    return recipe.title.toLowerCase().includes(searchValue.toLowerCase());
  };

  return (
    <Flex flexDirection="column" gap="4" w="50%" alignSelf="center" mt="20">
      {renderContent()}
    </Flex>
  );
}

export default ListRecipes;
