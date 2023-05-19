/**
 * The goal here is to make a task runner
 * The number of the concurrent tasks must be configurable
 */
class Runner {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.runningTasksCount = 0;
        this.queue = [];
    }

    push(task) {
        this.queue.push(task);
        this.run();
    }

    run() {
        if (this.runningTasksCount < this.concurrency) {
            this.runningTasksCount++;
            if (this.queue.length > 0) {
                let task = this.queue.shift();
                task().then(() => {
                    this.runningTasksCount--;
                    this.run();
                });
            }
        }
    }
}

function makeTask(name) {
    return function () {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                console.log('Task completed', name);
                resolve();
            }, 2000);
        });
    }
}

let r = new Runner(2);
r.push(makeTask(1));
r.push(makeTask(2));
r.push(makeTask(3));
r.push(makeTask(4));
r.push(makeTask(5));
r.push(makeTask(6));
r.push(makeTask(7));