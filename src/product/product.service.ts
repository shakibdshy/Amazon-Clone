import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './CreateProduct.dto';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product')
        private readonly productModel: Model<ProductDocument>,
    ) { }

    async create(productData: CreateProductDTO) {
        const newProduct = new this.productModel(productData);
        return newProduct.save();
    }
}
