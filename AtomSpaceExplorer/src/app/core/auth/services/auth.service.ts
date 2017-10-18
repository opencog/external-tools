import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAccount } from '../models';
import { APIService } from '../../../shared/services';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService implements CanActivate {
    private TOKEN = 'access_token';
    private PROFILE = 'user_profile';
    private _root_path = 'Users/';
    private _login_path = 'login';
    private _logout_path = 'logout';
    private _include_user = '?filter={"include":["user"]}';

    constructor(private _router: Router, private _appService: APIService) {
    }

    setToken(token: string) {
        window.localStorage.setItem(this.TOKEN, token);
    }

    setProfile(profile: UserAccount) {
        window.localStorage.setItem(this.PROFILE, JSON.stringify(profile));
    }

    getProfile() {
        if (this.isAuthenticated()) {
            const userId = JSON.parse(window.localStorage.getItem(this.PROFILE));
            return this._appService.get(`${this._root_path}${userId}`);
        }
        return null;
    }

    login(cred) {
        return this._appService
            // .post(`${this._root_path}${this._login_path}${this._include_user}`,cred)
            .post(`${this._root_path}${this._login_path}`, cred)
            .do(res => {
                this.setToken(res.id);
                this.setProfile(res.userId);
            });
    }

    signOut() {
        if (this.isAuthenticated()) {
            window.localStorage.removeItem(this.TOKEN);
            window.localStorage.removeItem(this.PROFILE);
            // this._appService.post(`/${this._root_path}${this._logout_path}`,'')
            //   .subscribe(
            //     res=>{
            //       this._router.navigate(['', 'login']);
            //     }
            //   );
            this._router.navigate(['', 'login']);
        }
    }

    register(data) {
        return this._appService.post(`${this._root_path}`, data);
    }

    isAuthenticated(): boolean {
        return Boolean(window.localStorage.getItem(this.TOKEN));
    }

    canActivate(): boolean {
        const isAuth = this.isAuthenticated();

        if (!isAuth) {
            this._router.navigate(['', 'login']);
        }

        return isAuth;
    }
}
