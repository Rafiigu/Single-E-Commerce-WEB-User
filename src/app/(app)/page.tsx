import { listProducts } from "@/actions/list-product";
import { ProductCard } from "@/components/product/card";
import { Header } from "@/components/shared/header";

const HomePage = async () => {
  const { data: products, error } = await listProducts();
  console.log("Products:", products);
  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex flex-col w-full">
      <Header />
      <main className="flex flex-col items-center w-full max-w-[1440px]">
        {products.map((product, i) => (
          <ProductCard
            key={`#product-card-${product.id}-${i}`}
            product={product}
          />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
