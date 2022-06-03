import { Response } from 'express';
import { Transaction } from 'sequelize/types';

import { EVENT } from '../constants/response-events.constants';
import HttpReponse from '../utils/HttpResponse';

class Context {
  private state: State;
  constructor(state: State, private _params: any, private _response: Response, private _transaction?: Transaction) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }
  public requestCreate(): void {
    this.state.create();
  }

  public get transaction(): Transaction | null {
    if (this._transaction) return this._transaction;
    return null;
  }

  public sendResponse(event: EVENT) {
    if (this.transaction) event === EVENT.OK ? this.transaction.commit() : this.transaction.rollback();

    switch (event) {
      case EVENT.OK:
        this.res.status(200).send(HttpReponse.ok(this._params));
        break;
      case EVENT.ERROR:
        this.res.status(400).send(HttpReponse.mistake(this._params));
        break;
      case EVENT.NULL:
        this.res.status(500).send(HttpReponse.fail());
        break;
      default:
        this.res.status(500).send(HttpReponse.fail());
    }
  }
  public get params() {
    return this._params;
  }
  public set params(params: any) {
    this._params = params;
  }
  public get res() {
    return this._response;
  }
}

abstract class State {
  protected context: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract create(): void;
  public abstract findByID(): void;
}

export { Context, State };
