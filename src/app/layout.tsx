import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/shared/providers/reactQuery";
import { AuthInitProvider } from "@/shared/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { MetadataService } from "@/lib/metadata";
import { DynamicFavicon } from "@/components/ui/dynamicFavicon";

// Generate metadata dari service
export async function generateMetadata(): Promise<Metadata> {
  return await MetadataService.generateBaseMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DynamicFavicon />
      <body>
        <ReactQueryProvider>
          <AuthInitProvider>
            {children}
            <Toaster position="top-right" />
          </AuthInitProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
