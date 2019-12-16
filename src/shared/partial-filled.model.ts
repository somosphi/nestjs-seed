export abstract class PartialFilled<T> {
  constructor(data?: Partial<T>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
