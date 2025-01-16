<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    public function index() {
        $this->load->view('common/header');
        $this->load->model('utility_model');
        $services_data = array();
        $services_data = $this->utility_model->get_result_data('plans');
        $this->load->view('home', array('services_data' => $services_data));
        $this->load->view('common/footer');
    }

    public function about() {
        $this->load->view('about');
    }

    public function services() {
        $this->load->model('utility_model');
        $services_data = array();
        $services_data = $this->utility_model->get_result_data('plans');
        $this->load->view('services', array('services_data' => $services_data));
    }

    public function contact() {
        $this->load->view('contact');
    }
    public function request() {
        $this->load->view('request');
    }
}
