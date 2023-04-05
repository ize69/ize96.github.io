async function createFileTree(dir) {
    try {
      const response = await fetch(`http://localhost:8000/${dir}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let files;
      if (Array.isArray(response)) {
        files = response;
      } else {
        // Handle HTML response
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        files = Array.from(doc.querySelectorAll('ul li a')).map((a) => ({
          name: a.textContent,
          isFile: !a.href.endsWith('/'),
        }));
      }
      const fileTree = {};
      for (const file of files) {
        if (file.isFile) {
          const [filename, extension] = file.name.split('.');
          if (extension === 'txt') {
            const [projectFolder, ...rest] = dir.split('/');
            const projectId = projectFolder.split('_')[1];
            const fileUrl = `./${projectFolder}/${filename}.txt`;
            if (filename === projectId) {
              fileTree['description'] = fileUrl;
            } else {
              const imageIndex = parseInt(filename.split('_')[1]);
              if (!Array.isArray(fileTree['images'])) {
                fileTree['images'] = [];
              }
              fileTree['images'][imageIndex] = fileUrl;
            }
          }
        } else {
          const subdir = `${dir}/${file.name}`;
          fileTree[file.name] = await createFileTree(subdir);
        }
      }
      return fileTree;
    } catch (error) {
      console.error(`Error creating file tree: ${error.message}`);
    }
  }
  
  export { createFileTree };
  