<?php
$file = $_GET['file'];

if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // Filter out lines that only contain whitespace and reindex the array
    $lines = array_values(array_filter($lines, function($line) {
        return trim($line) !== '';
    }));

    if (!empty($lines)) {
        echo $lines[array_rand($lines)];
    }
}
?>