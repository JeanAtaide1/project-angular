
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipesStartComponent,

  ],
  imports: [

    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([{
      path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
        { path: '', component: RecipesStartComponent },
        { path: 'new', component: RecipeEditComponent, resolve: [RecipesResolverService] },
        {
          path: ':id', component: RecipeDetailComponent,
          resolve: [RecipesResolverService]
        },
        {
          path: ':id/edit', component: RecipeEditComponent,
          resolve: [RecipesResolverService]
        },
      ]
    }])
  ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipesStartComponent,
    SharedModule
  ]

})
export class RecipesModule {

}