import { ThisReceiver } from "@angular/compiler";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe("A test recipe", "simply a test",
  //     "https://bakesbybrownsugar.com/wp-content/uploads/2019/05/Meyer-Lemon-Tart-7C.jpg",
  //     [new Ingredient("Meat", 1),
  //     new Ingredient("French Fries", 1)])
  //   , new Recipe("Bacalhao com nata", "bacalhau e natas",
  //     "https://bakesbybrownsugar.com/wp-content/uploads/2019/05/Meyer-Lemon-Tart-7C.jpg",
  //     [new Ingredient("Meat", 1),
  //     new Ingredient("Bread", 2)])

  // ];

  private recipes: Recipe[] =[];

  constructor(private slService: ShoppingListService) { }



  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes)

  }

  updateRecipe(index: number, nRecipe: Recipe) {
    this.recipes[index] = nRecipe;
    this.recipesChanged.next(this.recipes)
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

}