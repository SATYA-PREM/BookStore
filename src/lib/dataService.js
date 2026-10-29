// Image & JSON Data Persistence Service for BookFlow

export async function uploadBookImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        // Try uploading to local backend API (Vite middleware / server)
        const response = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataUrl: base64Data,
            fileName: file.name,
          }),
        });

        if (response.ok) {
          const res = await response.json();
          if (res.success && res.url) {
            return resolve(res.url);
          }
        }
        // Fallback to base64 data URL for offline / static client preview
        resolve(base64Data);
      } catch (err) {
        console.warn("API upload failed, falling back to local data URL:", err);
        resolve(reader.result);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export async function syncDataToJsonFile(books, fullStoreData) {
  try {
    const response = await fetch("/api/data/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        books,
        storeData: fullStoreData,
      }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("Could not sync directly to JSON backend (likely static hosting or offline):", err);
  }
  return { success: false };
}

