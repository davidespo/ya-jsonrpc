import { exec } from "child_process";
import { RPCMethod, RPCMethodImpl } from '../../rpcTypes'

export const EXEC_METHOD: RPCMethod = {
    key: 'cli.exec.sync',
    description: 'Execute a command synchronously on the commendline.',
    tags: ['OS'],
    inputs: {
        type: 'object',
        properties: {
            cmd: { 
                type: 'string',
                label: 'Command'
            }
        }
    },
    outputs: {
        type: 'object',
        properties: {
            code: { 
                type: 'number',
                label: 'Process Exit Code'
            },
            stdout: { 
                type: 'string',
                label: 'Standard Output'
            },
            stderr: {
                type: 'string',
                label: 'Error Output'
            }
        }
    },
}

export const EXEC_METHOD_IMPL: RPCMethodImpl = {
    method: EXEC_METHOD,
    exec(params) {
        return new Promise((res, rej) => {
            try {
                const { cmd } = params;
                // TODO: timeout
                const p = exec(cmd, (error, stdout, stderr) => {
                    if (error) {
                        rej(error);
                    } else {
                        res({
                            code: p.exitCode,
                            stdout,
                            stderr
                        })
                    }
                });
            } catch (error) {
                rej(error);
            }
        });
    }
}

export const RPC_MODULE = {
    key: 'cli.exec',
    version: 'v0.1.0',
    // TODO: init
    // TODO: close
    methodImpls: [
        EXEC_METHOD_IMPL
    ]
}