import { InvalidExternalIdException } from 'src/user/exception/invalid-external-id.exception';

describe('InvalidExternalIdExpception', () => {

  it('should set properties', () => {
    const exception = new InvalidExternalIdException();
    expect(exception.code).toEqual('INVALID_EXTERNAL_ID');
    expect(exception.message).toEqual('Invalid external id');
  });
});
