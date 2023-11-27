import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import { ObjectId } from 'mongoose';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const product = await this.productService.createProduct(createProductDto);
      return response.status(HttpStatus.CREATED).json({
        Product: product,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get(':id')
  async getProduct(@Res() response, @Param('id') productId: ObjectId) {
    try {
      const product = await this.productService.getProduct(productId);

      if (!product) {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Error: Product not found!',
          error: 'Not Found',
        });
      }

      return response.status(HttpStatus.FOUND).json({
        Product: product,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: error.message,
        error: 'Bad Request',
      });
    }
  }
}
