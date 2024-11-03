import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor() { }
  
  validateUser(user: any) {
    return user;
  }
}
