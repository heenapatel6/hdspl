<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Contact extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    function send_contact() {
        try {
            $contact_data = $this->_get_post_data_for_contact();
            $validation_message = $this->_check_validation_for_contact($contact_data);
            if ($validation_message != '') {
                echo json_encode(get_error_array($validation_message));
                return false;
            }
//            $this->load->model('utility_model');
//            $this->db->trans_start();
//            $exi_mob_data = $this->utility_model->get_by_id('mobile_number', $contact_data['mobile_number'], 'users');
//            if (!empty($exi_mob_data)) {
//                echo json_encode(get_error_array(EXISTS_MOBILE_NUMBER_MESSAGE));
//                return false;
//            }
//            $exi_email_data = $this->utility_model->get_by_id('email', $contact_data['email'], 'users');
//            if (!empty($exi_email_data)) {
//                echo json_encode(get_error_array(EXISTS_EMAIL_MESSAGE));
//                return false;
//            }
//            $contact_data['password'] = encrypt($contact_data['password']);
//            $contact_data['is_active'] = VALUE_ZERO;
//            $contact_data['is_npp'] = VALUE_ONE;
//            $contact_data['created_by'] = 0;
//            $contact_data['created_time'] = date('Y-m-d H:i:s');
//            $contact_data['temp_access_token'] = generate_token(5);
//            $contact_data['user_id'] = $this->utility_model->insert_data('users', $contact_data);
//            $this->db->trans_complete();
//            if ($this->db->trans_status() === FALSE) {
//                echo json_encode(get_error_array(DATABASE_ERROR_MESSAGE));
//                return;
//            }
            $link = base_url();
            $contact_message = 'Name : '.$contact_data['name'].'<br> Email Id : '.$contact_data['email'].'<br> Subject : '.$contact_data['subject'].'<br> Message : '.$contact_data['message'];
            //$this->load->helper('sms_helper');'
            //send_SMS($this, $contact_data['user_id'], $contact_data['mobile_number'], VALUE_ONE, VALUE_ZERO, VALUE_ZERO, $contact_data['temp_access_token']);
            $message = 'You have successfully submitted your contact details.';
            $this->load->library('email_lib');
            $this->email_lib->send_email($contact_data, 'Contact Enquery', $contact_message, VALUE_ONE);
//            $this->email_lib->sendMail();
            $success_array = get_success_array();
            $success_array['message'] = $message;
            echo json_encode($success_array);
        } catch (\Exception $e) {
            echo json_encode(get_error_array($e->getMessage()));
            return false;
        }
    }

    function _get_post_data_for_contact() {
        $contact_data = array();
        $contact_data['name'] = get_from_post('name_for_contact');
        $contact_data['email'] = get_from_post('email_for_contact');
        $contact_data['subject'] = get_from_post('subject_for_contact');
        $contact_data['message'] = get_from_post('message_for_contact');
        return $contact_data;
    }

    function _check_validation_for_contact($contact_data) {
        if (!$contact_data['name']) {
            return NAME_MESSAGE;
        }
        if (!$contact_data['email']) {
            return EMAIL_MESSAGE;
        }
        if (!$contact_data['email'] || !filter_var($contact_data['email'], FILTER_VALIDATE_EMAIL)) {
            return INVALID_EMAIL_MESSAGE;
        }
        if (!$contact_data['subject']) {
            return SUBJECT_MESSAGE;
        }
        if (!$contact_data['message']) {
            return MSG_MESSAGE;
        }
        return '';
    }
}