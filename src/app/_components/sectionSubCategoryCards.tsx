"use client"
import { useState } from "react";
import { SearchSubCategory } from "./searchProduct";
import { CardSubCategory } from "./cardSubCategory";

export function SectionSubCategory() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  return (
    <section className="flex flex-col  w-full">
      <SearchSubCategory
        search={search as string}
        setSearch={(e) => setSearch(e)}
      />
      <CardSubCategory search={search} />
    </section>
  );
}
