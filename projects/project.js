// project.js
export class Image {
  constructor(path, caption) {
    this.path = path;
    this.caption = caption;
  }
}

export class Project {
  constructor(name, description, images, path) {

    this.name = name;
    this.description = description;
    this.images = images;
    this.path = path;
  }
  
    getName() {
      return this.name;
    }
  
    getDescription() {
      return this.description;
    }
  
    getImages() {
      return this.images;
    }
    
    getPath() {
      return this.path;
    }
    getImage(index) {
      if (index < 0 || index >= this.images.length) {
        return null;
      }
      return this.images[index];
    }
  
    getNumImages() {
      return this.images.length;
    }
  
    static async fromFolder(folderName) {
      const images = [];
      const imageCaptions = [];
      let i = 0;
      let imageFound = true;
      while (imageFound) {
        const imagePath = `./${folderName}/${folderName}_${i}.png`;
        const request = new XMLHttpRequest();
        request.open('HEAD', imagePath, false);
        request.send();
        if (request.status === 200) {
          const image = new Image(imagePath);
          images.push(image);
          i++;
        } else {
          const jpegPath = `./${folderName}/${folderName}_${i}.jpg`;
          const jpegRequest = new XMLHttpRequest();
          jpegRequest.open('HEAD', jpegPath, false);
          jpegRequest.send();
          if (jpegRequest.status === 200) {
            const image = new Image(jpegPath);
            images.push(image);
            const captionPath = `./${folderName}/${folderName}_${i}.txt`;
            const captionRequest = new XMLHttpRequest();
            captionRequest.open('GET', captionPath, false);
            captionRequest.send();
            if (captionRequest.status === 200) {
              image.setCaption(captionRequest.responseText);
              imageCaptions.push(captionRequest.responseText);
            } else {
              image.setCaption('');
              imageCaptions.push('');
            }
            i++;
          } else {
            imageFound = false;
          }
        }
      }
  
      const descriptionPath = `./${folderName}/${folderName}.txt`;
      const descriptionRequest = new XMLHttpRequest();
      descriptionRequest.open('GET', descriptionPath, false);
      descriptionRequest.send();
      const description = (descriptionRequest.status === 200) ? descriptionRequest.responseText : '';
  
      const project = new Project(folderName, description, images);
      for (let j = 0; j < images.length; j++) {
        if (images[j].endsWith('.jpg')) {
          project.setImageCaption(j, imageCaptions[j]);
        }
      }
  
      return project;
    }
  
    setImageCaption(index, caption) {
      if (index < 0 || index >= this.images.length) {
        return;
      }
      this.images[index] = {
        path: this.images[index],
        caption: caption
      };
    }
  }
  