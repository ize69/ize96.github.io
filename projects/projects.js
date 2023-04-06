import Project from '../projects/project_class.js';
import addProjectToDOM from '../projects/dom.js';

$(document).ready(function() {
    $.ajax({
        url: './tree.php',
        method: 'GET',
        data: {
            dir: '../projects/uploads'
        },
        success: function(response) {
            const projects = [];
            const folders = response.trim().split('\n');
            folders.forEach(function(folder) {
                const name = folder.trim().split('/').pop();
                const images = [];
                $.ajax({
                    url: `./tree.php?dir=${folder}`,
                    method: 'GET',
                    success: function(response) {
                        console.debug(` ${folder}`);
                        const files = response.trim().split('\n');
                        files.forEach(function(file) {
                            if (/\.(gif|jpe?g|png)$/i.test(file)) {
                                images.push(file.trim());
                            }
                        });
                        const project = new Project(name, "", images, [], "");
                        projects.push(project);
                        addProjectToDOM(project);
                    },
                    error: function(xhr, status, error) {
                        console.log(`Error fetching images for ${name}:`, error);
                    }
                });
            });
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
});
