export interface RPCRegistry {
    getMethods(): Promise<RPCMethod[]>;
    add(method: RPCMethodImpl): void;
    exec(req: RPCRequest): Promise<RPCResponse>;
    getStatus(id: string): Promise<StatusResponse>;
}

export interface RPCMethodImpl {
    readonly method: RPCMethod;
    init?(registry: RPCRegistry): Promise<void>;
    close?(registry: RPCRegistry): Promise<void>;
    exec(params: any): Promise<any>;
}

export type RPCMethod = {
    readonly key: string;
    readonly description: string;
    readonly tags: string[];
    readonly inputs: JsonSchema;
    readonly outputs: JsonSchema;
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

export const STATUS_NOT_FOUND = "NOT_FOUND";
export const STATUS_QUEUED = "QUEUED";
export const STATUS_RUNING = "RUNNING";
export const STATUS_COMPLETE = "COMPLETE";
export const STATUS_ERROR = "ERROR";

export interface StatusResponse {
    readonly id: string;
    readonly startTime?: number;
    readonly endTime?: number;
    readonly state: "NOT_FOUND" | "QUEUED" | "RUNNING" | "COMPLETE" | "ERROR";
    readonly progress?: any | null;
    readonly result?: any | null;
}

export interface JsonSchema {
    type: string;
}