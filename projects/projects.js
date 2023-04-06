import Project from '../projects/project_class.js';

$(document).ready(function() {
    $.ajax({
        url: './tree.php',
        method: 'GET',
        data: {
            dir: '/var/www/html'
        },
        success: function(response) {
            var projectList = document.getElementById("projectList");
            var projectListItem = document.createElement("li");
            var projectListItemLink = document.createElement("a");
            var projectListItemLinkText = document.createTextNode("test");
            projectListItemLink.appendChild(projectListItemLinkText);
            projectListItem.appendChild(projectListItemLink);
            projectList.appendChild(projectListItem);
            var projectListItems = projectList.querySelectorAll("li");
            projectListItems.forEach(function(item) {
                item.addEventListener("click", function(event) {
                    console.log(event.target.innerText);
                });
            });
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });

    const test = new Project("test", "test", ["test"], ["test"]);
    var projects = [test];
});
