// Select the about_me section
const aboutMeSection = document.querySelector('#about_me');

// Fetch the contents of the about_me.txt file
fetch('about_me.txt')
  .then(response => response.text())
  .then(data => {
    // Split the data into an array of lines
    const lines = data.split('\n');

    // Loop through the lines and create elements for each key-value pair
    lines.forEach(line => {
      // Split the line into key and value
      const [key, value] = line.split(': ');

      // Create a new element and add the key-value pair as text content
      const element = document.createElement('p');
      element.textContent = `${key}: ${value}`;

      // Append the new element to the about_me section
      aboutMeSection.appendChild(element);
    });
  });
