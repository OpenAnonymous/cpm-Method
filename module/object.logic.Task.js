class SimpleTask {
    constructor(name, time, dependencies = []) {
        this.name = name;
        this.time = +time;
        this.dependencies = dependencies;
        this.reverseDependencies = [];
    }

    setReverseDependencies(reDependencies = []) {
        this.reverseDependencies = reDependencies;
    }

    ES(){
        if (this.dependencies.length === 0) {
            return 0;
        } else {
            return Math.max(...this.dependencies.map(task => task.ES() + task.time));
        }
    }

    EF() {
        return this.ES() + this.time;
    }

    LS(projectDuration) {
        return this.LF(projectDuration) - this.time;
    }

    LF(projectDuration) {
        if (this.reverseDependencies.length === 0) {
            return projectDuration;
        } else {
            return Math.min(...this.reverseDependencies.map(task => task.LS(projectDuration)));
        }
    }
}

export default SimpleTask;
