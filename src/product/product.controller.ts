import { ProductService } from './product.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { CreateProductDTO } from './CreateProduct.dto';

@Controller('product')
export class ProductController {
    constructor(private ProductService: ProductService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(
        @Body() productData: CreateProductDTO,
    ) {
        return this.ProductService.create(productData);
    }
}
