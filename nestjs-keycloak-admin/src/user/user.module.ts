import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { KeycloakService } from './service/keycloak/keycloak.service';
@Module({
  imports: [

  ],
  providers: [KeycloakService],
  controllers: [UserController],
  exports: [KeycloakService],
})
export class UserModule {}
