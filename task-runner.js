class Runner {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.waitList = [];
        this.count = 0;
    }

    push(task) {
        this.waitList.push(task);
        this.run();
    }

    run() {
        if (this.count < this.concurrency) {
            this.count++;
            if (this.waitList.length > 0) {
                let task = this.waitList.shift();
                task().then(() => {
                    this.count--;
                    this.run();
                })
            }
        }
    }
}

function task(x) {
    return function () {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                console.log('task completed', x);
                resolve();
            }, 2000);
        })
    }
}

let r = new Runner(2);
r.push(task(1));
r.push(task(2));
r.push(task(3));
r.push(task(4));
r.push(task(5));
r.push(task(6));
r.push(task(7));