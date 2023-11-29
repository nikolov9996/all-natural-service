import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { Model, ObjectId } from 'mongoose';
import { IProduct } from './products.interface';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<IProduct>,
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}

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

  async favoriteProduct(id: ObjectId, userId: ObjectId) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { $addToSet: { favorites: userId } },
      { new: true },
    );

    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { favorites: id },
    });

    return product;
  }

  async unFavoriteProduct(id: ObjectId, userId: ObjectId) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { $pull: { favorites: userId } },
      { new: true },
    );

    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { favorites: id },
    });

    return product;
  }

  async removeDeletedUser(userId: ObjectId) {
    return await this.productModel.updateMany(
      { favorites: userId },
      { $pull: { favorites: userId } },
    );
  }

  async productExist(productId: ObjectId) {
    return await this.productModel.exists({ _id: productId });
  }
}
