import { ProductService } from './product.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Post()
  create(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ) {
    return this.ProductService.create(name, price, description);
  }
}
