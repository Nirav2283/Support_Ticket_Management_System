import { IsNotEmpty, IsString } from "class-validator";

export class CreateTicketCommentDto {
    @IsNotEmpty()
    @IsString()
    comment:string
}
