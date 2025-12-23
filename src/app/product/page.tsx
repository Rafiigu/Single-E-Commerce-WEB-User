import { listProducts } from "@/actions/list-product";
import ProductPageClient from "@/components/product/product-page-client";

const ProductPage = async () => {
  const products = await listProducts();
  return <ProductPageClient products={products} />;
};

export default ProductPage;
