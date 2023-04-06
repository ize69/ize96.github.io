function addProjectToDOM(project) {
    var projectList = document.getElementById("projectList");
    var projectListItem = document.createElement("li");
    var projectListItemLink = document.createElement("a");
    var projectListItemLinkText = document.createTextNode(project.name);
    //handles drawing the image 
    //projectListItemLink.setAttribute("href", project.link);
    var projectListItemLinkImage = document.createElement("img");
    projectListItemLinkImage.setAttribute("src", project.preview);
    //console.debug(project.preview);
    //appends the elements to the html
    projectListItemLink.appendChild(projectListItemLinkImage);
    projectListItemLink.appendChild(projectListItemLinkText);
    projectListItem.appendChild(projectListItemLink);
    projectList.appendChild(projectListItem);
  }
  
  export default addProjectToDOM;
  