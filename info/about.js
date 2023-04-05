const file_path = "info/about.txt";

function get_bio() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file_path);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const aboutMeInfo = parse_git_fields(xhr.responseText);
      display_bio_info(aboutMeInfo);
    } else {
      console.error(`Error retrieving ${file_path}: ${xhr.status}`);
    }
  };
  xhr.send();
  return"";
}

function parse_git_fields(responseText) {
  const lines = responseText.split('\n');
  const aboutMeInfo = {};
  lines.forEach(line => {
    const [key, value] = line.split(': ');
    aboutMeInfo[key] = value.replace(/^"(.*)"$/, '$1');
  });
  return aboutMeInfo;
}

function display_bio_info(aboutMeInfo) {
  // All the elements get styled as if they are in a table.
  
  const aboutMeSection = document.getElementById('about_me');

  const nameHeading = document.createElement('h3');
  nameHeading.textContent = `${aboutMeInfo.name_first} ${aboutMeInfo.name_last}`;
  nameHeading.classList.add('name-heading');
  aboutMeSection.appendChild(nameHeading);
  
  const educationParagraph = document.createElement('p');
  educationParagraph.textContent = `education: ${aboutMeInfo.education}`;
  educationParagraph.classList.add('education-paragraph');
  aboutMeSection.appendChild(educationParagraph);
  
  const bioParagraph = document.createElement('p');;
  bioParagraph.textContent = aboutMeInfo.bio;
  bioParagraph.classList.add('bio-paragraph');
  aboutMeSection.appendChild(bioParagraph);  
}


function get_name(lastFirst) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file_path);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const aboutMeInfo = parse_git_fields(xhr.responseText);
      const name = lastFirst ? `${aboutMeInfo.name_last}, ${aboutMeInfo.name_first}` : `${aboutMeInfo.name_first} ${aboutMeInfo.name_last}`;
      document.getElementById('name').textContent = name;
    } else {
      console.error(`Error retrieving ${file_path}: ${xhr.status}`);
    }
  };
  xhr.send();
}
