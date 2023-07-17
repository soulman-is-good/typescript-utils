export class Mutex {
    private _promise?: Promise<void>;
    private _resolve?: () => void;

    lock() {
        if (this._promise) {
            return this._promise;
        }
        return new Promise<void>(end => {
            this._promise = new Promise(resolve => {
                this._resolve = resolve;
                end();
            });
        })
    }

    unlock() {
        if (!this._promise || !this._resolve) {
            return;
        }
        const resolve = this._resolve;
        delete this._resolve;
        delete this._promise;
        resolve();
    }
}
