import { useGetFormFields } from "@/shared/hooks/useGetFormFIeld";
import { useOrderStore } from "@/shared/hooks/useSelectProductAndMethod";


export function PlaceHolderInput({ brand }: { brand: string }): JSX.Element {
  const brandReplace = brand.toUpperCase();
  const { data, isLoading, error } = useGetFormFields(brandReplace);
  const { setFormData, errors, formData } = useOrderStore();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ [field]: value });
  };

  if (isLoading) {
    return (
      <div className="py-4 bg-card px-4 rounded-lg border border-border">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-9 bg-gray-200 rounded"></div>
            <div className="h-9 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 bg-card px-4 rounded-lg border border-border">
        <div className="text-red-500 text-sm">
          Error loading form fields: {error.message}
        </div>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="py-4 bg-card px-4 rounded-lg border border-border">
        <div className="text-gray-500 text-sm">
          No form fields found for {brand}
        </div>
      </div>
    );
  }

  const gridCols = Math.min(data.data.length, 4); // Max 4 columns
  const gridClass = `grid gap-4 ${
    gridCols === 1 ? 'grid-cols-1' :
    gridCols === 2 ? 'grid-cols-1 md:grid-cols-2' :
    gridCols === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }`;

  return (
    <>
      <div className="py-4 bg-card px-4 rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Masukkan Tujuan
        </h2>
        <div className={gridClass}>
          {data.data
            .sort((a, b) => a.fieldOrder - b.fieldOrder)
            .map((field) => {
              const fieldValue = (formData as unknown as { [key: string]: string })[field.fieldName] || "";
              const fieldError = errors[field.fieldName];

              return (
                <div key={field.id} className="space-y-2">
                  <label
                    htmlFor={field.fieldName}
                    className="block text-xs font-medium text-foreground"
                  >
                    {field.fieldLabel}
                  </label>

                  <div className="relative">
                    {field.fieldType === "select" ? (
                      <select
                        id={field.fieldName}
                        name={field.fieldName}
                        className={`relative block h-9 w-full rounded-lg border px-3 text-xs text-foreground focus:z-10 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75 transition-colors ${
                          fieldError
                            ? "border-destructive focus:border-destructive focus:ring-destructive bg-destructive/5"
                            : "border-border bg-input focus:border-primary focus:ring-primary"
                        }`}
                        value={fieldValue}
                        onChange={(e) =>
                          handleInputChange(field.fieldName, e.target.value)
                        }
                        disabled={isLoading}
                      >
                        <option value="">Pilih {field.fieldLabel}</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className={`relative block h-9 w-full appearance-none rounded-lg border px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75 transition-colors ${
                          fieldError
                            ? "border-destructive focus:border-destructive focus:ring-destructive bg-destructive/5"
                            : "border-border bg-input focus:border-primary focus:ring-primary"
                        }`}
                        type={field.fieldType || "text"}
                        id={field.fieldName}
                        name={field.fieldName}
                        placeholder={`Masukkan ${field.fieldLabel}`}
                        autoComplete="off"
                        value={fieldValue}
                        onChange={(e) =>
                          handleInputChange(field.fieldName, e.target.value)
                        }
                        disabled={isLoading}
                      />
                    )}

                    {fieldError && (
                      <div className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <span>⚠</span>
                        <span>{fieldError}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        
      </div>
    </>
  );
}