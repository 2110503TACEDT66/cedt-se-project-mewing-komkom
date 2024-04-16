import TopMenu from "@/components/TopMenu";
import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "@/providers/ NextAuthProvider";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Co-working Space Reservation",
  description: "Generated by create next app",
};

const line = localFont({
  src: [
    {
      path: '../../public/fonts/LINESeedSansTH_Rg.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/LINESeedSansTH_Bd.ttf',
      weight: '700'
    },
    {
      path: '../../public/fonts/LINESeedSansTH_XBd.ttf',
      weight: '800'
    },
    {
      path: '../../public/fonts/LINESeedSansTH_He.ttf',
      weight: '900'
    }
  ],
  variable: '--font-line'
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang="en" className="bg-bg">
      <body className={line.className}>
        <NextAuthProvider session={nextAuthSession}>
          <div className="pt-16">
            <TopMenu />
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}