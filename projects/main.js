// main.js
import { findProjects } from './project_cataloging.js';
// call the findProjects() function and store the result in a variable
const projects = findProjects();
// loop through the projects and display their names and descriptions
console.debug('Projects:');
for (let i = 0; i < projects.length; i++) {
  const project = projects[i];
  const name = project.getName();
  console.log(`Project ${i}: ${name}`);
  const description = project.getDescription();
  const images = project.getImages();
  console.log(`Project ${name}: ${description}`);
  console.log(`Images:`);
  for (let j = 0; j < images.length; j++) {
    const image = images[j];
    console.log(`  ${image.path}`);
    if (image.caption) {
      console.log(`    Caption: ${image.caption}`);
    }
  }
}
