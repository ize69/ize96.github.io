// Project class
export default class Project {
    constructor(name, description, images, tasks) {
        this.name = name;
        this.description = description;
        this.images = images;
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }

    addImage(image) {
        this.images.push(image);
    }

    removeImage(image) {
        this.images.splice(this.images.indexOf(image), 1);
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    getImages() {
        return this.images;
    }

    getTasks() {
        return this.tasks;
    }

    setImages(images) {
        this.images = images;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }
}
