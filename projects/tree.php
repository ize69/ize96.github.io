<?php

function listFiles($dir) {
    $files = scandir($dir);

    // Remove . and .. directories
    $files = array_diff($files, array('.', '..'));

    // Iterate over files and directories
    foreach ($files as $file) {
        $path = $dir . '/' . $file;
        if (is_dir($path)) {
            // If file is a directory, call the function recursively
            echo '<li>' . $file . '</li>';
            echo '<ul>';
            listFiles($path);
            echo '</ul>';
        } else {
            // If file is a regular file, print the filename
            echo '<li>' . $file . '</li>';
        }
    }
}

// Example usage: list all files in the directory '/var/www/html'
echo '<ul>';
listFiles('/var/www/html');
echo '</ul>';

?>
