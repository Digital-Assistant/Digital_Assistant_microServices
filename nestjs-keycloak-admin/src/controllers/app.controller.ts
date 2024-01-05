import { Controller, Get, Post, Body  } from '@nestjs/common';
import { AppService } from '../services/app.service';

/**
 * Controller responsible for handling HTTP requests and interacting with the `AppService` and `KeycloakService`.
 */
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {

  }

  /**
   * Retrieves a greeting message from the `AppService`.
   * @returns The greeting message.
   */
  @Get()
  @Get('/public')
  getHello(): string {
    return this.appService.getHello();
  }
}
