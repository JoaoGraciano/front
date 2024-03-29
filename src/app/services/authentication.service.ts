// import { Injectable, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { User } from './user';
// import { environment } from 'src/environments/environment';

// @Injectable({ providedIn: 'root' })
// export class AuthenticationService implements OnInit{
//     private userSubject: BehaviorSubject<User>;
//     public user: Observable<User>;


//     constructor(
//         private router: Router,
//         private http: HttpClient

//     ) {
//         this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
//         this.user = this.userSubject.asObservable();
//     }
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');  }

//     public get userValue(): User {
//         return this.userSubject.value;
//     }

//     login(username: string, password: string) {
//         return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
//             .pipe(map(user => {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('user', JSON.stringify(user));
//                 this.userSubject.next(user);
//                 return user;
//             }));
//     }

//     logout() {
//         // remove user from local storage to log user out
//         localStorage.removeItem('user');
//         // this.userSubject.next(null);
//         this.router.navigate(['/login']);
//     }
// }
