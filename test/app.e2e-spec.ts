import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/product (GET) - should return filtered products', async () => {
    const filters = {
      area: 'Maadi',
      categories: ['Product 2 Category '],
    };

    const response = await request(app.getHttpServer())
      .get(`/product?area=${filters.area}&categories=${filters.categories.join(',')}`)
      .expect(200); // Expect a successful response

    expect(response.body).toBeInstanceOf(Array); // Ensure response is an array
  });

  it('/product/:id (GET) - should return a specific product', async () => {
    const productId = 1; // Replace with an actual ID from your database

    const response = await request(app.getHttpServer())
      .get(`/product/${productId}`)
      .expect(200); // Expect a successful response

    expect(response.body).toHaveProperty('id', productId); // Ensure the returned product has the correct ID
  });

  it('/product/top-ordered-products (GET) - should return top 10 products', async () => {
    const response = await request(app.getHttpServer())
      .get('/product/top-ordered-products?area=Maadi')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(10);
  });

  it('/product/top-ordered-products (GET) - should return 400 for missing area', async () => {
    await request(app.getHttpServer())
      .get('/product/top-ordered-products')
      .expect(400);
  });
});
