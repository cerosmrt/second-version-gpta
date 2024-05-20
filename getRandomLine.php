<?php
    $files = glob('void/*.{txt}', GLOB_BRACE);
    $allLines = [];
    foreach ($files as $file) {
        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $allLines = array_merge($allLines, $lines);
    }
    if (!empty($allLines)) {
        $randomLine = $allLines[array_rand($allLines)];
        echo $randomLine;
    } else {
        echo "No lines found in any file.";
    }
?>