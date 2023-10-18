import "./globals.css";
import { Providers } from "@/redux/provider";

export const metadata = {
  title: "ChainWatch",
  description:
    "Real-time surveillance of Bitcoin addresses and transactions right at your fingertips!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  );
}
