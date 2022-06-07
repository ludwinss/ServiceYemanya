class ParseBody<T> {
  private _req: any;
  private _objectValues: T;
  private _onlyInstancesInBody: Partial<T>;
  private _keyObject: Array<keyof T> = [];
  constructor(req: any, initValues: T) {
    this._req = req;
    this._objectValues = initValues;
    this._onlyInstancesInBody = {};
  }
  parseBody(omitFields = false): T {
    this._keyObject = Object.keys(this._objectValues) as Array<keyof T>;
    for (const key of this._keyObject) {
      if (key in this._req) {
        if (this._req[key] === '' && this._objectValues[key] !== null) {
          throw new Error(`Doesn't allow fields empty`);
        }
        if (this._req[key] !== '') {
          this._objectValues[key] = this._req[key];
        }
      }
    }

    if (!omitFields) {
      const tmpFieldErrors = this._keyObject.filter((key) => {
        if (typeof this._objectValues[key] === 'string')
          if ((this._objectValues[key] as unknown) === String()) return true;

        if (typeof this._objectValues[key] === 'number')
          if ((this._objectValues[key] as unknown) === Number()) return true;

        return false;
      });
      if (tmpFieldErrors.length > 0)
        throw new Error(`A field is missing ${tmpFieldErrors.join(', ').toLocaleUpperCase()}`);
    }
    return this._objectValues;
  }
  parseBodyUnStrict() {
    this._keyObject = Object.keys(this._objectValues) as Array<keyof T>;
    for (const key of this._keyObject)
      if (key in this._req) {
        if (this._req[key] === '') throw new Error(`Doesn't allow fields empty`);

        this._onlyInstancesInBody[key] = this._req[key];
      }
    return this._onlyInstancesInBody;
  }
  // parseID() {
  //const { id } = this._req.params;
  //if (!id) {
  //throw new Error(`Doesn't provider ID Params `);
  //}
  //return id;
  //}
}

export default ParseBody;
