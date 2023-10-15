import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from 'src/catalog/catalog.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [CatalogModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
