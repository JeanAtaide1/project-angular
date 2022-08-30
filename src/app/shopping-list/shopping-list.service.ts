import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
  
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient("Canela",2),
        new Ingredient("Ovo",1),
      ]

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
      }
      getIngredients(){
        return this.ingredients.slice();
      }
      addIngredients(ingredients:Ingredient[]){
        // for(var ingredient of ingredients){
        //     this.ingredients.push(ingredient);
        //   }
          this.ingredients.push(...ingredients);
          this.ingredientChanged.next(this.ingredients.slice());
      }

      getIngredient(index:number){
        return this.ingredients[index];

      }

      updateIngredient(Index:number,newIngredient: Ingredient){
        this.ingredients[Index]=newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    
      }
      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice())
      }

}