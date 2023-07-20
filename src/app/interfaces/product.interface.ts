export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images:string [];
  description: string;
  categoryId: Category;
  taxes?:number
}


export interface CreateProductDTO extends Omit<Product, 'id' | 'categoryId'>{
  categoryId: number;
}


export interface UpdateProductDTO extends Partial<CreateProductDTO>{}
