<?php
$base_url = base_url();
$this->load->view('common/header');
$this->load->view('security');
?>
<!-- Contact Start -->
<div class="container-fluid contact bg-light py-5">
    <div class="container py-5" id="contact_success_message_container">
        <div class="mx-auto text-center mb-5" style="max-width: 900px;margin-top: 20px;">
            <h5 class="section-title px-3">Contact Us</h5>
            <h1 class="mb-0">Contact For Any Query</h1>
        </div>
        <div class="row g-5 align-items-center">
            <div class="col-lg-4">
                <div class="bg-white rounded p-4">
                    <div class="text-center mb-4">
                        <i class="fa fa-map-marker-alt fa-3x text-primary"></i>
                        <h4 class="text-primary"><Address></Address></h4>
                        <p class="mb-0">123 ranking Street, <br> New York, USA</p>
                    </div>
                    <div class="text-center mb-4">
                        <i class="fa fa-phone-alt fa-3x text-primary mb-3"></i>
                        <h4 class="text-primary">Mobile</h4>
                        <p class="mb-0">+012 345 67890</p>
                        <p class="mb-0">+012 345 67890</p>
                    </div>

                    <div class="text-center">
                        <i class="fa fa-envelope-open fa-3x text-primary mb-3"></i>
                        <h4 class="text-primary">Email</h4>
                        <p class="mb-0">info@example.com</p>
                        <p class="mb-0">info@example.com</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <h3 class="mb-2">Send us a message</h3>
                <p class="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                <form method="post" id="contact_form" autocomplete="off">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-group form-floating">
                                <input type="text" class="form-control border-0" id="name_for_contact" name="name_for_contact" 
                                       placeholder="Your Name" onblur="checkAlphabetsBlur($(this));
                                               checkValidation('conatct', 'name_for_contact', nameValidationMessage);">
                                <label for="name">Your Name</label>
                                <span class="error-message error-message-conatct-name_for_contact"></span>
                            </div>

                        </div>
                        <div class="col-md-6">
                            <div class="form-group form-floating">
                                <input type="email" class="form-control border-0" id="email_for_contact" name="email_for_contact" 
                                       placeholder="Your Email" onblur="checkValidationForEmail('conatct', 'email_for_contact');">
                                <label for="email">Your Email</label>
                                <span class="error-message error-message-conatct-email_for_contact"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group form-floating">
                                <input type="text" class="form-control border-0" id="subject_for_contact" name="subject_for_contact" 
                                       placeholder="Subject" onblur="checkValidation('conatct', 'subject_for_contact', subjectValidationMessage);">
                                <label for="subject">Subject</label>
                                <span class="error-message error-message-conatct-subject_for_contact"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group form-floating">
                                <textarea class="form-control border-0" placeholder="Leave a message here" id="message_for_contact" name="message_for_contact" style="height: 160px"
                                          onblur="checkValidation('conatct', 'message_for_contact', messageValidationMessage);"></textarea>
                                <label for="message">Message</label>
                                <span class="error-message error-message-conatct-message_for_contact"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary w-100 py-3" type="button" id="submit_btn_for_contact"
                                    onclick="checkForContactForm($(this));" >Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Contact End -->
<?php $this->load->view('common/footer', array('base_url' => $base_url)); ?>
<script type="text/javascript">
    $('#contact_form').find('input').keypress(function (e) {
        if (e.which == 13) {
            checkForContactForm($('#submit_btn_for_contact'));
        }
    });
    function checkValidationForContact(contactFormData) {
        if (!contactFormData.name_for_contact) {
            return getBasicMessageAndFieldJSONArray('name_for_contact', nameValidationMessage);
        }
        if (!contactFormData.email_for_contact) {
            return getBasicMessageAndFieldJSONArray('email_for_contact', emailValidationMessage);
        }
        var emailIdValidationMessage = emailIdValidation(contactFormData.email_for_contact);
        if (emailIdValidationMessage != '') {
            return getBasicMessageAndFieldJSONArray('email_for_contact', emailIdValidationMessage);
        }
        if (!contactFormData.subject_for_contact) {
            return getBasicMessageAndFieldJSONArray('subject_for_contact', subjectValidationMessage);
        }
        if (!contactFormData.message_for_contact) {
            return getBasicMessageAndFieldJSONArray('message_for_contact', messageValidationMessage);
        }
        return '';
    }

    function checkForContactForm(btnObj) {
        validationMessageHide();
        var contactData = $('#contact_form').serializeFormJSON();
        var validationData = checkValidationForContact(contactData);
        if (validationData != '') {
            $('#' + validationData.field).focus();
            validationMessageShow('contact-' + validationData.field, validationData.message);
            return false;
        }

        var ogBtnHTML = btnObj.html();
        var ogBtnOnclick = btnObj.attr('onclick');
        btnObj.html('Processing..');
        btnObj.attr('onclick', '');
        $.ajax({
            type: 'POST',
            url: 'contact/send_contact',
            data: contactData,
            error: function (textStatus, errorThrown) {
                //generateNewCSRFToken();
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                validationMessageShow('contact', textStatus.statusText);
                $('html, body').animate({scrollTop: '0px'}, 0);
            },
            success: function (data) {
                var parseData = JSON.parse(data);
                //setNewToken(parseData.temp_token);
                if (parseData.success == false) {
                    btnObj.html(ogBtnHTML);
                    btnObj.attr('onclick', ogBtnOnclick);
                    validationMessageShow('contact', parseData.message);
                    $('html, body').animate({scrollTop: '0px'}, 0);
                    return false;
                }
                $('#contact_success_message_container').html(parseData.message);
            }
        });
    }
</script>
