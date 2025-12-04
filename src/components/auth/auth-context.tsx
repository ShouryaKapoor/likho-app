"use client";

import React, { createContext, useContext } from "react";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    image?: string;
}

interface AuthContextType {
    user: User | null;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const router = useRouter();

    const user = session?.user ? {
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
    } : null;

    const logout = async () => {
        await nextAuthSignOut({ redirect: false });
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
