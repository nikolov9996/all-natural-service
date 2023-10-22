import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from 'src/catalog/catalog.module';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    CatalogModule,
    UserModule,

    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: 'all-natural',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
