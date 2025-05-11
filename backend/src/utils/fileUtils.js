import { APIError } from './APIError.js';

const validateFileType = (file) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (!allowedTypes.includes(file.mimetype)) {
    throw new APIError(400, 'Only PDF/DOC/DOCX files allowed');
  }
};

const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9-_.]/g, '');
};

export { validateFileType, sanitizeFilename };