<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Utility_model extends CI_Model {

    function get_by_id($id, $compare_id, $table_name, $second_id = NULL, $second_value = NULL, $order_by_id = NULL, $order_by = NULL) {
        $this->db->where($id, $compare_id);
        if ($second_id != NULL && $second_value != NULL) {
            $this->db->where($second_id, $second_value);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by($order_by_id, $order_by);
        }
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_by_id_for_copy($module_type, $column_name, $column_value, $join_table_id, $join_table_name) {
        if ($module_type == VALUE_TWENTYTHREE || $module_type == VALUE_TWENTYFOUR) {
            $this->db->select("m.$join_table_id, m.district, m.application_number, m.status, m.status_datetime, "
                    . "CONCAT(m.applicant_name,' ',m.father_name,' ',m.surname) AS applicant_name, m.mobile_number, "
                    . "m.ld_area_type, m.ld_village_sc AS village, fld.survey, fld.subdiv, fc.*");
        } else {
            $this->db->select("m.$join_table_id, m.district, m.application_number, m.status, m.status_datetime, "
                    . "CONCAT(m.applicant_name,' ',m.father_name,' ',m.surname) AS applicant_name, m.mobile_number, "
                    . "m.village, fld.survey, fld.subdiv, fc.*");
        }
        $this->db->where("fc.$column_name", $column_value);
        $this->db->where('fc.is_delete !=' . IS_DELETE);
        $this->db->from('form_copy AS fc');
        $this->db->join("$join_table_name AS m", "fc.module_id=m.$join_table_id AND m.status=" . VALUE_FIVE);
        $this->db->join('form_land_details AS fld', 'fld.form_land_details_id = fc.form_land_details_id');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function get_by_id_multiple($id, $compare_id, $table_name, $second_id = NULL, $second_value = NULL, $third_id = NULL, $third_value = NULL, $fourth_id = NULL, $fourth_value = '') {
        $this->db->where($id, $compare_id);
        if ($second_id != NULL && $second_value != NULL) {
            $this->db->where($second_id, $second_value);
        }
        if ($third_id != NULL && $third_value != NULL) {
            $this->db->where($third_id, $third_value);
        }
        if ($fourth_id != NULL && $fourth_value != '') {
            $this->db->where($fourth_id, $fourth_value);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        $resc = $this->db->get();
        return $resc->row_array();
    }

    function insert_data($table_name, $table_data) {
        $this->db->insert($table_name, $table_data);
        return $this->db->insert_id();
    }

    function insert_data_batch($table_name, $table_data) {
        $this->db->insert_batch($table_name, $table_data);
    }

    function update_data($id, $id_value, $table_name, $table_data, $where_id = NULL, $where_id_text = NULL) {
        $this->db->where($id, $id_value);
        if ($where_id != NULL && $where_id_text != NULL) {
            $this->db->where($where_id, $where_id_text);
        }
        $this->db->update($table_name, $table_data);
    }

    function update_data_not_in($id, $id_value, $id2, $ids2, $table_name, $table_data, $where_id = NULL, $where_id_text = NULL) {
        $this->db->where($id, $id_value);
        if (!empty($ids2)) {
            $this->db->where_not_in($id2, $ids2);
        }
        if ($where_id != NULL && $where_id_text != NULL) {
            $this->db->where($where_id, $where_id_text);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->update($table_name, $table_data);
    }

    function update_data_batch($id, $table_name, $table_data) {
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->update_batch($table_name, $table_data, $id);
    }

    function get_result_data($table_name, $order_by_id = NULL, $order_by = NULL) {
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by($order_by_id, $order_by);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_result_data_by_id($id_text, $id, $table_name, $id_text2 = NULL, $id2 = NULL, $order_by_id = NULL, $order_by = NULL) {
        $this->db->where($id_text, $id);
        if ($id_text2 != NULL && $id2 != NULL) {
            $this->db->where($id_text2, $id2);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by($order_by_id, $order_by);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_result_data_by_ids($id_text, $ids, $table_name, $id_text2 = NULL, $id2 = NULL, $id_text3 = NULL, $id3 = NULL) {
        $this->db->where_in($id_text, $ids);
        if ($id_text2 != NULL && $id2 != NULL) {
            $this->db->where($id_text2, $id2);
        }
        if ($id_text3 != NULL && $id3 != NULL) {
            $this->db->where($id_text3, $id3);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_result_by_id($column, $column_value, $table_name, $sec_column = NULL, $sec_value = NULL, $third_column = NULL, $third_value = NULL, $is_sort_field = NULL) {
        $this->db->where($column, $column_value);
        if ($sec_column != NULL && $sec_value != NULL) {
            $this->db->where($sec_column, $sec_value);
        }
        if ($third_column != NULL && $third_value != NULL) {
            $this->db->where($third_column, $third_value);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        if ($is_sort_field != NULL) {
            $this->db->order_by($is_sort_field);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_result_data_by_id_multiple($id_text, $id, $table_name, $second_id = NULL, $second_value = NULL, $third_id = NULL, $third_value = NULL, $fourth_id = NULL, $fourth_value = '') {
        $this->db->where($id_text, $id);
        if ($second_id != NULL && $second_value != NULL) {
            $this->db->where($second_id, $second_value);
        }
        if ($third_id != NULL && $third_value != NULL) {
            $this->db->where($third_id, $third_value);
        }
        if ($fourth_id != NULL && $fourth_value != '') {
            $this->db->where($fourth_id, $fourth_value);
        }
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->from($table_name);
        $resc = $this->db->get();
        return $resc->result_array();
    }

    

    function upload_document($field_name, $folder_name, $replace_name, $db_name) {
        if (!isset($_FILES[$field_name]['name'])) {
            echo json_encode(array('success' => FALSE, 'message' => UPLOAD_DOC_MESSAGE));
            return false;
        }
        if ($_FILES[$field_name]['name'] == '') {
            echo json_encode(array('success' => FALSE, 'message' => UPLOAD_DOC_MESSAGE));
            return false;
        }
        $evidence_size = $_FILES[$field_name]['size'];
        if ($evidence_size == 0) {
            echo json_encode(array('success' => FALSE, 'message' => DOC_INVALID_SIZE_MESSAGE));
            return false;
        }
//        $maxsize = '20971520';
//        if ($evidence_size >= $maxsize) {
//            echo json_encode(array('success' => FALSE, 'message' => UPLOAD_MAX_ONE_MB_MESSAGE));
//            return false;
//        }
        $documents_path = 'documents';
        if (!is_dir($documents_path)) {
            mkdir($documents_path);
            chmod($documents_path, 0777);
        }
        $module_path = $documents_path . DIRECTORY_SEPARATOR . $folder_name;
        if (!is_dir($module_path)) {
            mkdir($module_path);
            chmod($module_path, 0777);
        }
        $this->load->library('upload');
        $temp_filename = str_replace(' ', '_', $_FILES[$field_name]['name']);
        $filename = "$replace_name" . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
        //Change file name
        $final_path = $module_path . DIRECTORY_SEPARATOR . $filename;
        if (!move_uploaded_file($_FILES[$field_name]['tmp_name'], $final_path)) {
            echo json_encode(array('success' => FALSE, 'message' => DOCUMENT_NOT_UPLOAD_MESSAGE));
            return false;
        }
        $document_data = array();
        $document_data[$db_name] = $filename;
        return $document_data;
    }

    function upload_multiple_document($field_name, $folder_name, $replace_name, $db_name) {

        $temp_files_to_merge = array();
        $temp_files_to_remove = array();

        if (!empty($_FILES[$field_name]['name'])) {

            $main_path = "documents/$folder_name";
            $documents_path = 'documents';
            if (!is_dir($documents_path)) {
                mkdir($documents_path, 0777, true);
            }
            $temp_documents_path = $documents_path . DIRECTORY_SEPARATOR . 'temp';
            if (!is_dir($temp_documents_path)) {
                mkdir($temp_documents_path, 0777, true);
            }

            $evidence_size = $_FILES[$field_name]['size'];
            if ($evidence_size == 0) {
                echo json_encode(array('success' => FALSE, 'message' => DOC_INVALID_SIZE_MESSAGE));
                return;
            }
            $this->load->library('upload');

            $total_count = count($_FILES[$field_name]['name']);
            for ($i = 0; $i < $total_count; $i++) {
                $new_qd_path = $_FILES[$field_name]['tmp_name'][$i];
                if ($new_qd_path != "") {
                    $temp_new_filename = str_replace(' ', '_', $_FILES[$field_name]['name'][$i]);
                    $newFilePath = $temp_documents_path . '/' . $temp_new_filename;
                    if (move_uploaded_file($new_qd_path, $newFilePath)) {
                        $new_aqd_path = $temp_documents_path . '/' . $temp_new_filename;
                        $temp_files_to_merge[] = $new_aqd_path;
                        $temp_files_to_remove[] = $new_aqd_path;
                    } else {
                        echo json_encode(array('success' => FALSE, 'message' => DOCUMENT_NOT_UPLOAD_MESSAGE));
                        return;
                    }
                }
            }

            $final_filename = 'multi_doc_merge' . rand(111111111, 99999999) . '_' . time() . '.pdf';
            $temp_ffp = $temp_documents_path . '/' . $final_filename;
            $final_filepath = FCPATH . $temp_ffp;
            merge_pdf($final_filepath, $temp_files_to_merge);

            $temp_filename = str_replace(' ', '_', $final_filepath);
            $filename = $replace_name . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
            //Change file name
            $final_path = $main_path . DIRECTORY_SEPARATOR . $filename;
            $this->_copy_file(FCPATH . $temp_documents_path . '/', $final_filename, $folder_name);
            $document_data[$db_name] = $final_filename;

            array_push($temp_files_to_remove, $temp_ffp);
            if (!empty($temp_files_to_remove)) {
                foreach ($temp_files_to_remove as $key => $file) {
                    if (file_exists($file)) {
                        unlink($file);
                    }
                }
            }
            return $document_data;
        }
    }

    function _copy_file($doc_path, $ex_file_name, $folder_name) {
        $old = $doc_path . $ex_file_name;
        $new = 'documents/' . $folder_name . '/' . $ex_file_name;
        copy($old, $new);
        return $new;
    }

    

    function get_name_result_data($field_name, $field_value, $table_name, $order_by_id = NULL, $order_by = NULL) {
        $this->db->where('is_delete !=' . IS_DELETE);
        $this->db->where($field_name, $field_value);
        $this->db->from($table_name);
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by($order_by_id, $order_by);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    

    function get_result_data_with_actioner_details($id_text, $id, $table_name, $id_text2 = NULL, $id2 = NULL, $order_by_id = NULL, $order_by = NULL, $id_text3 = NULL, $id3 = NULL, $id_text4 = NULL, $id4 = NULL) {
        $this->db->select('r.*, sau.name AS actioner_user_name');
        $this->db->where("r.$id_text", $id);
        if ($id_text2 != NULL && $id2 != NULL) {
            $this->db->where("r.$id_text2", $id2);
        }
        if ($id_text3 != NULL && $id3 != NULL) {
            $this->db->where($id_text3, $id3);
        }
        if ($id_text4 != NULL && $id4 != NULL) {
            $this->db->where($id_text4, $id4);
        }
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->from("$table_name AS r");
        $this->db->join('sa_users as sau', 'sau.sa_user_id = r.updated_by', 'left');
        if ($order_by_id != NULL && $order_by != NULL) {
            $this->db->order_by("r.$order_by_id", $order_by);
        }
        $resc = $this->db->get();
        return $resc->result_array();
    }

    function get_by_id_data_with_user_details($qm_data, $id, $module_type, $id_text2 = NULL, $id2 = NULL, $id_text3 = NULL, $id3 = NULL) {
        //Note: Temporary Solution For Mobile Number
        $id_text = $qm_data['key_id_text'];
        $id_mob_no = isset($qm_data['mob_no']) ? $qm_data['mob_no'] : '';
        if ($module_type == VALUE_ONE || $module_type == VALUE_TEN || $module_type == VALUE_TWELVE) {
            $this->db->select('r.application_number, u.user_id, u.email AS user_email' . ($id_mob_no != '' ? ', r.' . $id_mob_no : ''));
        } else {
            $this->db->select('r.application_number, r.email AS applicant_email, u.user_id, u.email AS user_email' . ($id_mob_no != '' ? ', r.' . $id_mob_no : ''));
        }

        $this->db->where("r.$id_text", $id);
        if ($id_text2 != NULL && $id2 != NULL) {
            $this->db->where("r.$id_text2", $id2);
        }
        if ($id_text3 != NULL && $id3 != NULL) {
            $this->db->where($id_text3, $id3);
        }
        $this->db->where('r.is_delete !=' . IS_DELETE);
        $this->db->from($qm_data['tbl_text'] . ' AS r');
        $this->db->join('users as u', 'u.user_id = r.user_id', 'left');
        $resc = $this->db->get();
        return $resc->row_array();
    }

    

    function upload_five_mb_document($field_name, $folder_name, $replace_name, $db_name) {
        if (!isset($_FILES[$field_name]['name'])) {
            echo json_encode(array('success' => FALSE, 'message' => UPLOAD_DOC_MESSAGE));
            return false;
        }
        if ($_FILES[$field_name]['name'] == '') {
            echo json_encode(array('success' => FALSE, 'message' => UPLOAD_DOC_MESSAGE));
            return false;
        }
        $evidence_size = $_FILES[$field_name]['size'];
        if ($evidence_size == 0) {
            echo json_encode(array('success' => FALSE, 'message' => DOC_INVALID_SIZE_MESSAGE));
            return false;
        }
        $maxsize = '52428800';
        if ($evidence_size >= $maxsize) {
            echo json_encode(array('success' => FALSE, 'message' => UPLOAD_MAX_FIVE_MB_MESSAGE));
            return;
        }
        $documents_path = 'documents';
        if (!is_dir($documents_path)) {
            mkdir($documents_path);
            chmod($documents_path, 0777);
        }
        $module_path = $documents_path . DIRECTORY_SEPARATOR . $folder_name;
        if (!is_dir($module_path)) {
            mkdir($module_path);
            chmod($module_path, 0777);
        }
        $this->load->library('upload');
        $temp_filename = str_replace(' ', '_', $_FILES[$field_name]['name']);
        $filename = "$replace_name" . (rand(100000000, 999999999)) . time() . '.' . pathinfo($temp_filename, PATHINFO_EXTENSION);
        //Change file name
        $final_path = $module_path . DIRECTORY_SEPARATOR . $filename;
        if (!move_uploaded_file($_FILES[$field_name]['tmp_name'], $final_path)) {
            echo json_encode(array('success' => FALSE, 'message' => DOCUMENT_NOT_UPLOAD_MESSAGE));
            return false;
        }
        $document_data = array();
        $document_data[$db_name] = $filename;
        return $document_data;
    }

   
}

/*
 * EOF: ./application/models/Utility_model.php
 */