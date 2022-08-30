import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe:Recipe;
id:number;
  constructor(private route:ActivatedRoute,private router:Router,private shoppinService:ShoppingListService,private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        this.recipe=this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddRecipeIngredients(){
    // for(var ingredient of this.recipe.ingredients){
    //   this.shoppinService.addIngredient(ingredient)
    // }
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    console.log(this.shoppinService.getIngredients())
  }
  onEdit(){
   this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../'],{relativeTo:this.route})
  }

}
