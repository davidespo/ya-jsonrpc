import { RPCMethodImpl } from '../rpcTypes';

const NULL_TYPE = { type: 'null' };

export const noop: RPCMethodImpl = {
  method: {
    key: 'testing.noop',
    description: 'Do nothing for testing',
    tags: [],
    inputs: NULL_TYPE,
    outputs: NULL_TYPE,
  },
  async exec(params) {
    return null;
  }
}

test("Noop method doesn\'t explode", done => {
  noop.exec(null).then(data => {
    expect(data).toBeNull();
    done();
  });
});

export const sleep: RPCMethodImpl = {
  method: {
    key: 'testing.sleep',
    description: 'Do nothing for testing',
    tags: [],
    inputs: {
      type: 'number'
    },
    outputs: NULL_TYPE,
  },
  exec(params = 0) {
    return new Promise(res => setTimeout(() => res(params), params));
  }
}

test("Sleep method doesn\'t explode", done => {
  sleep.exec(1).then(data => {
    expect(data).toBe(1);
    done();
  });
});