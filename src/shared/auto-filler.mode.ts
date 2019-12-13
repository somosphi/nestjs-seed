export abstract class AutoFiller<T> {
  constructor(data: Required<T>) {
    Object.assign(this, data);
  }
}
