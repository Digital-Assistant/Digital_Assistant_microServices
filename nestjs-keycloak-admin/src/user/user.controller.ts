import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Res,
    Request,
    BadRequestException
} from '@nestjs/common';
import {Login} from "./models/login/login";
import {KeycloakService} from "./service/keycloak/keycloak.service";
import {validate} from "class-validator";

@Controller('user')
export class UserController {
    constructor(
        private readonly keycloakService: KeycloakService
    ) {

    }


    /**
     * Retrieves the user token for the given login credentials.
     *
     * @param req
     * @param {Login} login - The login credentials of the user.
     * @param res
     * @return {Promise<string>} The user token.
     */
    @Post('/token')
    async getUserToken(@Request() req, @Body() login: Login, @Res() res) {
        try {
            if(await validate(login)) {
                const token = await this.keycloakService.getUserToken(login);
                res.send({token: token});
            } else {
                console.log('validation failed');
                throw new BadRequestException();
            }
        } catch (err) {
            // Handle error here
            console.error(err);
            throw new BadRequestException();
        }
    }
}
