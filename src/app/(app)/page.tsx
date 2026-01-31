import { listProducts } from "@/actions/list-product";
import { ProductCard } from "@/components/product/card";
import { Header } from "@/components/shared/header";

const HomePage = async () => {
  const { data: products, error } = await listProducts();
  if (error) {
    throw new Error(error);
  }

  console.log("HomePage - Products:", products);
  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      <main className="flex flex-col items-center w-full px-4 max-w-[1440px] mt-4">
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
