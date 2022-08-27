import { ProductService } from './product.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ProductDocument } from './product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Post()
  createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.ProductService.create(name, price, description);
  }
}
