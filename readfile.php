<?php
$file = $_GET['file'];
$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
echo $lines[array_rand($lines)];
?>