import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { CreateProductDTO } from './CreateProduct.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
    constructor(private ProductService: ProductService) { }

    // Get all Products
    @Get()
    getAllProducts(): Promise<ProductDocument[]> { 
        return this.ProductService.findAll();
    }

    // // Get Product by ID
    @UseGuards(JwtGuard)
    @Get(':id')
    getProductById(@Param('id') id: string) { 
        return this.ProductService.findById(id);
    }

    // Create a new Product
    @UseGuards(JwtGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(
        @Body() productData: CreateProductDTO,
    ) {
        return this.ProductService.create(productData);
    }

    // Update a Product
    @UseGuards(JwtGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateProduct(@Param('id') id: string, @Body() product: CreateProductDTO) { 
        return this.ProductService.update(id, product);
    }

    // Delete a Product
    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.ProductService.delete(id);
    }
}
