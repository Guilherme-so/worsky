<?php

echo "aaaiaaaaa"; die;
  $git = trim(shell_exec('which git'));
  $yarn = trim(shell_exec('which yarn'));

  $result = "Preparing to deploy..." . PHP_EOL;
  $commands = [
    ['git pull', $git.' pull origin master 2>&1'],
//     ['remove build', 'rm -rf ./build'],
    ['build react', $yarn.' build'],
    ['copy rules', 'cp ./.htaccess build/'],
  ];

  foreach ($commands as $cmd)
  {
    $result .= "~$ " . $cmd[0] . "" . PHP_EOL ;
    $result .= shell_exec($cmd[1]);
    $result .= PHP_EOL . PHP_EOL ;
  }

  $result .= ">>> Finished successfully!";

  return "<pre>".$result."</pre>";
