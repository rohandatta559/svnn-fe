import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-garamond",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata = {
  title: "TruKid Confectionery",
  description: "Small-batch, handcrafted eclairs, jellies, candies, lollipops and chocolate.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${garamond.variable} ${plexMono.variable}`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
