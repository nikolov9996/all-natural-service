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
  Put,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ObjectId, isValidObjectId } from 'mongoose';
import { httpErrorMessages } from '../utils/httpErrorMessages';
import { UserService } from 'src/user/user.service';

const { errorMessage, notFoundException } = httpErrorMessages;
@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const userExist = await this.userService.userExist(
        createProductDto.creator,
      );

      if (!userExist) {
        notFoundException(`User ${createProductDto.creator} not found`);
      }
      const product = await this.productService.createProduct(createProductDto);
      return response.status(HttpStatus.CREATED).json({
        Product: product,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Put(':id')
  async updateProduct(
    @Res() response,
    @Param('id') productId: ObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const productExist = await this.productService.productExist(productId);

      if (!productExist) {
        notFoundException(`Product ${productId} not found!`);
      }

      const updatedProduct = await this.productService.updateProduct(
        productId,
        updateProductDto,
      );

      return response.status(HttpStatus.OK).json(updatedProduct);
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
      // removing product ID from all users that have it in favorites
      await this.userService.removeDeletedProduct(productId);

      return response.status(HttpStatus.OK).json({
        deleted,
        message: 'Deleted successfully',
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Patch(':id/favorite/:userId')
  async favoriteProduct(
    @Res() response,
    @Param('id') id: ObjectId,
    @Param('userId') userId: ObjectId,
  ) {
    try {
      if (!isValidObjectId(id) || !isValidObjectId(userId)) {
        errorMessage(response, 'UserID or ProductID invalid');
      }

      const userExist = await this.userService.userExist(userId);
      const productExist = await this.productService.productExist(id);

      if (!userExist) {
        notFoundException(`User ${id} not found`);
      }

      if (!productExist) {
        notFoundException(`Product ${id} not found`);
      }

      const product = await this.productService.favoriteProduct(id, userId);

      return response.status(HttpStatus.OK).json({
        Product: product,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Patch(':id/un-favorite/:userId')
  async unFavoriteProduct(
    @Res() response,
    @Param('id') id: ObjectId,
    @Param('userId') userId: ObjectId,
  ) {
    try {
      if (!isValidObjectId(id) || !isValidObjectId(userId)) {
        errorMessage(response, 'UserID or ProductID invalid');
      }

      const productExist = await this.productService.productExist(id);
      const userExist = await this.userService.userExist(userId);

      if (!userExist) {
        notFoundException(`User ${id} not found`);
      }

      if (!productExist) {
        notFoundException(`Product ${id} not found`);
      }

      const product = await this.productService.unFavoriteProduct(id, userId);

      return response.status(HttpStatus.OK).json({
        Product: product,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Patch(':productId/:userId/:rating')
  async rateProduct(
    @Res() response,
    @Param('productId') productId: ObjectId,
    @Param('userId') userId: ObjectId,
    @Param('rating') rating: number,
  ) {
    try {
      const product = await this.productService.rateProduct(
        productId,
        userId,
        rating,
      );

      if (!rating) {
        notFoundException(`Product ${productId} not found!`);
      }

      return response.status(HttpStatus.OK).json(product);
    } catch (error) {
      errorMessage(response, error.message);
    }
  }
}
