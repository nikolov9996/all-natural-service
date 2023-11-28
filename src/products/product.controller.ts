import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import { ObjectId } from 'mongoose';
import { httpErrorMessages } from '../utils/httpErrorMessages';

const { errorMessage, notFoundException } = httpErrorMessages;
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
      errorMessage(response, error.message);
    }
  }

  @Get()
  async getManyProducts(@Res() response, @Query('count') count: number) {
    try {
      const products = await this.productService.getManyProducts(count);
      if (!count) {
        count = 10;
      }

      if (!products) {
        notFoundException(`Error: Something went wrong!`);
      }

      return response.status(HttpStatus.FOUND).json({
        Products: products,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Get(':id')
  async getProduct(@Res() response, @Param('id') productId: ObjectId) {
    try {
      const product = await this.productService.getProduct(productId);

      if (!product) {
        notFoundException(`Error: Product ${productId} not found!`);
      }

      return response.status(HttpStatus.FOUND).json({
        Product: product,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Delete(':id')
  async deleteProduct(@Res() response, @Param('id') productId: ObjectId) {
    try {
      const deleted = await this.productService.deleteProduct(productId);

      if (!deleted) {
        notFoundException(`Error: Product ${productId} not found!`);
      }

      return response.status(HttpStatus.OK).json({
        deleted,
        message: 'Deleted successfully',
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }
}
