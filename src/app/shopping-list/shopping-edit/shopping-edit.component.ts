import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe(
    );
  }

  ngOnInit(): void {
    this.subscription = this
      .shoppingService
      .startedEditing.subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }
  onAddItem(form: NgForm) {
    // this.shoppingService.addIngredient(
    //   new Ingredient(this.nameInputRef.nativeElement.value,
    //     this.amountInputRef.nativeElement.value))

    const value = form.value
    const newIngredient =
     new Ingredient(value.name, value.amount)
    if (this.editMode) {
   
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else {
      this.shoppingService.addIngredient(
        newIngredient
      )

    }
    this.editMode=false;
    form.reset();

  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;

  }
  onDelete(){
    this.onClear();
    this.shoppingService.deleteIngredient(this.editedItemIndex);
  }

  editItem() {

  }


}
