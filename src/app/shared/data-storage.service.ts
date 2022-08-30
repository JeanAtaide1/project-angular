import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {



    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        this.http.put(
            "https://angular-firebase-21da9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"
            , this.recipeService.getRecipes())
            .subscribe(response => console.log(response));
    }

    fetchRecipes() {

        return this.http.get<Recipe[]>(
            "https://angular-firebase-21da9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
            tap(recipes =>
                this.recipeService.setRecipes(recipes)))

        // .subscribe(
        //     response=>{
        //         console.log(response)
        //         this.recipeService.setRecipes(response)
        //     }
        // );
    }



}