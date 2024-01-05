import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

console.log('build environment is '+process.env.build);

async function getEnvFilePath(argv: any): Promise<string> {
  const envFile = argv['env'] || 'development';
  return `.env.${envFile}`;
}

console.log(process.env);

/**
 * The `AppModule` class is a module in a NestJS application that is responsible for configuring and organizing the application's components, such as controllers and services. It also handles the integration with Keycloak for authentication and authorization.
 */
@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: 'environments/local.env', isGlobal: true}),
    /*ConfigModule.forRoot({
      useFactory: getEnvFilePath,
      inject: [process.argv],
    }),*/
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
