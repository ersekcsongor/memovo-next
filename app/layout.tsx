import type { Metadata } from "next";
import { Comfortaa, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBar from "@/components/ConsentBar";
import ChatBubble from "@/components/ChatBubble";
import { LanguageProvider } from "@/components/LanguageProvider";

const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-comfortaa" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic"], weight: ["400", "600"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "Memovo — Private QR Code Photo Sharing & Digital Guestbook",
    template: "%s | Memovo",
  },
  description:
    "The original QR code photo sharing platform for events. Your guest photos and videos captured for you with a simple QR code and link.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} ${montserrat.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <ConsentBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatBubble />
        </LanguageProvider>
      </body>
    </html>
  );
}
