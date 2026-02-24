import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";


export enum RoleName {
  MANAGER = 'MANAGER',
  SUPPORT = 'SUPPORT',
  USER = 'USER',
}

export class CreateUserDto {
    @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(RoleName)
  role: RoleName;  
}
