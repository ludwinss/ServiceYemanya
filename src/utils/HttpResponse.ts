class HttpReponse {
  private static response: { data: Array<any>; message?: string; success: boolean } = { data: [], success: false };
  static ok(data: any) {
    this.response.data = data;
    this.response.success = true;
    return this.response;
  }
  static fail() {
    this.response.message = `Something wrong with your request`;
    return this.response;
  }
  static mistake(message: string) {
    this.response.message = `Error: ${message}`;
    return this.response;
  }
}

export default HttpReponse;
