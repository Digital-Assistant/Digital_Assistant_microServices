import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import * as process from "process";
import {Login} from "../../models/login/login";

/**
 * KeycloakService class responsible for interacting with the Keycloak admin API.
 * It provides methods for retrieving users and creating new users in the Keycloak realm.
 */
@Injectable()
export class KeycloakService {
    private KcAdminClient: KcAdminClient;

    /**
     * Constructs a new instance of the KeycloakService class.
     * @param configService The configuration service used to retrieve the required configuration values.
     */
    constructor(private readonly configService: ConfigService) {
        this.KcAdminClient = new KcAdminClient({
            baseUrl: this.configService.get('keyCloakUrl'),
            realmName: this.configService.get('adminRealm')
        });
    }

    /**
     * Configuration object that holds the required configuration values for authenticating with the Keycloak admin API.
     */
    private config: any = {
        username: this.configService.get('adminUsername'),
        password: this.configService.get('adminPassword'),
        grantType: this.configService.get('grantType'),
        clientId: this.configService.get('clientID'),
        clientSecret: this.configService.get('clientSecret'),
    };

    async createUser(login: Login): Promise<Boolean> {
        try {
            await this.KcAdminClient.users.create({
                realm: login.realm,
                username: login.uid,
                // email: login.email,
                enabled: true,
                emailVerified: true,
                credentials: [
                    {
                        type: "password",
                        value: (login.email),
                        temporary: false
                    }
                ]
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new BadRequestException();
        }
    }

    /**
     * Retrieves the user token based on the provided login credentials.
     *
     * @param {Login} login - The login credentials of the user.
     * @return {Promise<any>} A promise that resolves to the user token.
     */
    async getUserToken(login: Login): Promise<any> {
        await this.KcAdminClient.setConfig({realmName: this.configService.get('adminRealm')});
        await this.KcAdminClient.auth({
            username: this.configService.get('adminUsername'),
            password: this.configService.get('adminPassword'),
            grantType: this.configService.get('grantType'),
            clientId: this.configService.get('clientID'),
            clientSecret: this.configService.get('clientSecret')
        });

        const users = await this.KcAdminClient.users.find({
            username: login.uid,
            // email: login.email,
            realm: login.realm,
            exact: true
        });

        if (users && users.length > 0) {
            return this.loginUser(login);
        } else {

            try {
                await this.createUser(login);
                return this.loginUser(login);
            } catch (err) {
                // Handle error here
                console.error(err);
                throw new BadRequestException()
            }
        }
    }

    async loginUser(login: Login): Promise<any> {
        try {
            await this.KcAdminClient.setConfig({realmName: login.realm});
            await this.KcAdminClient.auth({
                username: login.uid,
                password: login.email,
                grantType: "password",
                clientId: login.clientId,
                clientSecret: login.clientSecret
            });
            console.log(this.KcAdminClient.getAccessToken());
            return await this.KcAdminClient.getAccessToken();
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException();
        }
    }
}
