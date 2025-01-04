import { Controller, Get, Query, Param, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  /**
   * Endpoint to retrieve all products with optional filters.
   * @param filters - The filters to apply to the product query.
   * @returns A list of products matching the filters.
   */
  @Get()
  async getAllProducts(@Query() filters: GetAllProductsDTO) {
    // Convert categories to an array if it's a comma-separated string
    if (filters.categories && typeof filters.categories === 'string') {
      filters.categories = (filters.categories as unknown as string).split(',');
    }
    return this.productsService.getAllProducts(filters);
  }

  /**
   * Endpoint to retrieve a specific product by ID.
   * @param id - The ID of the product to retrieve.
   * @returns The product with the specified ID.
   */
  @Get('/:id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(Number(id));
  }

  /**
   * Endpoint to retrieve the top-ordered products in a specific area.
   * @param area - The area to filter products by.
   * @returns A list of top-ordered products.
   * @throws BadRequestException if the area query parameter is not provided.
   */
  @Get('top-ordered-products')
  async getTopOrderedProducts(@Query('area') area: string) {
    if (!area) {
      throw new BadRequestException('Area query parameter is required');
    }
    return await this.productsService.getTopOrderedProducts(area);
  }
}