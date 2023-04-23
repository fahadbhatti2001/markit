import React, { useEffect } from "react";
import { UserAuthContextProvider } from "@/Components";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const use = async () => {
      await import("tw-elements");
    };
    use();
  }, []);

  return (
    <UserAuthContextProvider>
      <Component {...pageProps} />
    </UserAuthContextProvider>
  );
}
