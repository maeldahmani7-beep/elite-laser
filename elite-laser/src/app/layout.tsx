import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Elite Laser — Votre vie libre commence ici",
  description: "Vos réflexologues experts en auriculothérapie laser pour vous libérer de vos dépendances. 4,9★ sur Google · +750 avis · 4 cabinets Hauts-de-France.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Elite Laser",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#131c4d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/icon-512.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Elite Laser" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#131c4d" }}>
        {children}
      </body>
    </html>
  );
}
