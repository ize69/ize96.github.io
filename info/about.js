//variables
const file_path = "info/about.txt";

// Create a function to get the about me information from the file
function get_bio() {
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
        //remove the quotes from the start and end of the strings only keeping all other instances of quotes
        value = value.substring(1, value.length - 1);
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
}

//get name of the portfolio owner from the about.txt file
//display the name in the element with id="name" with the optional parameter of false 
//to display the name in last name first format
function get_name(last_first) {
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (xhr.status === 200) {
      const lines = xhr.responseText.split('\n');

      const aboutMeInfo = {};

      lines.forEach(line => {
        const [key, value] = line.split(': ');
        console.debug(`Key: ${key}, Value: ${value}`)
        aboutMeInfo[key] = value.replace(/^"(.*)"$/, '$1');
      });

      if (last_first) {
        document.getElementById("name").innerHTML = aboutMeInfo.name_last + ", " + aboutMeInfo.name_first;
      }
      else {
        document.getElementById("name").innerHTML = aboutMeInfo.name_first + " " + aboutMeInfo.name_last;
      }
    } else {
      console.error(`Error retrieving ${file_path}: ${xhr.status}`);
    }
  };

  xhr.open('GET', file_path);
  xhr.send();
}