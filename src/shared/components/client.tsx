"use client";

import { useEffect, useState, ReactNode } from "react";

interface ClientComponentProps {
  children: ReactNode;
}

export function ClientComponent({ children }: ClientComponentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 

  return <>{children}</>;
}
