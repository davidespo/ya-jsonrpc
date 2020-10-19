export interface RPCRegistry {
    readonly methods: RPCMethod[];
    add(method: RPCMethod): void;
    exec(req: RPCRequest): Promise<RPCResponse>;
}

export interface RPCMethod {
    readonly summary: RPCMethodSummary;
    init?(registry: RPCRegistry): Promise<void>;
    close?(registry: RPCRegistry): Promise<void>;
    exec(params: any): Promise<any>;
}

export type RPCMethodSummary = {
    readonly key: string;
    readonly description: string;
    readonly tags: string[];
    readonly inputs: JsonSchema | null;
    readonly outputs: JsonSchema | null;
}

export interface RPCRequest {
    readonly method: string;
    readonly params: any;
    id?: string;
}

export interface RPCResponse {
    results?: any;
    error?: {
        code: number;
        message: string;
        data?: any;
    },
    id: string;
}

export interface JsonSchema {

}