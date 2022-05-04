type IData<T> = Array<T> | T | null;

const response200 = (data: IData<any>) => ({
  message: "Success Request",
  data,
});

const response404 = (name: string) => ({
  message: `${name} doesn't found`,
  data: [],
});

const response500 = (e: string) => ({
  message: `Server Error: ${e}`,
  data: [],
});

export { response200, response404, response500 };
