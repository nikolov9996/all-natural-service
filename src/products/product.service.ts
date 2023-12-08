import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { Model, ObjectId } from 'mongoose';
import { IProduct } from './products.interface';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/user/user.interface';
import { CATEGORY } from './product.static';

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

  async getAverageRating(productId: ObjectId): Promise<number> {
    const result = await this.productModel
      .aggregate([
        { $match: { _id: productId } },
        {
          $project: {
            averageRating: {
              $avg: '$rating.rating',
            },
          },
        },
      ])
      .exec();

    const averageRating = result.length > 0 ? result[0].averageRating : 0;

    return averageRating;
  }

  async getProduct(productId: ObjectId) {
    const product = await this.productModel
      .findById(productId)
      .populate('creator')
      .populate('comments')
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

  async updateProduct(productId, product) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productId,
      product,
      { new: true },
    );
    return updatedProduct;
  }

  async rateProduct(productId: ObjectId, userId: ObjectId, rating: number) {
    const product = await this.productModel.findById(productId).exec();
    // If rating already exist for this user it is overwritten :)
    const ratingExist = product.rating?.find(
      (rating) => rating.userId.toString() === userId.toString(),
    );

    if (ratingExist) {
      product.rating.map((rat) => {
        if (rat.userId.toString() === userId.toString()) {
          rat.rating = rating;
        }

        return rat;
      });
    }

    await product.save();

    const avgRating = product.rating.reduce((acc, cVal) => {
      return (acc += cVal.rating);
    }, 0);

    const ratedProduct = await this.productModel // updating average rating
      .findByIdAndUpdate(
        productId,
        {
          $set: { avgRating: avgRating },
        },
        { new: true },
      )
      .exec();

    return ratedProduct;
  }

  async getCategories() {
    return Object.keys(CATEGORY).filter((value) => isNaN(Number(value)));
  }

  async productExist(productId: ObjectId) {
    return await this.productModel.exists({ _id: productId });
  }
}
