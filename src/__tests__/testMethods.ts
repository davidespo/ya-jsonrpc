import { RPCMethod } from '../rpcTypes';

export const noop: RPCMethod = {
  summary: {
    key: 'testing.noop',
    description: 'Do nothing for testing',
    tags: [],
    inputs: null,
    outputs: null,
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

export const sleep: RPCMethod = {
  summary: {
    key: 'testing.sleep',
    description: 'Do nothing for testing',
    tags: [],
    inputs: {
      type: 'number'
    },
    outputs: null,
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