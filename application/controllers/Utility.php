<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Utility extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('utility_model');
    }

    function new_token_for_api() {
        echo api_encryption(time() . API_ACCESS_KEY);
    }

    function generate_new_token() {
        if (!is_post()) {
            echo json_encode(get_error_array(INVALID_ACCESS_MESSAGE));
            return false;
        }
        echo json_encode(get_success_array());
    }
}
