<?php
    include 'db.php';
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $buyFilename = 'buy.json';
    $sellFilename = 'sell.json';
    $daysToDelete = 15; // 15 günden eski emirleri sil

    // Eski emirleri sil
    deleteOldOrders($buyFilename, $daysToDelete);
    deleteOldOrders($sellFilename, $daysToDelete);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $buyOrders = getJsonData($buyFilename);
        $sellOrders = getJsonData($sellFilename);

        // Birleştirilmiş siparişleri oluşturma
        $orders = array_merge($buyOrders, $sellOrders);

        // Oluşturulma tarihine göre sıralama (en son eklenen en başta)
        usort($orders, function($a, $b) {
            return strtotime($b['createdAt']) - strtotime($a['createdAt']);
        });

        // En fazla 5 emir gösterme
        $orders = array_slice($orders, 0, 5);

        echo json_encode($orders);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $telegramUsername = $data['telegramUsername'];
        $orderType = $data['type'];
        $amount = $data['amount'];
        $price = $data['price'];

        $filename = ($orderType === 'buy') ? $buyFilename : $sellFilename;
        $orders = getJsonData($filename);

        $newOrder = [
            'id' => uniqid(),
            'telegramUsername' => $telegramUsername,
            'type' => $orderType,
            'amount' => $amount,
            'price' => $price,
            'createdAt' => date('Y-m-d H:i:s')
        ];

        $orders[] = $newOrder;
        saveJsonData($filename, $orders);

        echo json_encode(['message' => 'Order created successfully']);
    }

    function getJsonData($filename) {
        $filePath = __DIR__ . '/' . $filename;
        error_log("getJsonData: filePath = " . $filePath);
        if (file_exists($filePath)) {
            $jsonString = file_get_contents($filePath);
            if ($jsonString === false) {
                error_log("Failed to read file: " . $filePath);
                return [];
            }
            $data = json_decode($jsonString, true);
            if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
                error_log("JSON decode error: " . json_last_error_msg() . " in file: " . $filePath . " jsonString: " . $jsonString);
                return [];
            }
            error_log("getJsonData: data = " . json_encode($data));
            return $data ?: [];
        }
        error_log("File not found: " . $filePath);
        return [];
    }

    function saveJsonData($filename, $data) {
        $filePath = __DIR__ . '/' . $filename;
        $jsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        if ($jsonString === false) {
            error_log("JSON encode error: " . json_last_error_msg() . " in file: " . $filePath);
            return;
        }
        $result = file_put_contents($filePath, $jsonString, LOCK_EX);
        if ($result === false) {
            error_log("Failed to write to file: " . $filePath);
        }
    }

    function deleteOldOrders($filename, $days) {
        $filePath = __DIR__ . '/' . $filename;
        $orders = getJsonData($filePath);
        $cutoffTimestamp = strtotime("-" . $days . " days");

        $newOrders = array_filter($orders, function($order) use ($cutoffTimestamp) {
            return strtotime($order['createdAt']) > $cutoffTimestamp;
        });

        saveJsonData($filename, array_values($newOrders));
    }
    ?>
