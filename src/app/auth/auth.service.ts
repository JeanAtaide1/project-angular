import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registerd?: boolean;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokeExpirationTimer:any;
    token = null;




    constructor(private http: HttpClient, private router: Router) { }




    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5I9vsYkGdi_moeazvlYHiqgn_a3tYuUk",
            {
                email: email,
                password: password,
                returnSecureToken: true

            }
        )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(resData.email,
                        resData.localId,
                        resData.idToken,
                        resData.expiresIn)
                })
            )
    }





    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5I9vsYkGdi_moeazvlYHiqgn_a3tYuUk",
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(resData => {
                this.handleAuth(resData.email,
                    resData.localId,
                    resData.idToken,
                    resData.expiresIn)
            }))
    }


    autoLogin() {
        const userData:
            {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'))
        if (!userData)
            return;
        const loadedUser = new User(userData.email
            , userData.id, userData._token
            , new Date(userData._tokenExpirationDate));

        if (loadedUser.token()) {
            this.user.next(loadedUser)
            this.autoLogout(
                (new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime()))
        }


    }




    logout() {
        this.user.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if(this.tokeExpirationTimer)
            clearTimeout(this.tokeExpirationTimer)
        this.tokeExpirationTimer=null;
    }


    autoLogout(expirationDuration:number) {
        this.tokeExpirationTimer = setTimeout(()=>{
            this.logout();
        },expirationDuration)
    }


    private handleAuth(email: string, userId: string, token: string, expiresIn: string) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email,
            userId,
            token,
            expirationDate);
        console.log(user)
        this.user.next(user);
        this.autoLogout(+expiresIn*1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }





    private handleError(error: HttpErrorResponse) {
        console.log(error)
        let errorMessage = "An unknown error has occurred"
        if (!error.error || !error.error.error) {
            return throwError(errorMessage);
        }
        switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "E-Mail already exists"; break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "E-Mail does not exist"; break;
            case 'INVALID_PASSWORD':
                errorMessage = "The password is not correct"; break;
            default: errorMessage = "An error has occured"
        }
        return throwError(errorMessage);

    }
}