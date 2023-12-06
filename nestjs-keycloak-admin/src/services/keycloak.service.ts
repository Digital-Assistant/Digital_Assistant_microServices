import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KcAdminClient from '@keycloak/keycloak-admin-client';

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
      baseUrl: this.configService.get('BASE_URL'),
      realmName: this.configService.get('REALM'),
    });
  }

  /**
   * Configuration object that holds the required configuration values for authenticating with the Keycloak admin API.
   */
  private config: any = {
    username: this.configService.get('ADMIN_USERNAME'),
    password: this.configService.get('ADMIN_PASSWORD'),
    grantType: this.configService.get('GRANT_TYPE'),
    clientId: this.configService.get('CLIENT_ID'),
    clientSecret: this.configService.get('CLIENT_SECRET'),
  };

  /**
   * Retrieves all users from the Keycloak realm.
   * @returns A promise that resolves to an array of user objects.
   */
  async getUsers(): Promise<any[]> {
    try {
      await this.KcAdminClient.auth(this.config);
      return this.KcAdminClient.users.find();
    } catch (err) {
      return err;
    }
  }

  /**
   * Creates a new user in the Keycloak realm.
   * @param user The user object containing the details of the user to be created.
   * @returns A promise that resolves when the user is created.
   */
  async createUser(user: any): Promise<any[]> {
    try {
      await this.KcAdminClient.auth(this.config);
      await this.KcAdminClient.users.create(user);
      return user;
    } catch (err) {
      return err;
    }
  }

  async getUserToken(user: any): Promise<any> {
    await this.KcAdminClient.auth({
      username: user?.username,
      password: user?.password,
      grantType: this.configService.get('GRANT_TYPE'),
      clientId: this.configService.get('CLIENT_ID'),
      clientSecret: this.configService.get('CLIENT_SECRET'),
    });
    return await this.KcAdminClient.getAccessToken();
  }
}
