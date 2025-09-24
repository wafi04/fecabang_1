import { ContactPerson } from "@/components/ui/contactPerson";
import { DynamicFavicon } from "@/components/ui/dynamicFavicon";
import { Toaster } from "@/components/ui/sonner";
import { MetadataService } from "@/lib/metadata";
import { ReactQueryProvider } from "@/shared/providers/reactQuery";
import type { Metadata } from "next";
import "./globals.css";

// Generate metadata dari service
export async function generateMetadata(): Promise<Metadata> {
  return await MetadataService.generateBaseMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await MetadataService.fetchWebSettings();

  return (
    <html lang="en">
      <DynamicFavicon />
      <body>
        <ReactQueryProvider>
            {
              data?.url_whatsapp &&  (
                <ContactPerson nowa={data?.whatsapp_number as string}/>
              )
            }
            {children}
            <Toaster position="top-right" />

        </ReactQueryProvider>
      </body>
    </html>
  );
}
