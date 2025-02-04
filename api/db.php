<?php
    function getJsonData($filename) {
        $filePath = __DIR__ . '/' . $filename;
        if (file_exists($filePath)) {
            $jsonString = file_get_contents($filePath);
            return json_decode($jsonString, true) ?: [];
        }
        return [];
    }

    function saveJsonData($filename, $data) {
        $filePath = __DIR__ . '/' . $filename;
        $jsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        file_put_contents($filePath, $jsonString);
    }
    ?>
