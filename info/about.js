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
  const aboutMeSection = document.getElementById('about_me');

  const nameHeading = document.createElement('name_heading');
  nameHeading.textContent = `${aboutMeInfo.name_first} ${aboutMeInfo.name_last}`;
  aboutMeSection.appendChild(nameHeading);
  
  const educationParagraph = document.createElement('education_paragraph');
  educationParagraph.textContent = `education: ${aboutMeInfo.education}`;
  aboutMeSection.appendChild(educationParagraph);
  
  const bioParagraph = document.createElement('bio_paragraph');
  bioParagraph.textContent = aboutMeInfo.bio;
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
