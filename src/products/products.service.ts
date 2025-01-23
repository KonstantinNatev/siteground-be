import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

    create(name: string, price: number, currency: string) {
      const user = this.repo.create({ name, price, currency});
  
      return this.repo.save(user);
    }
  
    findOne(id: number) {
      if (!id) {
        return null;
      }
  
      return this.repo.findOneBy({ id });
    }

    async findAll(): Promise<Product[]> {
      return this.repo.find();
    }

    async update(id: number, attrs: Partial<Product>) {
      const product = await this.findOne(id);
  
      if (!product) {
        throw new Error("update: the product not found");
      }
  
      Object.assign(product, attrs);
  
      return this.repo.save(product);
    }
  
    async remove(id: number) {
      const product = await this.findOne(id);
  
      if (!product) {
        throw new Error("remove: the product not found");
      }
  
      return this.repo.remove(product);
    }
}
    