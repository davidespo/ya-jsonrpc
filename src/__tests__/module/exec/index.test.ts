import { EXEC_METHOD_IMPL } from '../../../module/exec/index'

test('cli.exec - ls', done => {
    (async () => {
        const params = {
            cmd: 'ls -aglt'
        }
        const res = await EXEC_METHOD_IMPL.exec(params);
        const { code, stdout, stderr } = res;
        expect(code).toBe(0);
        expect(stdout.length).toBeGreaterThan(10);
        expect(stderr).toBe('');
        done();
    })()
});

test('cli.exec - Hello World', done => {
    (async () => {
        const params = {
            cmd: "echo 'Hello, World!'"
        }
        const res = await EXEC_METHOD_IMPL.exec(params);
        const { code, stdout, stderr } = res;
        expect(code).toBe(0);
        expect(stdout).toBe('Hello, World!\n');
        expect(stderr).toBe('');
        done();
    })()
})