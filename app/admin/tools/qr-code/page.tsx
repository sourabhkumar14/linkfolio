"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerate = () => {
    setQrValue(text);
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qr-code-canvas") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">QR Code Generator</h1>

        <Input
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          onClick={handleGenerate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Generate QR Code
        </Button>

        {qrValue && (
          <div className="flex flex-col items-center gap-4 mt-6">
            <QRCodeCanvas
              id="qr-code-canvas"
              value={qrValue}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              includeMargin={true}
            />
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download PNG
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
