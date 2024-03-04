import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "Products" })
class Product {
  @PrimaryGeneratedColumn("uuid")
  product_id: string;

  @Column()
  productName: string;

  @Column()
  category: string;

  @Column()
  brandName: string;

  @Column({ type: "int", default: 0})
  stock: number;

  @Column()
  status: string;

  @Column({ type: "decimal", precision: 10, scale: 2 }) // Assuming these are monetary values
  MRP: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salesPrice: number;

  @Column()
  description: string;

  @Column()
  images: string;

  @Column()
  specifications: string;

  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;
}

export default Product;
