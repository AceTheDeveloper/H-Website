"use client";

import { useEffect, useRef, useState } from "react";
import type { Html5Qrcode } from "html5-qrcode";

type Result =
  | { status: "available"; title: string; offer: string }
  | { status: "redeemed"; title: string; offer: string }
  | { status: "used"; title: string; offer: string; usedAt: string | null }
  | { status: "invalid" }
  | { status: "error" }
  | null;

type VerifyResponse =
  | { valid: false }
  | {
      valid: true;
      title: string;
      offer?: string;
      used: boolean;
      usedAt?: string | null;
      justRedeemed?: boolean;
    };

function when(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function VerifyForm() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scanHandledRef = useRef(false);
  const scanStartingRef = useRef(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [scanError, setScanError] = useState("");
  const [result, setResult] = useState<Result>(null);

  async function stopScanner() {
    scanStartingRef.current = false;
    const scanner = scannerRef.current;
    scannerRef.current = null;
    setScanning(false);
    setCameraReady(false);
    if (!scanner) return;

    try {
      if (scanner.isScanning) await scanner.stop();
      scanner.clear();
    } catch (error) {
      console.error("Could not stop the voucher QR scanner.", error);
      setScanError("Could not stop the camera. Please close this page when done.");
    }
  }

  useEffect(
    () => () => {
      scanStartingRef.current = false;
      const scanner = scannerRef.current;
      if (scanner?.isScanning) {
        void scanner
          .stop()
          .then(() => scanner.clear())
          .catch((error: unknown) =>
            console.error("Could not stop the voucher QR scanner.", error),
          );
      }
    },
    [],
  );

  async function call(scannedCode: string, redeem: boolean) {
    if (busy || !scannedCode) return;
    setBusy(true);
    try {
      const res = await fetch("/api/stamps/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: scannedCode, redeem }),
      });
      if (!res.ok) throw new Error("Voucher verification failed.");
      const data = (await res.json()) as VerifyResponse;
      if (!data.valid) setResult({ status: "invalid" });
      else if (data.justRedeemed)
        setResult({
          status: "redeemed",
          title: data.title,
          offer: data.offer ?? data.title,
        });
      else if (data.used)
        setResult({
          status: "used",
          title: data.title,
          offer: data.offer ?? data.title,
          usedAt: data.usedAt ?? null,
        });
      else
        setResult({
          status: "available",
          title: data.title,
          offer: data.offer ?? data.title,
        });
    } catch {
      setResult({ status: "error" });
    } finally {
      setBusy(false);
    }
  }

  async function startScanner() {
    if (scannerRef.current || scanStartingRef.current || busy) return;
    setScanError("");
    setResult(null);
    setCode("");
    scanHandledRef.current = false;
    scanStartingRef.current = true;
    setScanning(true);
    setCameraReady(false);

    try {
      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import(
        "html5-qrcode"
      );
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      if (!scanStartingRef.current) return;
      const scanner = new Html5Qrcode("voucher-qr-reader", {
        verbose: false,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      });
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText) => {
          if (scanHandledRef.current) return;
          scanHandledRef.current = true;
          setCode(decodedText);
          void stopScanner();
          void call(decodedText, false);
        },
        () => {
          // A frame without a QR code is expected while scanning.
        },
      );
      if (scannerRef.current === scanner) {
        scanStartingRef.current = false;
        setCameraReady(true);
      }
    } catch (error) {
      scanStartingRef.current = false;
      console.error("Could not start the voucher QR scanner.", error);
      await stopScanner();
      setScanError(
        "Camera access is unavailable. Allow camera access and try again.",
      );
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="border-2 border-ink bg-white p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
          Staff voucher check
        </p>
        <p className="heading mt-2 text-2xl">Scan the guest&apos;s coupon QR</p>
        <p className="mt-2 text-ink/70">
          Allow camera access, scan the QR on the coupon, then confirm the
          redemption after giving the offer.
        </p>
        <div
          id="voucher-qr-reader"
          className={`mt-5 overflow-hidden ${scanning ? "min-h-64" : "hidden"}`}
        />
        {!scanning && (
          <button
            type="button"
            onClick={startScanner}
            disabled={busy}
            className="btn btn-primary mt-5 w-full disabled:opacity-50"
          >
            {busy ? "Checking…" : result ? "Scan another coupon" : "Start camera"}
          </button>
        )}
        {scanning && (
          <button
            type="button"
            onClick={() => void stopScanner()}
            disabled={!cameraReady}
            className="btn btn-outline mt-4 w-full"
          >
            {cameraReady ? "Stop camera" : "Starting camera…"}
          </button>
        )}
        {scanError && (
          <p role="alert" className="mt-4 text-brick">
            {scanError}
          </p>
        )}
      </div>

      <div className="mt-6" aria-live="polite">
        {result?.status === "available" && (
          <div className="border-2 border-ink bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6A48]">
              Genuine · not used yet
            </p>
            <p className="heading mt-2 text-3xl">{result.title}</p>
            <p className="mt-2 text-white/80">{result.offer}</p>
            <button
              type="button"
              onClick={() => void call(code, true)}
              disabled={busy}
              className="btn btn-primary mt-5 w-full disabled:opacity-50"
            >
              {busy ? "Saving…" : "Mark as used"}
            </button>
            <p className="mt-3 text-sm text-white/70">
              Only confirm after the guest has received the offer.
            </p>
          </div>
        )}
        {result?.status === "redeemed" && (
          <div className="border-2 border-ink bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6A48]">
              Marked as used
            </p>
            <p className="heading mt-2 text-3xl">{result.title}</p>
            <p className="mt-2 text-white/80">{result.offer}</p>
          </div>
        )}
        {result?.status === "used" && (
          <div className="border-2 border-red bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brick">
              Already used
            </p>
            <p className="heading mt-2 text-3xl">{result.title}</p>
            <p className="mt-2 text-ink/75">{result.offer}</p>
            <p className="mt-2 text-ink/75">
              {result.usedAt ? `Redeemed ${when(result.usedAt)}. ` : ""}Do not
              honor this coupon again.
            </p>
          </div>
        )}
        {result?.status === "invalid" && (
          <div className="border-2 border-red bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brick">
              Not valid
            </p>
            <p className="heading mt-2 text-3xl">QR not recognized</p>
            <p className="mt-2 text-ink/75">
              This QR is not a valid H coupon. Do not honor it.
            </p>
          </div>
        )}
        {result?.status === "error" && (
          <p className="border-2 border-ink bg-white p-4 text-ink/80">
            Couldn&apos;t reach the server. Check your connection and scan again.
          </p>
        )}
      </div>
    </div>
  );
}
