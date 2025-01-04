import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Retrieves all products with optional filters.
   * @param filters - The filters to apply to the product query.
   * @returns A list of products matching the filters.
   */
  async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        ...(filters.categories && filters.categories.length
          ? { category: { in: filters.categories } }
          : {}),
        ...(filters.area ? { area: filters.area } : {}),
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      area: product.area,
      createdAt: product.createdAt,
      order_count: product._count.orders,
    }));
  }

  /**
   * Retrieves a specific product by ID.
   * @param id - The ID of the product to retrieve.
   * @returns The product with the specified ID.
   */
  async getProductById(id: number): Promise<ProductDTO> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      area: product.area,
      createdAt: product.createdAt,
      order_count: product._count.orders,
    };
  }

  /**
   * Retrieves the top-ordered products in a specific area.
   * @param area - The area to filter products by.
   * @returns A list of top-ordered products.
   * @throws BadRequestException if the area is not provided.
   */
  async getTopOrderedProducts(area: string): Promise<ProductDTO[]> {
    if (!area) {
      throw new BadRequestException('Area is required');
    }

    // Query to find the top 10 ordered products in the specified area
    const products = await this.prismaService.product.findMany({
      where: { area },
      orderBy: {
        orders: {
          _count: 'desc', // Order by the number of orders in descending order
        },
      },
      take: 10, // Limit the results to the top 10 products
      include: {
        _count: {
          select: {
            orders: true, // Include the count of orders for each product
          },
        },
      },
    });

    // Map the results to the ProductDTO format
    return products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      area: product.area,
      createdAt: product.createdAt,
      order_count: product._count.orders,
    }));
  }
}