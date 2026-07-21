import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { compressImage } from "./image-compress";

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image file to Firebase Storage under the specified folder.
 * If Firebase Storage is not initialized or the upload fails, it falls back
 * to reading the file as base64 and compressing it.
 *
 * @param file The file to upload
 * @param folder The target folder in storage (e.g. "blogs", "courses")
 */
export async function uploadImage(file: File, folder: string = "images"): Promise<string> {
  try {
    if (!storage) {
      throw new Error("Firebase Storage is not initialized.");
    }

    // Generate a unique filename to prevent duplicates / overwrites
    const fileExtension = file.name.split(".").pop() || "jpg";
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const storageRef = ref(storage, `${folder}/${uniqueFilename}`);

    // Upload bytes directly (faster, lower memory footprint than base64)
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.warn("Firebase Storage upload failed, falling back to base64 compression:", error);
    try {
      const dataUrl = await readFileAsDataURL(file);
      // Fallback compression - resizes and compresses
      return await compressImage(dataUrl);
    } catch (fallbackError) {
      console.error("Image upload fallback also failed:", fallbackError);
      throw fallbackError;
    }
  }
}

/**
 * Uploads a generic file (e.g. PDF) to Firebase Storage under the specified folder.
 *
 * @param file The file to upload
 * @param folder The target folder in storage (e.g. "mous", "documents")
 */
export async function uploadFile(file: File, folder: string = "files"): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage is not initialized.");
  }
  const fileExtension = file.name.split(".").pop() || "bin";
  const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
  const storageRef = ref(storage, `${folder}/${uniqueFilename}`);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}
