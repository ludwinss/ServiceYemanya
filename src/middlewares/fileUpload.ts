import multer, { Multer } from 'multer';

class FileUpload {
  private _instance: Multer;
  constructor(path: string, req?: any) {
    const store = multer.memoryStorage();
    this._instance = multer({ storage: store, dest: path });
  }
  buildMemoryStorage() {
    return this._instance;
  }
}

export default FileUpload;
