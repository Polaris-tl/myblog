declare interface Action<T = null> {
  type: string;
  payload: T;
}
