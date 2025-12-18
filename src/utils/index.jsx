import axios from 'axios';

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append('image', imageData);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
      formData
    );

    return data?.data?.display_url || null;

  } catch (err) {
    console.error("IMGBB Upload Error:", err);
    return null;
  }
};

export const cloudinaryImageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return data?.secure_url || null;

  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return null;
  }
};


// 3. Save or Update User in DB

export const saveOrUpdateUser = async (userData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/users`,  
      userData
    );
    return data;

  } catch (err) {
    console.error("Save User Error:", err);
    return null;
  }
};
