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
            echo $path . "\n";
            listFiles($path);
        }
    }
}

// Example usage: list all files in the directory '/var/www/html'
listFiles('../projects/uploads');

?>
