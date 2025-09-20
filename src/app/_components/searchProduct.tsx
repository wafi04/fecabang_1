"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const searchSchema = z.object({
  search: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchSubCategoryProps {
  search: string;
  setSearch: (search: string) => void;
  onSearch?: (values: SearchFormValues) => void;
}

export function SearchSubCategory({
  search,
  setSearch,
  onSearch,
}: SearchSubCategoryProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: search,
    },
  });

  const handleSubmit = (values: SearchFormValues) => {
    setSearch(values.search || "");
    if (onSearch) {
      onSearch(values);
    }
  };

  const handleReset = () => {
    form.reset({ search: "" });
    setSearch("");
  };

  // Handle real-time search on input change
  const handleInputChange = (value: string) => {
    form.setValue("search", value);
    setSearch(value);
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
                Kategori Produk
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Temukan Kategori Yang Sesuai
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex-shrink-0 w-full lg:w-auto lg:min-w-[400px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search categories..."
                            className="pl-10 pr-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleInputChange(e.target.value);
                            }}
                          />
                          {field.value && (
                            <button
                              type="button"
                              onClick={handleReset}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <Button
                          type="submit"
                          className="h-11 px-6 bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}