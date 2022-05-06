import { IncomingForm } from 'formidable';

class FileUpload {
  private _form: InstanceType<typeof IncomingForm>;
  constructor(path: string, req?: any) {
    this._form = new IncomingForm({
      uploadDir: path,
      encoding: 'binary',
      allowEmptyFiles: false
    });
  }
  getForm() {
    this._form;
  }
}
export default FileUpload;
