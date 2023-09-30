import Image from "next/image";
import { Inter } from "next/font/google";
import ProductCard from "@/components/ProductCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <ProductCard />
    </main>
  );
}
