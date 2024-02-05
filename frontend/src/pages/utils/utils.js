import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase/firebase";

export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `file/${v4()}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload && payload.exp ? payload.exp < currentTime : true;
  } catch (error) {
    console.error("Error: ", error);
    return true;
  }
};
