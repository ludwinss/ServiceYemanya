class HttpResponse {
  static ok(data: any) {
    return { data: data, success: true };
  }
  static fail() {
    return { success: false, message: `Something wrong with your request` };
  }
  static mistake(message: string) {
    return { success: false, message: `${message}` };
  }
}

export default HttpResponse;
