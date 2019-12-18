import { validateSync, ValidatorOptions } from 'class-validator';
import { FullFilled } from './full-filled.model';

export abstract class AutoValidator<T> extends FullFilled<T> {
  constructor(data: Required<T>, options?: ValidatorOptions) {
    super(data);
    this.validate(options);
  }

  private validate(options?: ValidatorOptions): void {
    const errors = validateSync(this, options);
    if (errors.length) {
      throw errors.pop();
    }
  }
}
