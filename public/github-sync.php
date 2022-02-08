<?php

exec('git pull && npm i && npm run build');

// if(isset($_POST)) {
// /**
//  * add crontab -- * * * * * php /var/www/github-sync.php
//  */
// $folder = __DIR__ . DIRECTORY_SEPARATOR . 'tmp' . DIRECTORY_SEPARATOR;

// // Go to miaryrabs; pull and remove files inside tmp
// $cmd = 'cd /var/www/starwars-challenge-48h/; sudo git pull origin master; sudo npm i; sudo npm run build';
// // if calling from php cli
// if (isset($argv)) {


//     // file exists inside tmp folder
//     $files = glob($folder . "*");
//     if (!empty($files)) {
//         shell_exec($cmd);
//         exit;
//     }

// }

// // if calling from webhooks
// $sInput = 'php://input';
// $json_str = file_get_contents($sInput);
// if ($json_str != '') {

//     $json = json_decode($json_str, true);

// //    print_r($json)
//     // if json >> save inside tmp folder
//     if (is_array($json)) {
//         // save request_payload inside txt
//         $f = $folder . uniqid() . '.txt';
// //        print_r($f);
//         file_put_contents($f, $json_str);

//         // mail
//         $to = 'me@gmail.com';
//         $s = 'Webhooks ';
//         $m = print_r($json, 1);
//         $h = 'From:from@me.com';
//         mail($to, $s, $m, $h);
//         exit;
//     }

// }
// } else {
// // if calling from GET
// echo "Hello Maxime";
// }