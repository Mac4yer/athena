import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";

export const metadata = {
  title: "Auth",
  description: "Next 14 Social Media App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gradient-to-r bg-purple-2 p-4`}>
          <div className="container mx-auto max-w-2xl">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}