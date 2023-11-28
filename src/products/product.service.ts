import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { Model, ObjectId } from 'mongoose';
import { IProduct } from './products.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}
  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = await new this.productModel(createProductDto);
    return newProduct.save();
  }

  async getProduct(productId: ObjectId) {
    const product = await this.productModel
      .findById(productId)
      .populate('creator')
      .exec();
    return product;
  }

  async getManyProducts(count: number) {
    const products = await this.productModel
      .find({})
      .limit(count)
      .populate('creator')
      .exec();
    return products;
  }

  async deleteProduct(id: ObjectId) {
    const isDeleted = await this.productModel.findByIdAndDelete({ _id: id });
    return isDeleted;
  }
}
