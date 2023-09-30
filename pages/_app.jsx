import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      // attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
