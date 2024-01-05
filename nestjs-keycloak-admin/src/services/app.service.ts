import { Injectable } from '@nestjs/common';
import {KeycloakService} from "../user/service/keycloak/keycloak.service";
import {ConfigService} from "@nestjs/config";
import * as process from "process";

@Injectable()
export class AppService {

  constructor(private keycloakservice: KeycloakService, private readonly configService: ConfigService) {

  }
  getHello(): string {
    return 'Hello World!';
  }
}
