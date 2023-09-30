import Image from "next/image";
import { Inter } from "next/font/google";
import ProductCard from "@/components/ProductCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="mt-16">
      <h1>Recomended Products</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <ProductCard />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <ProductCard />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <ProductCard />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <ProductCard />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <ProductCard />
        </div>
      </div>
    </main>
  );
}
