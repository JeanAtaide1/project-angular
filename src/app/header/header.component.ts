import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    templateUrl:"./header.component.html",
    selector:"app-header"
})
export class HeaderComponent implements OnInit,OnDestroy{

private subscription:Subscription;
isAuthenticated=false;

    constructor(private dataStorage: DataStorageService,private authService:AuthService){}
    
    
    
    ngOnDestroy(): void {
       this.subscription.unsubscribe();
    }
    
    
    
    ngOnInit(): void {
        this.subscription=this.authService.user.subscribe(user=>{
            console.log(user)
            this.isAuthenticated=!!user;
        });
    }
   @Output() featureSelected = new EventEmitter<string>();
    onSelect(feature:string){
        this.featureSelected.emit(feature);

    }
    onSaveData(){
        this.dataStorage.storeRecipes();

    }

    onFecthData(){
        this.dataStorage.fetchRecipes().subscribe();
    }
    onLogout(){
        console.log("logging out...")
        this.authService.logout();
    
    }
}