import CryptoJS from 'crypto-js';

import { IEncryptData } from '../interfaces/IEncryptData';

class EncryptData implements IEncryptData {
  private _instance: typeof CryptoJS;
  private mySecret: string;
  constructor() {
    this._instance = CryptoJS;
    this.mySecret = process.env.MY_SECRET || 'yemanya';
  }
  EncodeSHA(message: string) {
    try {
      return this._instance.HmacSHA512(message, this.mySecret).toString();
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default EncryptData;
