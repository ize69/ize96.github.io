//variables
const file_path = "info/about.txt";

// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Define a callback function to handle the response
xhr.onload = function() {
  if (xhr.status === 200) {
    // Split the text data into an array of lines
    const lines = xhr.responseText.split('\n');

    // Create an empty object to store the about me information
    const aboutMeInfo = {};

    // Loop through each line of the text file
    lines.forEach(line => {
      // Split each line into an array containing the key and value
      const [key, value] = line.split(': ');
      console.debug(`Key: ${key}, Value: ${value}`)
      //remove the quotes from the start and end of the strings
      aboutMeInfo[key] = value.replace(/^"(.*)"$/, '$1');
      // Add the key-value pair to the aboutMeInfo object
      aboutMeInfo[key] = value;
    });

    // Select the about_me section in the HTML
    const aboutMeSection = document.getElementById('about_me');

    // Create a new heading element to display the name
    const nameHeading = document.createElement('h2');
    nameHeading.textContent = `${aboutMeInfo.name_first} ${aboutMeInfo.name_last}`;

    // Append the name heading element to the about_me section
    aboutMeSection.appendChild(nameHeading);

    // Create a new paragraph element to display the education status
    const educationParagraph = document.createElement('p');
    educationParagraph.textContent = `Education: ${aboutMeInfo.education}`;

    // Append the education paragraph element to the about_me section
    aboutMeSection.appendChild(educationParagraph);

    // Create a new paragraph element to display the bio text
    const bioParagraph = document.createElement('p');
    bioParagraph.textContent = aboutMeInfo.bio;

    // Append the bio paragraph element to the about_me section
    aboutMeSection.appendChild(bioParagraph);

    console.debug(aboutMeInfo);
  } else {
    console.error(`Error retrieving ${file_path}: ${xhr.status}`);
  }
};

// Send the request to retrieve the file
xhr.open('GET', file_path);
xhr.send();
