//this file contains the project class and its methods

// Project class
class Project {
    constructor(name, description, images, tasks) {
        this.name = name;
        this.description = description;
        this.images = images;
        this.tasks = tasks;
    }
}

// Project methods
Project.prototype.addTask = function (task) {
    this.tasks.push(task);
}

Project.prototype.removeTask = function (task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
}

Project.prototype.addImage = function (image) {
    this.images.push(image);
}

Project.prototype.removeImage = function (image) {
    this.images.splice(this.images.indexOf(image), 1);
}

Project.prototype.getName = function () {
return this.name;
}
    
Project.prototype.getDescription = function () {
return this.description;
}

Project.prototype.setName = function (name) {
this.name = name;
}

Project.prototype.setDescription = function (description) {
this.description = description;
}

Project.prototype.getImages = function () {
return this.images;
}

Project.prototype.getTasks = function () {
return this.tasks;
}

Project.prototype.setImages = function (images) {
this.images = images;
}

Project.prototype.setTasks = function (tasks) {
this.tasks = tasks;
}

// Export the Project class
module.exports = Project;