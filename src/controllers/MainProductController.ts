class Context {
  private state: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }
  public requestCreate(): void {
    this.state.create();
  }
  public handleError(): void {
    this.state.error();
  }
}

abstract class State {
  protected context: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract create(): void;
  public abstract error(): void;
}

export { Context, State };
