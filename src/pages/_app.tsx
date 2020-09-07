import React from "react";
import "./stripeStyle.css";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
