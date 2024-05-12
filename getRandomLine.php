<?php
// Get the list of files
$files = glob('void/*');

// Select a random file
$file = $files[array_rand($files)];

// Read the file
$lines = file($file);

// Select a random line
$line = $lines[array_rand($lines)];

// Return the line
echo $line;
?>