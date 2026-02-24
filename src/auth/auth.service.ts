import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    return this.userService.checkLogin(email, password);
  }

  async login(user: any) {
    // console.log(user);

    const payload = {
      id: user.id,
      role: user.role.name  
    };

    // console.log( payload);

    const token = this.jwtService.sign(payload);

    return {
      error: false,
      access_token: token,
    };
  }
}
