import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ProductModule } from 'src/products/products.module';
import { CommentsModule } from 'src/comments/comments.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger';
import { SensorModule } from 'src/sensor/sensor.module';
import { AuthModule } from 'src/auth/auth.module';

const routes = [
  { path: 'auth', module: AuthModule },
  { path: 'user', module: UserModule },
  { path: 'product', module: ProductModule },
  { path: 'comments', module: CommentsModule },
  { path: 'sensor', module: SensorModule },
];

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProductModule,
    CommentsModule,
    SensorModule,
    RouterModule.register(routes),
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: 'all-natural',
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(...routes.map((route) => route.path));
  }
}
