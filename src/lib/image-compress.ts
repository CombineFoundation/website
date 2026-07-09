/**
 * Utility to compress images represented as Base64 Data URLs.
 * Downscales image to max dimensions and outputs as a JPEG with reduced quality.
 */
export function compressImage(dataUrl: string, maxWidth = 1000, maxHeight = 1000, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    // If not running in a browser, or not a base64 image, skip compression
    if (typeof window === "undefined" || !dataUrl || !dataUrl.startsWith("data:image/")) {
      resolve(dataUrl);
      return;
    }

    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      // Output as image/jpeg to ensure reliable quality compression
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    img.onerror = (err) => {
      console.error("Image loading error for compression, saving original:", err);
      resolve(dataUrl); // Fallback to original image
    };
  });
}
