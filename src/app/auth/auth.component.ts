import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    @ViewChild(PlaceHolderDirective, {static:true}) alertHost:PlaceHolderDirective;
   closeSub:Subscription;
    isLoginMode = true;
    isLoading = false;
    error: string;

    authObs: Observable<AuthResponseData>;

    constructor(private componentFactoryResolver:ComponentFactoryResolver, private authService: AuthService,private router:Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm) {

        console.log(form.value)
        if (form.valid) {
            this.isLoading = true;
            if (!this.isLoginMode) {
                this.authObs = this.authService.signUp(form.value['email'], form.value['password'])

            } else {
                console.log(form.value.email+" "+ form.value.password)
                this.authObs = this.authService
                    .login(form.value.email, form.value.password)
            }

            
            this.authObs.subscribe(
                response => {
                    console.log("success caralho")
                    this.isLoading = false
                    console.log(response['idToken'])
                    this.router.navigate(['/recipes'])
                },
                errorMessage => {
                    console.log(errorMessage)
                    this.error = errorMessage;
                    this.isLoading = false;
                    this.showErrorAlert(errorMessage)
                })
                ;
            form.reset();
        }

    }
    handleError(){
        this.error=null;
        console.log(this.error);
    }

    showErrorAlert(message:string){
        const alertCmpFactory=
            this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef=this.alertHost.viewContainerRef
        const componentRef=hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message=message
        this.closeSub= componentRef.instance.close.subscribe(()=>{
            hostViewContainerRef.clear();
            this.closeSub.unsubscribe();
        })
        
    }
}