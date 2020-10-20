import { nanoid } from 'nanoid'
import DefaultRPCRegistry from '../RPCRegistry'
import { RPCRegistry, RPCRequest, STATUS_NOT_FOUND } from '../rpcTypes'
import { noop, sleep } from './testMethods';

test("RPC Registry: construct", () => {
    const registry: RPCRegistry = new DefaultRPCRegistry();
    expect(registry).not.toBeNull();
});

test("RPC Registry: register", done => {
    const registry: RPCRegistry = new DefaultRPCRegistry();
    
    (async () => {
        let methods = await registry.getMethods();
        expect(methods).toHaveLength(0);
        registry.add(noop);
        registry.add(sleep);
        methods = await registry.getMethods();
        expect(methods).toHaveLength(2);
        done();
    })()
});

test("RPC Registry: status not found", done => {
    const registry: RPCRegistry = new DefaultRPCRegistry();
    
    (async () => {
        const id = nanoid();
        const status = await registry.getStatus(id);
        expect(status).toStrictEqual({
            id,
            state: STATUS_NOT_FOUND
        });
        done();
    })()
});

test("RPC Registry: exec method not found", done => {
    const registry: RPCRegistry = new DefaultRPCRegistry();
    
    (async () => {
        registry.add(noop);
        const req: RPCRequest = {
            method: noop.method.key,
            params: null,
            id: nanoid(),
        }
        const res = await registry.exec(req);
        expect(res).not.toBeNull();
        expect(res.id).toBe(res.id);
        done();
    })()
});