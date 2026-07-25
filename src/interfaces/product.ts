export interface ProductI {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: number;
  availabilityStatus: string;
  brand: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage: number;
  meta: {
    barcode: string;
    createdAt: string;
    updatedAt: string;
    qrCode: string;
  };
  minimumOrderQuantity: number;
  returnPolicy: string;
  reviews: {
    date: number;
    rating: number;
    comment: string;
    reviewerEmail: string;
    reviewerName: string;
  }[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  warrantyInformation: string;
  weight: number;
}
