import React from "react";
import dynamic from "next/dynamic";

// This scanner does not work on the dev server, only when fully built
const BarcodeScanner = dynamic(() => import("react-qr-barcode-scanner"), {
  ssr: false,
  loading: () => <p>Laster...</p>,
});

const BarcodeQrScanner = ({
  handleScan,
}: {
  // eslint-disable-next-line no-unused-vars
  handleScan: (result: string) => void;
}) => {
  return (
    <BarcodeScanner
      width={500}
      height={500}
      facingMode="environment"
      // @ts-ignore
      onUpdate={(error: unknown, result: any) => {
        if (result?.text) {
          handleScan(result.text as string);
        }
      }}
    />
  );
};

export default BarcodeQrScanner;
