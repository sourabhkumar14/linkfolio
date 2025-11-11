"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) return alert("Please enter a valid URL");

    setLoading(true);
    try {
      const res = await fetch("/api/shortener", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.shortUrl);
      } else {
        alert(data.error || "Failed to shorten URL");
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            🔗 Real URL Shortener
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="url"
            placeholder="Enter your URL (https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleShorten} disabled={loading} className="w-full">
            {loading ? "Shortening..." : "Shorten URL"}
          </Button>

          {shortUrl && (
            <div className="mt-4 p-3 border rounded bg-gray-50 dark:bg-gray-900">
              <p className="text-sm text-center mb-2">Your short link:</p>
              <div className="flex justify-between items-center">
                <a
                  href={shortUrl}
                  target="_blank"
                  className="text-blue-600 hover:underline truncate"
                >
                  {shortUrl}
                </a>
                <Button size="sm" onClick={handleCopy}>
                  Copy
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



