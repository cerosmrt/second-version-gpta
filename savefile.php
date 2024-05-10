<?php
    // Get the file name and line from the query parameters
    $file = $_GET['file'];
    $line = $_GET['line'];

    // Open the file in append mode, or create it if it doesn't exist
    $fileHandle = fopen($file, 'a');

    // Write the line to the file, followed by a newline
    fwrite($fileHandle, $line . "\n");

    // Close the file
    fclose($fileHandle);
?>