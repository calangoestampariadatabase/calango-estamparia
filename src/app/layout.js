import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
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
    apple: [{ url: "/assets/icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/assets/icon.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W3Z8RQ3P');
            `,
          }}
        />
      </head>

      <body
        className={`${fontPoppins.variable} ${Bounded.variable} antialiased`}
      >
        <Script
          id="tintim-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(window, document, script) {
                if (!window.tt) {
                  window.tt = window.tt || {};

                  var c = document.getElementsByTagName('head')[0];
                  var k = document.createElement('script');
                  k.async = 1;
                  k.src = script;
                  c.appendChild(k);
                }

                window.tt.accountCode = '11059be2-0410-4b61-8aae-918b6f3b5322';

              })(window, document, '//s.tintim.app/static/core/tintim-1.0.js');
            `,
          }}
        />

        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3Z8RQ3P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
