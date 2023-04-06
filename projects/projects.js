//this js file is responcable for making all the projects and adding them to the project array
const assert = require('assert');
const fs = require('fs');

function getFileStructure(dir) {
  let files = fs.readdirSync(dir);
  let fileStructure = {};
  for (let file of files) {
    let path = `${dir}/${file}`;
    let stats = fs.statSync(path);
    if (stats.isDirectory()) {
      fileStructure[file] = getFileStructure(path);
    } else {
      fileStructure[file] = stats.size;
    }
  }
  return fileStructure;
}

describe('getFileStructure', function() {
  it('should return the correct file structure', function() {
    let fileStructure = getFileStructure('./test-folder');
    assert.deepEqual(fileStructure, {
      'file.txt': 5,
      'sub-folder': {
        'file2.txt': 7,
        'sub-sub-folder': {
          'file3.txt': 9
        }
      }
    });
  });
});

