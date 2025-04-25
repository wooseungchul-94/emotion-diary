import axios from 'axios';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post('http://localhost:8080/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data; // 저장된 파일 경로 (예: /uploads/photo.jpg)
};