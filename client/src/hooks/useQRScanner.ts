import { useCallback } from "react";

export function useQRScanner(onResult: (result: string) => void) {
  // This would wrap @yudiel/react-qr-scanner hooks if you expose props
  const handleResult = useCallback(
    (value: string) => {
      onResult(value);
    },
    [onResult]
  );
  return handleResult;
}
