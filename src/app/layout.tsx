import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "MedCare - Doctor Appointment App",
  description: "Book your doctor appointments easily and securely",
  icons: {
    icon: [
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
