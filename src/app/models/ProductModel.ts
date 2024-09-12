import { RatingModel } from "./RatingModel";

export class ProductModel {
  category: string | null = null;
  description: string | null = null;
  id: number | null = null;
  image: string | null = null;
  price: number | null = null;
  title: string | null = null;
  rating: RatingModel | null = null;
}
export enum Category {
  AllProducts = 'All Products',
  MobilePhones = 'Mobile Phones',
  Laptops = 'Laptops',
  Cameras = 'Cameras',
  AudioHeadphones = 'Audio & Headphones',
  Tablets = 'Tablets'
}