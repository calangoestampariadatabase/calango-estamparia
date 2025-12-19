import { Poppins} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";


const Bounded = localFont({
  src: "../../public/fonts/Bounded-Regular.ttf",
  variable: "--font-bounded",
  weight: "600",
});

const fontPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Calango Estamparia",
  description: "Calango Estamparia",

  icons: {
    icon: [
      { url: "/assets/icon.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/icon.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/assets/icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/assets/icon.png",
      },
    ],
  },

  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fontPoppins.variable} ${Bounded.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
