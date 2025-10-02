import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { getAuthenticatedUser } from "@/actions/me";
import { AuthProvider } from "@/components/providers/auth-provider";

const interSans = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce User",
  description: "E-Commerce user side",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {data, error} = await getAuthenticatedUser();

  const user = data && error === null ? data : null;
  return (
    <html lang="en">
      <body
        className={`${interSans.className} antialiased`}
      >
        <AuthProvider user={user}>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
