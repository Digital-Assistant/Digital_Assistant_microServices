import { Controller, Get, Post, Body  } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { KeycloakService } from '../services/keycloak.service';
import {
  Public,
  Roles,
  Unprotected,
} from 'nest-keycloak-connect';

/**
 * Controller responsible for handling HTTP requests and interacting with the `AppService` and `KeycloakService`.
 */
@Controller()
export class AppController {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly appService: AppService,
  ) {}

  /**
   * Retrieves a greeting message from the `AppService`.
   * @returns The greeting message.
   */
  @Get()
  @Get('/public')
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Retrieves users from the `KeycloakService`.
   * @returns A promise that resolves to the users.
   */
  @Get('/users')
  async getUsers() {
    return this.keycloakService.getUsers();
  }

  @Post('/token')
  async getUserToken(@Body() user: any) {
    return this.keycloakService.getUserToken(user);
  }

  /**
   * Creates a user using the `KeycloakService`.
   * @param user - The user data.
   * @returns A success message.
   */
  @Post('/user')
  async createUser(@Body() user: any) {
    return await this.keycloakService.createUser(user);
  }
}
