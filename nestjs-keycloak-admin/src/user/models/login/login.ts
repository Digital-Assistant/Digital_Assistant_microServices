import {IsNotEmpty} from "class-validator";

export class Login {
    @IsNotEmpty()
    uid: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    domain: string;
    @IsNotEmpty()
    realm: string;
    @IsNotEmpty()
    clientId: string;
    @IsNotEmpty()
    clientSecret: string;
}
