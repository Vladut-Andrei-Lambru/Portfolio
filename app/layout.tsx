import type { Metadata } from "next";
import "./globals.css";

const basePath=process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Vladut-Andrei Lambru | Gameplay Programming & Technical Design",
  description: "Unity, C#, VR and gameplay systems portfolio by CMGT student Vladut-Andrei Lambru.",
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
