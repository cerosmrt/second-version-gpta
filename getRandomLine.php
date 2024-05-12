<?php
    $files = glob('void/*.{txt}', GLOB_BRACE);
    $randomFile = $files[array_rand($files)];
    $lines = file($randomFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!empty($lines)) {
        $randomLine = $lines[array_rand($lines)];
        echo $randomLine;
    } else {
        echo "The selected file is empty or contains only empty lines.";
    }
?>