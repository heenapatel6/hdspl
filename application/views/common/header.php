<?php $base_url = base_url(); ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>HDSPL</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <meta content="" name="keywords">
        <meta content="" name="description">
        <?php $this->load->view('common/css_links'); ?>
        <?php $this->load->view('common/validation_message'); ?>
        <script type = "text/javascript">
            var VALUE_ZERO = <?php echo VALUE_ZERO; ?>;
            var VALUE_ONE = <?php echo VALUE_ONE; ?>;
            var VALUE_TWO = <?php echo VALUE_TWO; ?>;
            var VALUE_THREE = <?php echo VALUE_THREE; ?>;
            var VALUE_FOUR = <?php echo VALUE_FOUR; ?>;
            var VALUE_FIVE = <?php echo VALUE_FIVE; ?>;
            var VALUE_SIX = <?php echo VALUE_SIX; ?>;
            var VALUE_SEVEN = <?php echo VALUE_SEVEN; ?>;
            var VALUE_EIGHT = <?php echo VALUE_EIGHT; ?>;
            var VALUE_NINE = <?php echo VALUE_NINE; ?>;
            var VALUE_TEN = <?php echo VALUE_TEN; ?>;
            
            var ottsArray = <?php echo json_encode($this->config->item('otts_array')); ?>;
            var planDurationArray = <?php echo json_encode($this->config->item('plan_duration_array')); ?>;
        </script>
    </head>
    <body>

        <!-- Spinner Start -->
        <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->
        <?php $this->load->view('common/menu'); ?>