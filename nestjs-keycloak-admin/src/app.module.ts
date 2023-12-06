import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { KeycloakService } from './services/keycloak.service';
import { ConfigModule } from '@nestjs/config';
import {
  ResourceGuard,
  RoleGuard,
  AuthGuard,
  KeycloakConnectModule,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

/**
 * The `AppModule` class is a module in a NestJS application that is responsible for configuring and organizing the application's components, such as controllers and services. It also handles the integration with Keycloak for authentication and authorization.
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    // KeycloakConnectModule.register({
    //   authServerUrl: 'http://localhost:8080',
    //   realm: 'test',
    //   clientId: 'admin-cli',
    //   secret: 'X74waPQBYuEg7iHRmd8BR7qJPZ6Pdld4', 
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    KeycloakService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ResourceGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // }
  ],
})
export class AppModule {}
