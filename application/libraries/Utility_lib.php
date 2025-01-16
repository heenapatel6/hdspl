<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Utility_lib {

    var $CI;

    public function __construct() {
        $this->CI = & get_instance();
        $this->CI->load->model('utility_model');
    }

    function send_sms_and_email_for_app_submitted($user_id, $sms_email_type, $module_type, $module_id) {
        $query_module_array = $this->CI->config->item('query_module_array');
        $qm_data = $query_module_array[$module_type] ? $query_module_array[$module_type] : array();
        if (empty($qm_data)) {
            return false;
        }
        $ex_user_data = $this->CI->utility_model->get_by_id_data_with_user_details($qm_data, $module_id, $module_type);
        $registration_message = 'Your Application Number : ' . $ex_user_data['application_number'] . ' is Submitted Successfully !';
        //Note: Temporary Solution For Mobile Number
        if (isset($qm_data['mob_no'])) {
            $mob_no = isset($ex_user_data[$qm_data['mob_no']]) ? $ex_user_data[$qm_data['mob_no']] : '';
            $this->CI->load->helper('sms_helper');
            send_SMS($this->CI, $user_id, $mob_no, VALUE_FIVE, $module_type, $module_id, $ex_user_data['application_number']);
        }
        $this->CI->load->library('email_lib');
        if ($ex_user_data['user_email']) {
            $ex_user_data['email'] = $ex_user_data['user_email'];
            $this->CI->email_lib->send_email($ex_user_data, 'Application Submitted', $registration_message, $sms_email_type, $module_type, $module_id);
        }
        if ($module_type != VALUE_ONE && $module_type != VALUE_TEN && $module_type != VALUE_TWELVE) {
            if ($ex_user_data['applicant_email']) {
                $ex_user_data['email'] = $ex_user_data['applicant_email'];
                $this->CI->email_lib->send_email($ex_user_data, 'Application Submitted', $registration_message, $sms_email_type, $module_type, $module_id);
            }
        }
    }

    function email_and_sms_for_payment_ref_number($email_data) {
        $ex_u_data = array();
        $ex_u_data['email'] = $email_data['email'];
        $ex_u_data['user_id'] = $email_data['user_id'];
        $registration_message = '<b style="text-decoration: underline;">Treansaction Details of Payment Notice Demand to a Defaulter</b><br>'
                . '<b>Payer Name : <b>' . $email_data['payer_name'] . '<br>'
                . '<b>Payers Mobile Number : </b>' . $email_data['payer_mobile_number'] . '<br>'
                . '<b>Temp Payment Reference Number  : </b>' . $email_data['temp_payment_reference_number'] . '<br>';
        $this->CI->load->library('email_lib');
        $this->CI->email_lib->send_email($ex_u_data, 'Payment Notice Demand to a Defaulter', $registration_message, '', '', '');
    }
}

/**
 * EOF: ./application/libraries/Email_lib.php
 */