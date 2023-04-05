// project_cataloging.js

import { Project, Image } from './project.js';
import { createFileTree } from './tree.js';
async function findProjects() {
  const projectList = [];
  const response = await createFileTree("projects/uploads");
  console.debug("File tree created");
  try {
    // Fetch the file tree data from the server

    // Parse the file tree data into a JSON object
    const data = response;

    // Loop through the projects in the file tree data
    for (const projectName in data) {
      if (data.hasOwnProperty(projectName)) {
        const projectPath = data[projectName];
        //const projectDescription = await getProjectDescription(projectName);
        const projectImages = await getProjectImages(projectName, projectPath);

        // Create a new Project object and add it to the list
        const project = new Project(projectName, projectDescription, projectImages);
        projectList.push(project);
      }
    }
  } catch (error) {
    console.error(`Error finding projects: ${error}`);
  }

  return projectList;
}

async function getProjectDescription(projectName) {
  //removes /from the end of the project name if it exists
  if (projectName.endsWith('/')) {
    projectName = projectName.slice(0, -1);
  }
  const descriptionPath = `${projectName}.txt`;
  try {
    const response = await fetch(descriptionPath);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const description = await response.text();
    return description.trim();
  } catch (error) {
    console.error(`Error getting description for project ${projectName}: ${error}`);
    return '';
  }
}

async function getProjectImages(projectName, projectPath) {
  const images = [];

  try {
    const response = await createFileTree(projectPath);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Loop through the files in the project directory
    for (const fileName in response) {
      if (response.hasOwnProperty(fileName)) {
        // Ignore files that aren't images
        if (!fileName.match(/\.(jpg|jpeg|png)$/i)) {
          continue;
        }

        const imagePath = `/${projectName}/${fileName}`;
        const imageCaption = await getImageCaption(projectName, fileName);

        // Create a new Image object and add it to the list
        const image = new Image(imagePath, imageCaption);
        images.push(image);
      }
    }
  } catch (error) {
    console.error(`Error getting images for project ${projectName}: ${error}`);
  }

  return images;
}


async function getImageCaption(projectName, fileName) {
  const captionPath = `/${projectName}/${fileName}.txt`;
  try {
    const response = await fetch(captionPath);
    if (!response.ok) {
      return '';
    }
    const caption = await response.text();
    return caption.trim();
  } catch (error) {
    console.error(`Error getting caption for image ${fileName}: ${error}`);
    return '';
  }
}

export { findProjects };

