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

    async findAll(): Promise<ProductDocument[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<ProductDocument> { 
        return this.productModel.findById(id).exec();
    }

    async update(id: string, productData: CreateProductDTO): Promise<ProductDocument> { 
        return this.productModel.findByIdAndUpdate(id, productData, { new: true });
    }

    async delete(id: string): Promise<ProductDocument> { 
        return this.productModel.findByIdAndDelete(id);
    }
}
