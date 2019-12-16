export abstract class FullFilled<T> {
  constructor(data: Required<T>) {
    Object.assign(this, data);
  }
}
