import type { Metadata } from "next";
import "./globals.css";
import { publicPath } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Vladut-Andrei Lambru | Technical Game Designer",
  description: "Technical game design, gameplay programming and VR systems portfolio by Vladut-Andrei Lambru.",
  icons: { icon: publicPath("/favicon.svg"), shortcut: publicPath("/favicon.svg") },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
