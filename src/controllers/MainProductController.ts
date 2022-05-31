class Context {
  private state: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }
  public request(): void {
    this.state.create();
  }
}

abstract class State {
  protected context: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract create(): Promise<void>;
}

export { Context, State };
