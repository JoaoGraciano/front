import { Injectable } from '@angular/core';

import { User } from '../services/user';

@Injectable()
export class UserService {
   createUser(user: User) {
	   //console.log("Setor: " + user.setor);
   }
}
