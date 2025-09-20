"use client";

import { useAuthStore } from "@/shared/hooks/authStore";
import { useAuthQuery } from "@/shared/hooks/useAuthQuery";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

// Routes yang tidak perlu auth
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password", "/"];


function AuthLoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat...</p>
      </div>
    </div>
  );
}

function AuthErrorScreen({ error, onRetry }: { error: any; onRetry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Terjadi Kesalahan
        </h2>
        <p className="text-gray-600 mb-4">
          {error?.message || "Gagal memuat data user"}
        </p>
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}

export function AuthInitProvider({ children }: { children: ReactNode }) {
  const { 
    data: user, 
    isLoading, 
    error, 
    refetch,
    isError 
  } = useAuthQuery();
  
  const { 
    login, 
    logout, 
    setIsLoading,
    isAuthenticated 
  } = useAuthStore();
  
  const router = useRouter();
  const pathname = usePathname();

  // Helper functions
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isProtectedRoute = !isPublicRoute; 

  useEffect(() => {
    setIsLoading(isLoading);

    if (user && !isError) {
      login(user.data);
      
      if (pathname === "/login") {
        router.replace("/");
      }
    }

    if (isError || (!user && !isLoading)) {
      logout();
      
      if (isProtectedRoute) {
        router.replace("/login");
      }
    }
  }, [
    user, 
    isLoading, 
    isError, 
    error,
    login, 
    logout, 
    setIsLoading, 
    router, 
    pathname,
    isProtectedRoute
  ]);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (isError && !isPublicRoute) {
    return (
      <AuthErrorScreen 
        error={error} 
        onRetry={() => refetch()} 
      />
    );
  }

  if (isProtectedRoute && !isAuthenticated) {
    return <AuthLoadingScreen />;
  }

  // Jika di login page tapi sudah authenticated
  if (pathname === "/login" && isAuthenticated) {
    // Loading akan handle redirect
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}

export function useAuthGuard() {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
      return false;
    }
    return true;
  };

  const requireGuest = () => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
      return false;
    }
    return true;
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    requireAuth,
    requireGuest,
  };
}

// HOC untuk protected pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuthGuard();

    if (isLoading) {
      return <AuthLoadingScreen />;
    }

    if (!isAuthenticated) {
      return null; 
    }

    return <Component {...props} />;
  };
}

export function withGuest<P extends object>(
  Component: React.ComponentType<P>
) {
  return function GuestComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuthGuard();

    if (isLoading) {
      return <AuthLoadingScreen />;
    }

    if (isAuthenticated) {
      return null; 
    }

    return <Component {...props} />;
  };
}