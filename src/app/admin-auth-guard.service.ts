import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{


  // appUser: AppUser;
  constructor(private auth: AuthService,private userService: UserService) { }

  canActivate(){
    
    return this.auth.user$.pipe(
      switchMap(user=> this.userService.get(user.uid).valueChanges()),
        map(appUser=>appUser.isAdmin));
         
  }

}
