import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, id: number) {
    const isExist = await this.productRepository.findBy({
      user: { id },
      title: createProductDto.title,
    });

    if (isExist.length) throw new BadRequestException('Product already exist!');

    const newProduct = {
      title: createProductDto.title,
      description: createProductDto.description,
      image: createProductDto.image,
      price: createProductDto.price,
      category: createProductDto.category,
      user: {
        id,
      },
    };

    return await this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!product) throw new NotFoundException('Product not found!');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new NotFoundException("Product doesn't found!");

    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new NotFoundException("Product doesn't found!");

    return await this.productRepository.delete(id);
  }
}
