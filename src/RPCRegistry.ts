import { nanoid } from 'nanoid';
import { RPCMethodImpl, RPCRegistry, RPCRequest, RPCResponse, STATUS_NOT_FOUND, StatusResponse } from './rpcTypes'

export default class DefaultRPCRegistry implements RPCRegistry {
    private methodImpls: Map<string, RPCMethodImpl>;
    private statusMap: Map<string, StatusResponse>;

    constructor() {
        this.methodImpls = new Map<string, RPCMethodImpl>();
        this.statusMap = new Map<string, StatusResponse>();
    }

    getMethods() {
        return Promise.resolve(
            Array.from(this.methodImpls.values())
            .map(impl => impl.method)
        );
    }

    add(impl: RPCMethodImpl) {
        this.methodImpls.set(impl.method.key, impl);
    }

    // TODO: options for RUN_MODE=async/inline
    async exec(req: RPCRequest) {
        const { id = nanoid(), method: key, params } = req;
        const impl = this.methodImpls.get(key);
        let response: RPCResponse;
        if (!!impl) {
            try {

                const results = await impl.exec(params);
                response = {
                    id,
                    results
                }
            } catch (error) {
                // TODO: handle typed errors
                const { code = 500, message = "UNKNOWN ERROR", data = null } = error;
                response = {
                    id,
                    error: { code, message, data }
                }
            }
        } else {
            response = {
                id,
                error: {
                    code: 123,
                    message: 'METHOD NOT FOUND'
                }
            };
        }
        return response;
    }

    async getStatus(id: string) {
        return this.statusMap.get(id) || {
            id,
            state: STATUS_NOT_FOUND,
        };
    }
}