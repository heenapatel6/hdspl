<?php

define('LOGIN', 1);
define('LOGOUT', 2);
define('IS_ACTIVE', 1);
define('IS_DELETE', 1);
define('IS_CHECKED_NO', 0);
define('IS_CHECKED_YES', 1);

$config['log_type'] = array(
    LOGIN => 'Login',
    LOGOUT => 'Logout'
);
define('API_ACCESS_KEY', '%#d@3sHj7yDFKdnqw$$^qfff');
define('PASSWORD_REGEX', '/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_+\-=<>]).{8,16}$/');
define('PASSWORD_VALIDATION_MESSAGE', '1. Password must be between 8 to 16 characters long.<br>'
        . '2. Contain at least one digit and two alphabetic character.<br>'
        . '3. At least one upper case and one lower case character.<br>'
        . '4. Contain at least one special character of (!@#$%-_+<>=).');

// Logs Table
define('TBL_LOGS_LOGIN_LOGOUT', 'logs_login_details');
define('TBL_LOGS_LOGIN_LOGOUT_PRIMARY_KEY', 'logs_login_details_id');
define('TBL_LOGS_CHANGE_PASSWORD', 'logs_change_password');

define('FROM_NAME', 'HDSPL');
define('FROM_EMAIL', 'br140819@gmail.com');

define('ADMIN_PATH', 'http://localhost:90/hdspl_admin/');

define('VERSION', 'v=1.1');


define('VALUE_ZERO', 0);
define('VALUE_ONE', 1);
define('VALUE_TWO', 2);
define('VALUE_THREE', 3);
define('VALUE_FOUR', 4);
define('VALUE_FIVE', 5);
define('VALUE_SIX', 6);
define('VALUE_SEVEN', 7);
define('VALUE_EIGHT', 8);
define('VALUE_NINE', 9);
define('VALUE_TEN', 10);

$config['otts_array'] = array(
    VALUE_ONE => array(
        'name' => 'Platform One',
        'imagePath' => 'images/otts/ott_one.jpeg'  // Path to the image for VALUE_ONE
    ),
    VALUE_TWO => array(
        'name' => 'Platform Two',
        'imagePath' => 'images/otts/ott_two.jpeg'  // Path to the image for VALUE_TWO
    ),
    VALUE_THREE => array(
        'name' => 'Platform Three',
        'imagePath' => 'images/otts/ott_three.jpeg'  // Path to the image for VALUE_THREE
    ),
    VALUE_FOUR => array(
        'name' => 'Platform Four',
        'imagePath' => 'images/otts/ott_four.jpeg'  // Path to the image for VALUE_FOUR
    ),
    VALUE_FIVE => array(
        'name' => 'Platform Five',
        'imagePath' => 'images/otts/ott_five.jpeg'  // Path to the image for VALUE_FIVE
    ),
    VALUE_SIX => array(
        'name' => 'Platform Six',
        'imagePath' => 'images/otts/ott_six.jpeg'  // Path to the image for VALUE_SIX
    ),
    VALUE_SEVEN => array(
        'name' => 'Platform Seven',
        'imagePath' => 'images/otts/ott_seven.jpeg'  // Path to the image for VALUE_SEVEN
    ),
    VALUE_EIGHT => array(
        'name' => 'Platform Eight',
        'imagePath' => 'images/otts/ott_eight.jpeg'  // Path to the image for VALUE_EIGHT
    ),
    VALUE_NINE => array(
        'name' => 'Platform Nine',
        'imagePath' => 'images/otts/ott_nine.jpeg'  // Path to the image for VALUE_NINE
    ),
    VALUE_TEN => array(
        'name' => 'Platform Ten',
        'imagePath' => 'images/otts/ott_ten.jpeg'  // Path to the image for VALUE_TEN
    )
);

$config['plan_duration_array'] = array(
    VALUE_ONE => 'Monthly Plan',
    VALUE_TWO => 'Quarterly Plan',
);
