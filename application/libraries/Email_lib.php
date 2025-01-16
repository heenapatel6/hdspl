<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Email_lib {

    var $CI;

    public function __construct() {
        $this->CI = & get_instance();
    }

    function send_email($user_data, $subject, $message, $email_type, $module_type = VALUE_ZERO, $module_id = VALUE_ZERO) {
 //       return false;
        $this->CI->load->library('email');
//        $config = array();
//        $config['protocol'] = "smtp"; // you can use 'mail' instead of 'sendmail or smtp'
//        $config['smtp_host'] = "smtp.googlemail.com"; // you can use 'smtp.googlemail.com' or 'smtp.gmail.com' instead of 'ssl://smtp.googlemail.com'
//        $config['smtp_user'] = "br140819@gmail.com"; // client email gmail id
//        $config['smtp_pass'] = "123admin@#123"; // client password
//        $config['smtp_port'] = 465;
//        $config['smtp_crypto'] = 'ssl';
//        $config['mailtype'] = "html";
//        $config['charset'] = "iso-8859-1";
//        $config['newline'] = "\r\n";
//        $config['wordwrap'] = TRUE;
//        $config['validate'] = FALSE;
//        $this->CI->load->library('email', $config);

        $this->CI->email->to(trim($user_data['email']));
        $this->CI->email->from(FROM_EMAIL, FROM_NAME);
        $this->CI->email->subject($subject);
        $this->CI->email->message($message);
        $this->CI->email->set_mailtype("html");
        $email_log = array();
        if (!$this->CI->email->send()) {
            $email_log['status'] = 'fail';
            $email_log['message'] = $this->CI->email->print_debugger();
        } else {
            $email_log['status'] = 'success';
        }
        if ($module_type != VALUE_ZERO && $module_id != VALUE_ZERO) {
            $email_log['module_type'] = $module_type;
            $email_log['module_id'] = $module_id;
        }
        $email_log['email'] = trim($user_data['email']);
        $email_log['email_type'] = $email_type;
        $email_log['created_by'] = VALUE_ONE;
        $email_log['created_time'] = date('Y-m-d H:i:s');
        $this->CI->load->model('utility_model');
        $this->CI->utility_model->insert_data('logs_email', $email_log);
    }

}

/**
 * EOF: ./application/libraries/Email_lib.php
 */
