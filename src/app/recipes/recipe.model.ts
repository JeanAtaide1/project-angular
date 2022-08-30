import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
public name: string;
public description: string;
public ingredients:Ingredient[];
public imagePath:string;

constructor(name:string, dexc:string,imagrPath:string,ingredients:Ingredient[]){
    this.name=name;
    this.description=dexc;
    this.imagePath=imagrPath;
    this.ingredients=ingredients;
}
}