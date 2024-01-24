import { Announcement } from 'src/announcement/entities/announcement.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.user, {
    onDelete: 'CASCADE',
  })
  product: Product[];

  @OneToMany(() => Announcement, (announcement) => announcement.user, {
    onDelete: 'CASCADE',
  })
  announcement: Announcement[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
