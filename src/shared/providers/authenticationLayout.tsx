"use client"
import { Navbar } from "@/components/layout/navbar";
import { WithChildren } from "../types/response";
import { Footer } from "@/components/layout/footer";

export function AuthenticationLayout({children} : WithChildren){
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}