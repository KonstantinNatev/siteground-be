    import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
    import { ProductsService } from './products.service';
    import { CreateProductDTO } from './dto/create-product.dto';
    import { UpdateProductDTO } from './dto/update-product.dto';

    @Controller('products')
    export class ProductsController {
        constructor(private productsService: ProductsService) {}

        @Post("/create-product")
        async createProduct(@Body() body: CreateProductDTO) {
            const product = await this.productsService.create(body.name, body.price, body.currency);
            return product;
        }

        @Get()
        async findAllProducts() {
            const products = await this.productsService.findAll();
            return products;
        }

        @Get("/permissions")
        permissions() {
            return ["CREATE", "READ", "UPDATE", "DELETE"];
        }

        @Delete("/:id")
        async removeProduct(@Param("id") id: string) {
            const product = await this.productsService.findOne(parseInt(id));

            if (!product) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }

            return this.productsService.remove(parseInt(id));
        }

        @Patch("/:id")
        async updateProduct(@Param("id") id: string, @Body() body: UpdateProductDTO) {
            const product = await this.productsService.findOne(parseInt(id));

            if (!product) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }

            return this.productsService.update(parseInt(id), body);
        }
    }
