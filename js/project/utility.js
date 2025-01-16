(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push($.trim(this.value) || '');
            } else {
                o[this.name] = $.trim(this.value) || '';
            }
        });
        return o;
    };

})(jQuery);

function renderOptionsForTwoDimensionalArray(dataArray, comboId, addBlankOption) {
    if (!dataArray) {
        return false;
    }
    if (typeof addBlankOption === "undefined") {
        addBlankOption = true;
    }
    if (addBlankOption) {
        $('#' + comboId).html('<option value="">&nbsp;</option>');
    }
    var data = {};
    $.each(dataArray, function (index, dataObject) {
        data = {"value_field": index, 'text_field': dataObject};
        $("#" + comboId).append('<option value="' + index + '">' + dataObject + '</option>');
    });
}

function renderOptionsForStartEndValues(startValue, EndValue, comboId, addBlankOption) {
    if (typeof addBlankOption === "undefined") {
        addBlankOption = true;
    }
    if (addBlankOption) {
        $('#' + comboId).html('<option value="">&nbsp;</option>');
    }
    var data = {};
    for (var i = startValue; i <= EndValue; i++) {
        data = {"value_field": i, 'text_field': i};
        $("#" + comboId).append('<option value="' + i + '">' + i + '</option>');
    }
}

function renderOptionsForTwoDimensionalArrayFor(dataArray, comboId, message) {
    if (!dataArray) {
        return false;
    }
    $('#' + comboId).html('<option value="">Select ' + message + '</option>');
    var data = {};
    $.each(dataArray, function (index, dataObject) {
        data = {"value_field": index, 'text_field': dataObject};
        $("#" + comboId).append('<option value="' + index + '">' + dataObject + '</option>');
    });
}

function renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationFor(dataArray, comboId, keyId, valueId, valueId2, message) {
    if (!dataArray) {
        return false;
    }
    $('#' + comboId).html('<option value="">Select ' + message + '</option>');
    var textField = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined) {
            if (dataObject[valueId2]) {
                textField = dataObject[valueId] + (dataObject[valueId2] != null ? ' ( ' + dataObject[valueId2] + ' )' : '');
            } else {
                textField = dataObject[valueId];
            }
            $("#" + comboId).append('<option value="' + dataObject[keyId] + '">' + textField + '</option>');
        }
    });
}

function checkNumeric(obj) {
    if (!$.isNumeric(obj.val())) {
        obj.val("");
    }
}

function allowOnlyIntegerValue(id) {
    $('#' + id).keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
}

function loginPage() {
    window.location = baseUrl + 'login';
}

function validationMessageHide(moduleName) {
    if (typeof moduleName === "undefined") {
        $('.error-message').hide();
        $('.error-message').html('');
    } else {
        $('.error-message-' + moduleName).hide();
        $('.error-message-' + moduleName).html('');
    }
}

function validationMessageShow(moduleName, messageName) {
    $('.error-message-' + moduleName).html(messageName);
    $('.error-message-' + moduleName).show();
}

function checkValidation(moduleName, fieldName, messageName) {
    var val = $('#' + fieldName).val();
    var newFieldName = moduleName + '-' + fieldName;
    validationMessageHide(newFieldName);
    if (!val || !val.trim()) {
        validationMessageShow(newFieldName, messageName);
    }
}

function checkValidationForMobileNumber(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var mobileNumber = $('#' + id).val();
    if (!mobileNumber) {
        validationMessageShow(moduleName + '-' + id, mobileValidationMessage);
        return;
    }
    var validate = mobileNumberValidation(mobileNumber);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}

function checkValidationForMobileNumberForOnlyEnter(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var mobileNumber = $('#' + id).val();
    if (!mobileNumber) {
        return;
    }
    var validate = mobileNumberValidation(mobileNumber);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}

function mobileNumberValidation(mobileNumber) {
    var filter = /^[0-9-+]+$/;
    if (mobileNumber.length != 10 || !filter.test(mobileNumber)) {
        return invalidMobileValidationMessage;
    }
    return '';
}

function checkValidationForEmail(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var emailId = $('#' + id).val();
    if (!emailId) {
        return false;
    }
    var validate = emailIdValidation(emailId);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}

function emailIdValidation(emailId) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(emailId)) {
        return invalidEmailValidationMessage;
    }
    return '';
}

function checkPasswordValidation(moduleName, id, isNew) {
    var password = $('#' + id).val();
    if (!password) {
        validationMessageShow(moduleName + '-' + id, isNew ? newPasswordValidationMessage : passwordValidationMessage);
        return;
    }
    var regex = new RegExp(passwordRegex);
    if (!regex.test(password)) {
        validationMessageShow(moduleName + '-' + id, invalidPasswordValidationMessage);
        return;
    }
    validationMessageHide(moduleName + '-' + id);
}

function checkPasswordValidationForRetypePassword(moduleName, compareId, id) {
    var retypePassword = $('#' + compareId).val();
    if (!retypePassword) {
        validationMessageHide(moduleName + '-' + compareId);
        return;
    }
    var password = $('#' + id).val();
    if (password != retypePassword) {
        validationMessageShow(moduleName + '-' + compareId, notMatchPasswordValidationMessage);
        return;
    }
    validationMessageHide(moduleName + '-' + compareId);
}

function passwordValidation(password) {
    if (!passwordRegex.test(password)) {
        return invalidPasswordValidationMessage;
    }
    return '';
}


function aadharNumberValidation(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var aadharNumber = $('#' + id).val();
    if (!aadharNumber) {
        return;
    }
    var validate = checkUID(aadharNumber);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}


function checkUID(uid) {
    if (uid.length != 12) {
        return invalidAadharNumberValidationMessage;
    }
    var Verhoeff = {
        "d": [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]],
        "p": [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]],
        "j": [0, 4, 3, 2, 1, 5, 6, 7, 8, 9],
        "check": function (str) {
            var c = 0;
            str.replace(/\D+/g, "").split("").reverse().join("").replace(/[\d]/g, function (u, i) {
                c = Verhoeff.d[c][Verhoeff.p[i % 8][parseInt(u, 10)]];
            });
            return c;

        },
        "get": function (str) {

            var c = 0;
            str.replace(/\D+/g, "").split("").reverse().join("").replace(/[\d]/g, function (u, i) {
                c = Verhoeff.d[c][Verhoeff.p[(i + 1) % 8][parseInt(u, 10)]];
            });
            return Verhoeff.j[c];
        }
    };

    String.prototype.verhoeffCheck = (function () {
        var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
        var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];

        return function () {
            var c = 0;
            this.replace(/\D+/g, "").split("").reverse().join("").replace(/[\d]/g, function (u, i) {
                c = d[c][p[i % 8][parseInt(u, 10)]];
            });
            return (c === 0);
        };
    })();

    if (Verhoeff['check'](uid) === 0) {
        return '';
    } else {
        return invalidAadharNumberValidationMessage;
    }
}

function getBasicMessageAndFieldJSONArray(field, message) {
    var returnData = {};
    returnData['message'] = message;
    returnData['field'] = field;
    return returnData;
}

function resetForm(formId) {
    validationMessageHide();
    $('#' + formId).trigger("reset");
}

function checkAlphabets(obj) {
    obj.val(obj.val().replace(/[^a-z A-Z.]/g, ""));
    if ((event.which >= 48 && event.which <= 57)) {
        event.preventDefault();
    }
}

function checkAlphabetsBlur(obj) {
    obj.val(obj.val().replace(/[^a-z A-Z.]/g, ''));
}

function setCaptchaCode(moduleName) {
    var randomNum1 = getRandom(),
            randomNum2 = getRandom();
    var total = randomNum1 + randomNum2;
    $("#captcha_container_for_" + moduleName).html(randomNum1 + " + " + randomNum2 + " = ?");
    $('#captcha_code_for_' + moduleName).val(total);
    $('#captcha_code_verification_for_' + moduleName).val('');
}

function getRandom() {
    return Math.ceil(Math.random() * 10);
}

function countDownForOTP(btnObj) {
    var minutes = 0;
    var seconds = 59;
    function tick() {
        seconds--;
        btnObj.html("0" + minutes + ":" + (seconds < 10 ? "0" : "") + String(seconds));
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            if (minutes <= 0) {
                btnObj.html('Resend OTP');
                btnObj.attr('onclick', 'countDownForOTP($(this));');
            } else {
                minutes--;
                seconds = 59;
                btnObj.html("0" + minutes + ":" + (seconds < 10 ? "0" : "") + String(seconds));
                setTimeout(tick, 1000);
            }
        }
    }
    tick();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setDistrictInCookie(district) {
    document.cookie = 'temp_district_in_cookie=' + district;
    location.reload();
}

function basicConfigurationForCookie() {
    if (window.localStorage) {
        if (!localStorage.getItem("userAgreed")) {
            $("#cookies_alert").show();
        }
    }
    $("#cookies_alert button").on("click", function (event) {
        event.preventDefault();
        localStorage.setItem("userAgreed", true);
        $("#cookies_alert").hide();
    });

    $("#cookies_alert a.close").on("click", function (event) {
        event.preventDefault();
        $("#cookies_alert").hide();
    });
    tempDistrict = getCookie('temp_district_in_cookie');
    if (tempDistrict != VALUE_ONE && tempDistrict != VALUE_TWO && tempDistrict != VALUE_THREE) {
        setDistrictInCookie(VALUE_ONE);
    }
}

function ruralLandTax(district, urType, village, survey, subdiv) {
    window.location = baseUrl + 'rural-land-tax?d=' + getEncryptedString(district) + '&t=' + getEncryptedString(urType) + '&v=' + getEncryptedString(village) + '&s=' + getEncryptedString(unescape(encodeURIComponent(survey))) + '&sb=' + getEncryptedString(unescape(encodeURIComponent(subdiv)));
}

function goToRoRSvamitva() {
    window.location = baseUrl + 'ror-urban-svamitva';
}
function goToRoR(district, urType) {
    window.location = baseUrl + 'ror?d=' + getEncryptedString(district) + '&t=' + getEncryptedString(urType);
}
function getEncryptedString(tempString) {
    return window.btoa(window.btoa(window.btoa(window.btoa(tempString))));
}

var tagSpinnerTemplate = '<div id="tag_spinner" class="overlay-new">' +
        '<i class="fa fa-spinner fa-2x fa-spin color-nic-blue"></i></div>';

function addTagSpinner(id) {
    $('#' + id).parent().find('.error-message').before(tagSpinnerTemplate);
}

function removeTagSpinner() {
    $('#tag_spinner').remove();
}

function openFullPageOverlay() {
    document.getElementById("full_page_overlay_div").style.width = "100%";
}

function closeFullPageOverlay() {
    document.getElementById("full_page_overlay_div").style.width = "0%";
}

function showError(message) {
    toastFire('error', message);
}

function activeLink(id) {
    $('.nav-link').removeClass('active');
    addClass(id, 'active');
}

function addClass(id, className) {
    $('#' + id).addClass(className);
}

function toastFire(type, message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 10000
    });

    Toast.fire({
        type: type,
        title: '<span style="padding-left: 10px; padding-right: 10px;">' + message + '</span>',
        showCloseButton: true,
    });
}

function showConfirmation(yesEvent, message) {
    $('.swal2-popup').removeClass('p-5px');
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure You want to ' + message + ' ?',
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, ' + message + ' it !',
        cancelButtonText: 'No, Cancel !',
    }).then((result) => {
        if (result.value) {
            $('#temp_btn').attr('onclick', yesEvent);
            $('#temp_btn').click();
            $('#temp_btn').attr('onclick', '');
        }
    });
}

function showPopup() {
    const swalWithBootstrapButtons = Swal.mixin({});
    swalWithBootstrapButtons.fire({
        showCancelButton: false,
        showConfirmButton: false,
        html: '<div id="popup_container"></div>',
    });
    $('.swal2-popup').addClass('p-5px');
}

function showSuccess(message) {
    toastFire('success', message);
}

function datePicker() {
    $('.date_picker').datetimepicker({
        icons:
                {
                    up: 'fa fa-angle-up',
                    down: 'fa fa-angle-down',
                    next: 'fa fa-angle-right',
                    previous: 'fa fa-angle-left'
                },
        format: 'DD-MM-YYYY'
    });
    dateChangeEvent();
}
function datePickerId(id) {
    $('#' + id).datetimepicker({
        icons:
                {
                    up: 'fa fa-angle-up',
                    down: 'fa fa-angle-down',
                    next: 'fa fa-angle-right',
                    previous: 'fa fa-angle-left'
                },
        format: 'DD-MM-YYYY'
    });
    dateChangeEvent();
}

function datePickerMax(id) {
    $('#' + id).datetimepicker({
        icons: {
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        maxDate: date_MINUS_EIGHT()
    });
    dateChangeEvent();
}

function datePickerMaxToday(id) {
    $('#' + id).datetimepicker({
        icons: {
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        maxDate: new Date()
    });
    dateChangeEvent();
}

function datePickerSixty(id) {
    $('#' + id).datetimepicker({
        icons: {
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        maxDate: date_MINUS_SIXTY()
    });
    dateChangeEvent();
}

function datePickerMin(id) {
    $('#' + id).datetimepicker({
        // format : 'mm-dd-yyyy',

        icons: {
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },

        minDate: date_MINUS_NINE(),
        maxDate: $.now()
    });
    dateChangeEvent();
}
function datePickerToday(id) {
    $('#' + id).datetimepicker({
        icons: {
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },
        maxDate: $.now()
    });
    dateChangeEvent();
}
function datePickerEigSix(id) {
    $('#' + id).datetimepicker({
        // format : 'mm-dd-yyyy',

        icons: {
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },

        minDate: date_MINUS_SIXTY(),
        maxDate: date_MINUS_EIGHT()
    });
    dateChangeEvent();
}
function datePickerFif(id) {
    $('#' + id).datetimepicker({
        // format : 'mm-dd-yyyy',

        icons: {
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },

        minDate: date_MINUS_FIFTYNINE(),
        maxDate: date_MINUS_EIGHT()
    });
    dateChangeEvent();
}
function datePickerMinor(id) {
    $('#' + id).datetimepicker({
        // format : 'mm-dd-yyyy',

        icons: {
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            next: 'fa fa-angle-right',
            previous: 'fa fa-angle-left'
        },

        minDate: date_MINUS_EIGHT(),
        maxDate: date_MINUS_ZERO()
    });
    dateChangeEvent();
}
function datetimePicker() {
    $('.datetimepicker').datetimepicker({
        format: 'DD-MM-YYYY HH:mm'
    });
}

function timePicker() {
    $('.timepicker').datetimepicker({
        format: 'LT'
    })
}

function startDateEndDateFunctionality(startDateId, endDateId) {
    $('#' + startDateId).datetimepicker();
    $('#' + endDateId).datetimepicker({
        useCurrent: false //Important! See issue #1075
    });
    $('#' + startDateId).on("dp.change", function (e) {
        $('#' + endDateId).data("DateTimePicker").minDate(e.date);
    });
    $('#' + endDateId).on("dp.change", function (e) {
        $('#' + startDateId).data("DateTimePicker").maxDate(e.date);
    });
    dateChangeEvent();
}

function dateChangeEvent() {
    $('.date_picker').keyup(function (e) {
        e = e || window.event; //for pre-IE9 browsers, where the event isn't passed to the handler function
        if (e.keyCode == '37' || e.which == '37' || e.keyCode == '39' || e.which == '39') {
            var message = ' ' + $('.ui-state-hover').html() + ' ' + $('.ui-datepicker-month').html() + ' ' + $('.ui-datepicker-year').html();
            if ($(this).attr('id') == 'startDate') {
                $(".date_picker").val(message);
            }
        }
    });
}

var dateRenderer = function (data, type, full, meta) {
    return dateTo_DD_MM_YYYY(data);
};

var dateTimeRenderer = function (data, type, full, meta) {
    return data != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(data) : '-';
};

function dateTo_DD_MM_YYYY(date, delimeter) {
    var delim = delimeter ? delimeter : '-';
    var d = new Date(date || Date.now()),
            month = d.getMonth() + 1,
            day = '' + d.getDate(),
            year = d.getFullYear();
    if (month < 10)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join(delim);
}
function dateTo_MM_YYYY(date, delimeter) {
    var delim = delimeter ? delimeter : '-';
    var d = new Date(date || Date.now()),
            month = d.getMonth() + 1,
            day = '' + d.getDate(),
            year = d.getFullYear();
    if (month < 10)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [month, year].join(delim);
}
function date_MINUS_ZERO() {
    var d = new Date();
    d.setFullYear(d.getFullYear() - 0);
    return d;
}

function date_MINUS_EIGHT() {
    var d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d;
}

function date_MINUS_NINE() {
    var d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d;
}

function date_MINUS_SIXTY() {
    var d = new Date();
    d.setFullYear(d.getFullYear() - 60);
    return d;
}

function date_MINUS_FIFTYNINE() {
    var d = new Date();
    d.setFullYear(d.getFullYear() - 59);
    return d;
}

function dateTo_DD_MM_YYYY_HH_II_SS(date, delimeter) {
    var delim = delimeter ? delimeter : '-';
    var d = new Date(date || Date.now()),
            month = d.getMonth() + 1,
            day = '' + d.getDate(),
            year = d.getFullYear();
    if (month < 10)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return [day, month, year].join(delim) + ' ' + hours + ':' + minutes + ':' + seconds;
}

function resetModel() {
    $('#popup_modal').modal('hide');
    $('#model_title').html('');
    $('#model_body').html('');
}

var dataTableProcessingAndNoDataMsg = {
    'loadingRecords': '<span class="color-nic-blue"><i class="fas fa-spinner fa-spin fa-2x"></i></span>',
    'processing': '<span class="color-nic-blue"><i class="fas fa-spinner fa-spin fa-3x"></i></span>',
    'emptyTable': 'No Data Available !'
};

var searchableDatatable = function (settings, json) {
    this.api().columns().every(function () {
        var that = this;
        $('input', this.header()).on('keyup change clear', function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
        $('select', this.header()).on('change', function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
    });
}

function resetCounter(className) {
    var cnt = 1;
    $('.' + className).each(function () {
        $(this).html(cnt);
        cnt++;
    });
}

function returnCounter(className) {
    var cnt = 0;
    $('.' + className).each(function () {
        cnt++;
    });
    return cnt;
}

function resetCounterForDocument(className, startCounter) {
    $('.' + className).each(function () {
        var objNo = $(this);
        if (objNo.parent().parent().is(':visible')) {
            objNo.html(startCounter + '.');
            startCounter++;
        }
    });
}

var serialNumberRenderer = function (data, type, full, meta) {
    return meta.row + meta.settings._iDisplayStart + 1;
};

var newAppStatusRenderer = function (data, type, full, meta) {
    return '<div id="status_' + data + '">' + (appStatusArray[full.status] ? appStatusArray[full.status] : appStatusArray[VALUE_ZERO]) + '</div>';
};
function returnAppStatus(status) {
    return appStatusArray[status] ? appStatusArray[status] : appStatusArray[VALUE_ZERO];
}
var formsAppStatusRenderer = function (data, type, full, meta) {
    var returnString = '<div id="status_' + data + '">' + (fAppStatusArray[full.status] ? fAppStatusArray[full.status] : fAppStatusArray[VALUE_ZERO]) + '</div>';
    returnString += '<div id="appointment_by_name_' + data + '">';
    if (full.appointment_status == VALUE_ONE) {
        returnString += '<hr>' + full.appointment_by_name;
    }
    returnString += '</div>';
    return returnString;
};

function generateSelect2() {
    $('.select2').select2({"allowClear": true});
}

function generateSelect2Class(idText) {
    $('.' + idText).select2({"allowClear": true});
}

function generateSelect2id(idText) {
    $('#' + idText).select2({"allowClear": true});
}

var districtRenderer = function (data, type, full, meta) {
    return talukaArray[data] ? talukaArray[data] : '';
};

function returnValidationForDoc(documentId, pdfSize = 1024) {
    // VALUE_ONE for PDF | ZIP
    var documentName = $('#' + documentId).val();
    if (documentName == '') {
        return uploadDocValidationMessage;
    }
    var documentNameMessage = pdffileUploadValidation(documentId, pdfSize);
    if (documentNameMessage != '') {
        return documentNameMessage;
    }
    return '';
}

function checkValidationForDocument(documentId, documentCategory, errorMsgName, pdfSize = 1024) {
    // VALUE_ONE for PDF | ZIP
    if (documentCategory == VALUE_ONE) {
        var documentName = $('#' + documentId).val();
        if (documentName == '') {
            $('#' + documentId).val('');
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, uploadDocValidationMessage);
            return false;
        }
        var documentNameMessage = pdffileUploadValidation(documentId, pdfSize);
        if (documentNameMessage != '') {
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, documentNameMessage);
            return false;
        }
    }
    // VALUE_TWO for IMAGE
    if (documentCategory == VALUE_TWO) {
        var documentName = $('#' + documentId).val();
        if (documentName == '') {
            $('#' + documentId).val('');
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, uploadDocValidationMessage);
            return false;
        }
        var documentNameMessage = imagefileUploadValidation(documentId, pdfSize);
        if (documentNameMessage != '') {
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, documentNameMessage);
            return false;
        }
    }
    // VALUE_THREE for ALL
    if (documentCategory == VALUE_THREE) {
        var documentName = $('#' + documentId).val();
        if (documentName == '') {
            $('#' + documentId).val('');
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, uploadDocValidationMessage);
            return false;
        }
        var documentNameMessage = fileUploadValidation(documentId, pdfSize);
        if (documentNameMessage != '') {
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, documentNameMessage);
            return false;
        }
}
}

function checkValidationForMultipleDocument(documentId, documentCategory, errorMsgName, pdfSize = 1024) {
    // VALUE_ONE for PDF | ZIP
    if (documentCategory == VALUE_ONE) {
        var documentName = $('#' + documentId).val();
        if (documentName == '') {
            $('#' + documentId).val('');
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, uploadDocValidationMessage);
            return false;
        }
        var documentNameMessage = pdfMultiplefileUploadValidation(documentId, pdfSize);
        if (documentNameMessage != '') {
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, documentNameMessage);
            return false;
        }
}
}
function checkValidationForMultipleDocumentSize(documentId, documentCategory, errorMsgName, pdfSize = 1024) {
    // VALUE_ONE for PDF | ZIP
    if (documentCategory == VALUE_ONE) {
        var documentName = $('#' + documentId).val();
        // if (documentName == '') {
        //     $('#' + documentId).val('');
        //     $('#' + documentId).focus();
        //     validationMessageShow(errorMsgName + '-' + documentId, uploadDocValidationMessage);
        //     return false;
        // }
        var documentNameMessage = pdfMultiplefileUploadValidation(documentId, pdfSize);
        if (documentNameMessage != '') {
            $('#' + documentId).focus();
            validationMessageShow(errorMsgName + '-' + documentId, documentNameMessage);
            return false;
        }
}
}

function removeDocumentValue(containerHideId, documentSrcPathId, containerShowId, documentId) {
    $('#' + containerHideId).hide();
    $('#' + documentSrcPathId).attr('src', '');
    $('#' + containerShowId).show();
    $('#' + documentId).val('');
}

function pdffileUploadValidation(imageUploadAttrId, size = 1024) {
    var allowedFiles = ['pdf'];
    var fileName = $('#' + imageUploadAttrId).val();
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if ($.inArray(ext, allowedFiles) == -1) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Please upload File having extensions: <b>' + allowedFiles.join(', ') + '</b> only.';
    }
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > size) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Maximum upload size ' + (size / 1024) + ' MB only.';
    }
    return false;
}

function pdfMultiplefileUploadValidation(imageUploadAttrId, size = 1024) {
    var allowedFiles = ['pdf', 'zip'];
    var fileName = $('#' + imageUploadAttrId).val();

    var fileSize = 0;

    if (($('#' + imageUploadAttrId).get(0).files.length) > 0) {
        for (var i = 0; i < $('#' + imageUploadAttrId).get(0).files.length; ++i) {
            fileSize += $('#' + imageUploadAttrId).get(0).files[i].size;
        }
        // console.log('fileSize',(fileSize / 1024));
        if ((fileSize / 1024) > size) {
            $('#' + imageUploadAttrId).val('');
            $('#' + imageUploadAttrId).focus();
            return 'Maximum upload size ' + (size / 1024) + ' MB only.';
        }
        return false;
}
}

function fileUploadValidation(imageUploadAttrId, size = 1024) {
    var allowedFiles = ['jpg', 'png', 'jpeg', 'jfif', 'pdf', 'zip'];
    var fileName = $('#' + imageUploadAttrId).val();
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if ($.inArray(ext, allowedFiles) == -1) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Please upload File having extensions: <b>' + allowedFiles.join(', ') + '</b> only.';
    }
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > size) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Maximum upload size ' + (size / 1024) + ' MB only.';
    }
    return false;
}

function imagePDFUploadValidation(imageUploadAttrId, size = 1024) {
    var allowedFiles = ['jpg', 'png', 'jpeg', 'jfif', 'pdf'];
    var fileName = $('#' + imageUploadAttrId).val();
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if ($.inArray(ext, allowedFiles) == -1) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Please upload File having extensions: <b>' + allowedFiles.join(', ') + '</b> only.';
    }
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > size) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Maximum upload size ' + (size / 1024) + ' MB only.';
    }
    return false;
}

function imagefileUploadValidation(imageUploadAttrId, size = 1024) {
    var allowedFiles = ['jpg', 'png', 'jpeg', 'jfif'];
    var fileName = $('#' + imageUploadAttrId).val();
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if ($.inArray(ext, allowedFiles) == -1) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Please upload File having extensions: <b>' + allowedFiles.join(', ') + '</b> only.';
    }
    if (($('#' + imageUploadAttrId)[0].files[0].size / 1024) > size) {
        $('#' + imageUploadAttrId).val('');
        $('#' + imageUploadAttrId).focus();
        return 'Maximum upload size ' + (size / 1024) + ' MB only.';
    }
    return false;
}

function generateBoxes(type, data, id, moduleName, existingArray, isBr, isDiv = false) {
    $.each(data, function (index, value) {
        var template = (isDiv ? '<div class="col-sm-4">' : '') + '<label class="' + type +
                '-inline form-title f-w-n m-b-0px ' + (isDiv ? '' : 'm-r-10px') + ' cursor-pointer"><input type="' + type + '" class="mb-0" id="' + id +
                '_for_' + moduleName + '_' + index + '" name="' + id + '_for_' + moduleName + '" value="' +
                index + '">&nbsp;&nbsp;' + value + '</label>' + (isDiv ? '</div>' : '');
        if (isBr) {
            template += '<br>';
        }
        $('#' + id + '_container_for_' + moduleName).append(template);
    });
    if (existingArray) {
        if (type == 'checkbox') {
            var existingData = (existingArray).split(',');
            $.each(existingData, function (index, value) {
                $('input[name=' + id + '_for_' + moduleName + '][value="' + value + '"]').click();
            });
        } else {
            $('input[name=' + id + '_for_' + moduleName + '][value="' + existingArray + '"]').click();
        }
    } else {
        $('input[name=' + id + '_for_' + moduleName + '][value="' + existingArray + '"]').click();
}
}

function showSubContainer(id, moduleName, showId, showValue, type, showId2, showValue2, showId3, showValue3) {
    var otherId = '';
    if (type == 'radio') {
        otherId = $('input[name=' + id + '_for_' + moduleName + ']:checked').val();
    } else {
        otherId = $('#' + id + '_for_' + moduleName).val();
    }
    if (otherId == showValue) {
        $(showId + '_container_for_' + moduleName).show();
    }

    if (typeof showId2 != "undefined" && typeof showValue2 != "undefined") {
        if (otherId == showValue2) {
            $(showId2 + '_container_for_' + moduleName).show();
        }
    }

    if (typeof showId3 != "undefined" && typeof showValue3 != "undefined") {
        if (otherId == showValue3) {
            $(showId3 + '_container_for_' + moduleName).show();
        }
    }

    var inputObj = type == 'radio' ? 'input[name=' + id + '_for_' + moduleName + ']' : '#' + id + '_for_' + moduleName;
    $(inputObj).change(function () {
        var other = $(this).val();
        $(showId + '_container_for_' + moduleName).hide();
        if (typeof showId2 != "undefined" && typeof showValue2 != "undefined") {
            $(showId2 + '_container_for_' + moduleName).hide();
        }
        if (typeof showId3 != "undefined" && typeof showValue3 != "undefined") {
            $(showId3 + '_container_for_' + moduleName).hide();
        }
        if (other == showValue) {
            $(showId + '_container_for_' + moduleName).show();
            return false;
        } else {
            if (typeof showId2 != "undefined" && typeof showValue2 != "undefined") {
                if (other == showValue2) {
                    $(showId2 + '_container_for_' + moduleName).show();
                }
            }
            if (typeof showId3 != "undefined" && typeof showValue3 != "undefined") {
                if (other == showValue3) {
                    $(showId3 + '_container_for_' + moduleName).show();
                }
            }
        }
    });
}

function aadharNumberValidation(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var aadharNumber = $('#' + id).val();
    if (!aadharNumber) {
        return;
    }
    var validate = checkUID(aadharNumber);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}

function checkUID(uid) {
    if (uid.length != 12) {
        return invalidAadharNumberValidationMessage;
    }
    var Verhoeff = {
        "d": [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]],
        "p": [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]],
        "j": [0, 4, 3, 2, 1, 5, 6, 7, 8, 9],
        "check": function (str) {
            var c = 0;
            str.replace(/\D+/g, "").split("").reverse().join("").replace(/[\d]/g, function (u, i) {
                c = Verhoeff.d[c][Verhoeff.p[i % 8][parseInt(u, 10)]];
            });
            return c;

        },
        "get": function (str) {

            var c = 0;
            str.replace(/\D+/g, "").split("").reverse().join("").replace(/[\d]/g, function (u, i) {
                c = Verhoeff.d[c][Verhoeff.p[(i + 1) % 8][parseInt(u, 10)]];
            });
            return Verhoeff.j[c];
        }
    };

    String.prototype.verhoeffCheck = (function () {
        var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
        var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];

        return function () {
            var c = 0;
            this.replace(/\D+/g, "").split("").reverse().join("").replace(/[\d]/g, function (u, i) {
                c = d[c][p[i % 8][parseInt(u, 10)]];
            });
            return (c === 0);
        };
    })();

    if (Verhoeff['check'](uid) === 0) {
        return '';
    } else {
        return invalidAadharNumberValidationMessage;
    }
}

var queryStatusRenderer = function (data, type, full, meta) {
    return '<div id="query_status_' + data + '">' + (queryStatusArray[full.query_status] ? queryStatusArray[full.query_status] : queryStatusArray[VALUE_ZERO]) + '</div>';
};

function loadQueryManagementModule(parseData, templateData, tmpData) {
    var moduleData = parseData.module_data;
    $('#model_title').html('Query Management');
    $('#model_body').html(queryFormTemplate(tmpData));
    var cnt = 1;
    var lastRecord = 0;
    $.each(parseData.query_data, function (index, qd) {
        qd.cnt = cnt;
        qd.show_extra_div = true;
        qd.datetime_text = qd.display_datetime;
        if (qd.query_type == VALUE_ONE) {
            if (qd.status == VALUE_ONE) {
                if (!jQuery.isEmptyObject(qd.query_documents)) {
                    qd.show_document_container = true;
                }
                $('#query_item_container').prepend(queryQuestionViewTemplate(qd));
                loadQueryDocItemForViewQuestion(qd.query_documents, cnt);
            }
        }
        if (qd.query_type == VALUE_TWO) {
            if (qd.status == VALUE_ONE) {
                if (!jQuery.isEmptyObject(qd.query_documents)) {
                    qd.show_document_container = true;
                }
                $('#query_item_container').prepend(queryAnswerViewTemplate(qd));
                loadQueryDocItemForView(qd.query_documents, cnt);
            } else {
                qd.datetime_text = '00-00-0000 00:00:00';
                $('#query_item_container').prepend(queryAnswerTemplate(qd));
                $.each(qd.query_documents, function (index, docData) {
                    addDocumentRow(docData);
                });
            }
        }
        if (qd.query_type == VALUE_THREE) {
            $('#query_item_container').prepend(queryResolveViewTemplate(qd));
        }
        lastRecord = index;
        cnt++;
    });
    if (moduleData.query_status == VALUE_ONE) {
        var queryData = parseData.query_data;
        if (lastRecord != 0) {
            var tempQStatus = queryData[lastRecord] ? queryData[lastRecord]['query_type'] : [];
            if (tempQStatus == VALUE_ONE) {
                templateData.datetime_text = '00-00-0000 00:00:00';
                templateData.query_type = VALUE_TWO;
                $('#query_item_container').prepend(queryAnswerTemplate(templateData));
            }
        }
//        if (cnt % 2 == 0) {
//            templateData.datetime_text = '00-00-0000 00:00:00';
//            templateData.query_type = VALUE_TWO;
//            $('#query_item_container').prepend(queryAnswerTemplate(templateData));
//        }
    }
    $('#popup_modal').modal('show');
}

function checkValidationForSubmitQueryAnswerDetails() {
    validationMessageHide();
    var moduleType = $('#module_type_for_query_answer').val();
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE &&
            moduleType != VALUE_FOUR && moduleType != VALUE_FIVE && moduleType != VALUE_SIX &&
            moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN &&
            moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN &&
            moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_EIGHTEEN &&
            moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY &&
            moduleType != VALUE_TWENTYTHREE && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_THIRTY) {
        return invalidAccessValidationMessage;
    }
    var moduleId = $('#module_id_for_query_answer').val();
    if (!moduleId) {
        return invalidAccessValidationMessage;
    }
    var queryType = $('#query_type_for_query_answer').val();
    if (queryType != VALUE_ONE && queryType != VALUE_TWO) {
        return invalidAccessValidationMessage;
    }
    var remarks = $('#remarks_for_query_answer').val();
    if (!remarks) {
        return remarksValidationMessage;
    }
    return '';
}

function askForSubmitQueryAnswerDetails() {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    var validationMessage = checkValidationForSubmitQueryAnswerDetails();
    if (validationMessage != '') {
        $('#remarks_for_query_answer').focus();
        validationMessageShow('query-answer-remarks_for_query_answer', validationMessage);
        return false;
    }
    var qdItems = getQDItems();
    if (!qdItems) {
        return false;
    }
    var yesEvent = 'submitQueryAnswerDetails()';
    showConfirmation(yesEvent, 'Submit');
}

function getQDItems() {
    var newQDItems = [];
    var exiQDItems = [];
    var isQDItemValidation;
    $('.query_answer_document_row').each(function () {
        var that = $(this);
        var tempCnt = that.find('.og_query_answer_document_cnt').val();
        if (tempCnt == '' || tempCnt == null) {
            showError(invalidAccessValidationMessage);
            isQDItemValidation = true;
            return false;
        }
        var qdItem = {};
        var docName = $('#doc_name_for_query_answer_' + tempCnt).val();
        if (docName == '' || docName == null) {
            $('#doc_name_for_query_answer_' + tempCnt).focus();
            validationMessageShow('query-answer-doc_name_for_query_answer_' + tempCnt, documentNameValidationMessage);
            isQDItemValidation = true;
            return false;
        }
        qdItem.doc_name = docName;
        if ($('#document_container_for_query_answer_' + tempCnt).is(':visible')) {
            var uploadDoc = $('#document_for_query_answer_' + tempCnt).val();
            if (!uploadDoc) {
                validationMessageShow('query-answer-document_for_query_answer_' + tempCnt, uploadDocValidationMessage);
                isQDItemValidation = true;
                return false;
            }
            var uploadDocMessage = fileUploadValidation('document_for_query_answer_' + tempCnt, 2048);
            if (uploadDocMessage != '') {
                validationMessageShow('query-answer-document_for_query_answer_' + tempCnt, uploadDocMessage);
                isQDItemValidation = true;
                return false;
            }
        }

        var queryDocumentId = $('#query_document_id_for_query_answer_' + tempCnt).val();
        if (!queryDocumentId || queryDocumentId == null) {
            newQDItems.push(qdItem);
        } else {
            qdItem.query_document_id = queryDocumentId;
            exiQDItems.push(qdItem);
        }
    });
    if (isQDItemValidation) {
        return false;
    }
    return {'new_qd_items': newQDItems, 'exi_qd_items': exiQDItems};
}

function submitQueryAnswerDetails() {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    var validationMessage = checkValidationForSubmitQueryAnswerDetails();
    if (validationMessage != '') {
        $('#remarks_for_query_answer').focus();
        validationMessageShow('query-answer-remarks_for_query_answer', validationMessage);
        return false;
    }
    var formData = {};
    formData.query_id_for_query_answer = $('#query_id_for_query_answer').val();
    formData.module_type_for_query_answer = $('#module_type_for_query_answer').val();
    formData.module_id_for_query_answer = $('#module_id_for_query_answer').val();
    formData.query_type_for_query_answer = $('#query_type_for_query_answer').val();
    formData.remarks_for_query_answer = $('#remarks_for_query_answer').val();
    formData.new_qd_items = [];
    formData.exi_qd_items = [];
    var qdItems = getQDItems();
    if (!qdItems) {
        return false;
    }
    formData.new_qd_items = qdItems.new_qd_items;
    formData.exi_qd_items = qdItems.exi_qd_items;
    var btnObj = $('#submit_btn_for_query_answer');
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        type: 'POST',
        url: 'utility/answer_a_query',
        data: $.extend({}, formData, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            btnObj.html(ogBtnHTML);
            btnObj.attr('onclick', ogBtnOnclick);
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            showError(textStatus.statusText);
            $('html, body').animate({scrollTop: '0px'}, 0);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                btnObj.html(ogBtnHTML);
                btnObj.attr('onclick', ogBtnOnclick);
                showError(parseData.message);
                $('html, body').animate({scrollTop: '0px'}, 0);
                return false;
            }
            showSuccess(parseData.message);
            var tempData = {};
            tempData.remarks = formData.remarks_for_query_answer;
            tempData.datetime_text = parseData.query_datetime;
            tempData.query_by_name = parseData.query_by_name;
            if (!jQuery.isEmptyObject(parseData.query_document_data)) {
                tempData.show_document_container = true;
            }
            tempData.cnt = 1;
            $('#query_answer_container').html(queryAnswerViewTemplate(tempData));
            $('#query_status_' + formData.module_id_for_query_answer).html(queryStatusArray[parseData.query_status]);
            loadQueryDocItemForView(parseData.query_document_data, tempData.cnt);
        }
    });
}

function loadQueryDocItemForViewQuestion(queryDocumentData, mainCnt) {
    var tempCnt = 1;
    $.each(queryDocumentData, function (index, docData) {
        docData.cnt = tempCnt;
        $('#document_item_container_for_query_view_' + mainCnt).append(documentItemViewTemplate(docData));
        if (docData.document) {
            $('#document_name_href_for_query_answer_view_' + tempCnt).attr('href', QUERY_PATH + docData['document']);
            $('#document_name_for_query_answer_view_' + tempCnt).html(docData['document']);
        }
        tempCnt++;
    });
}

function loadQueryDocItemForView(queryDocumentData, mainCnt) {
    var tempCnt = 1;
    $.each(queryDocumentData, function (index, docData) {
        docData.cnt = tempCnt;
        $('#document_item_container_for_query_answer_view_' + mainCnt).append(documentItemViewTemplate(docData));
        if (docData.document) {
            $('#document_name_href_for_query_answer_view_' + tempCnt).attr('href', 'documents/query/' + docData['document']);
            $('#document_name_for_query_answer_view_' + tempCnt).html(docData['document']);
        }
        tempCnt++;
    });
}

function addDocumentRow(templateData) {
    templateData.cnt = documentRowCnt;
    $('#document_item_container_for_query_answer').append(documentItemTemplate(templateData));
    if (templateData.document) {
        loadQueryDocument('document', documentRowCnt, templateData);
    }
    resetCounter('query-answer-document-cnt');
    documentRowCnt++;
}

function checkValidationForDocUpload() {
    validationMessageHide();
    var moduleType = $('#module_type_for_query_answer').val();
    if (moduleType != VALUE_ONE && moduleType != VALUE_TWO && moduleType != VALUE_THREE &&
            moduleType != VALUE_FOUR && moduleType != VALUE_FIVE && moduleType != VALUE_SIX &&
            moduleType != VALUE_SEVEN && moduleType != VALUE_EIGHT && moduleType != VALUE_NINE && moduleType != VALUE_TEN &&
            moduleType != VALUE_ELEVEN && moduleType != VALUE_TWELVE && moduleType != VALUE_THIRTEEN &&
            moduleType != VALUE_FOURTEEN && moduleType != VALUE_FIFTEEN && moduleType != VALUE_SIXTEEN && moduleType != VALUE_EIGHTEEN &&
            moduleType != VALUE_NINETEEN && moduleType != VALUE_TWENTY &&
            moduleType != VALUE_TWENTYTHREE && moduleType != VALUE_TWENTYFIVE && moduleType != VALUE_THIRTY) {
        return invalidAccessValidationMessage;
    }
    var moduleId = $('#module_id_for_query_answer').val();
    if (!moduleId) {
        return invalidAccessValidationMessage;
    }
    var queryType = $('#query_type_for_query_answer').val();
    if (queryType != VALUE_ONE && queryType != VALUE_TWO) {
        return invalidAccessValidationMessage;
    }
    return '';
}

function uploadDocumentForQueryAnswer(tempCnt) {
    var validationMessage = checkValidationForDocUpload();
    if (validationMessage != '') {
        showError(validationMessage);
        return false;
    }
    var id = 'document_for_query_answer_' + tempCnt;
    var doc = $('#' + id).val();
    if (doc == '') {
        return false;
    }
    var materialslipMessage = fileUploadValidation(id, 2048);
    if (materialslipMessage != '') {
        showError(materialslipMessage);
        return false;
    }
    $('#document_container_for_query_answer_' + tempCnt).hide();
    $('#document_name_container_for_query_answer_' + tempCnt).hide();
    $('#spinner_template_for_query_answer_' + tempCnt).show();
    openFullPageOverlay();
    var formData = new FormData();
    formData.append('query_id_for_query_answer', $('#query_id_for_query_answer').val());
    formData.append('module_type_for_query_answer', $('#module_type_for_query_answer').val());
    formData.append('module_id_for_query_answer', $('#module_id_for_query_answer').val());
    formData.append('query_type_for_query_answer', $('#query_type_for_query_answer').val());
    formData.append('query_document_id_for_query_answer', $('#query_document_id_for_query_answer_' + tempCnt).val());
    formData.append('document_for_query_answer', $('#' + id)[0].files[0]);
    $.ajax({
        type: 'POST',
        url: 'utility/upload_query_document',
        data: formData,
        mimeType: "multipart/form-data",
        contentType: false,
        cache: false,
        processData: false,
        error: function (textStatus, errorThrown) {
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            closeFullPageOverlay();
            $('#spinner_template_for_query_answer_' + tempCnt).hide();
            $('#document_container_for_query_answer_' + tempCnt).show();
            $('#document_name_container_for_query_answer_' + tempCnt).hide();
            $('#' + id).val('');
            showError(documentNotUploadedErrorValidationMessage);
        },
        success: function (data) {
            closeFullPageOverlay();
            var parseData = JSON.parse(data);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            if (parseData.success == false) {
                $('#spinner_template_for_query_answer_' + tempCnt).hide();
                $('#document_container_for_query_answer_' + tempCnt).show();
                $('#document_name_container_for_query_answer_' + tempCnt).hide();
                $('#' + id).val('');
                showError(parseData.message);
                return false;
            }
            $('#spinner_template_for_query_answer_' + tempCnt).hide();
            $('#document_name_container_for_query_answer_' + tempCnt).hide();
            $('#' + id).val('');
            $('#query_id_for_query_answer').val(parseData.query_id);
            $('#query_document_id_for_query_answer_' + tempCnt).val(parseData.query_document_id);
            var docItemData = {};
            docItemData.query_document_id = parseData.query_document_id;
            docItemData.query_id = parseData.query_id;
            docItemData.document = parseData.document_name;
            loadQueryDocument('document', tempCnt, docItemData);
        }
    });
}

function loadQueryDocument(documentFieldName, cnt, docItemData) {
    $('#' + documentFieldName + '_container_for_query_answer_' + cnt).hide();
    $('#' + documentFieldName + '_name_container_for_query_answer_' + cnt).show();
    $('#' + documentFieldName + '_name_href_for_query_answer_' + cnt).attr('href', 'documents/query/' + docItemData[documentFieldName]);
    $('#' + documentFieldName + '_name_for_query_answer_' + cnt).html(docItemData[documentFieldName]);
    $('#' + documentFieldName + '_remove_btn_for_query_answer_' + cnt).attr('onclick', 'askForRemoveQueryAnswerDoc("' + docItemData.query_document_id + '","' + cnt + '")');
}

function askForRemoveQueryAnswerDoc(queryDocumentId, cnt) {
    if (!queryDocumentId || !cnt) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    var yesEvent = 'removeQueryAnswerDoc(' + queryDocumentId + ', ' + cnt + ')';
    showConfirmation(yesEvent, 'Remove');
}

function removeQueryAnswerDoc(queryDocumentId, cnt) {
    if (!queryDocumentId || !cnt) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    $.ajax({
        type: 'POST',
        url: 'utility/remove_query_document',
        data: $.extend({}, {'query_document_id': queryDocumentId}, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            showError(textStatus.statusText);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                showError(parseData.message);
                return false;
            }
            $('.stack-bar-bottom').hide();
            showSuccess(parseData.message);
            removeDocument('document', 'query_answer_' + cnt);
        }
    });
}

function askForRemoveDocumentRow(cnt) {
    var queryDocumentId = $('#query_document_id_for_query_answer_' + cnt).val();
    if (!queryDocumentId || queryDocumentId == 0 || queryDocumentId == null) {
        removeDocumentItemRow(cnt);
        return false;
    }
    var yesEvent = 'removeDocumentRow(' + cnt + ')';
    showConfirmation(yesEvent, 'Remove');
}

function removeDocumentItemRow(cnt) {
    $('#query_answer_document_row_' + cnt).remove();
    resetCounter('query-answer-document-cnt');
}

function removeDocumentRow(cnt) {
    var queryDocumentId = $('#query_document_id_for_query_answer_' + cnt).val();
    if (!queryDocumentId || queryDocumentId == 0 || queryDocumentId == null) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    $.ajax({
        type: 'POST',
        url: 'utility/remove_query_document_item',
        data: $.extend({}, {'query_document_id': queryDocumentId}, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            showError(textStatus.statusText);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                showError(parseData.message);
                return false;
            }
            showSuccess(parseData.message);
            removeDocumentItemRow(cnt);
        }
    });
}

function yearPicker() {
    $('#yearPicker').datetimepicker({
        icons:
                {
                    up: 'fa fa-angle-up',
                    down: 'fa fa-angle-down',
                    next: 'fa fa-angle-right',
                    previous: 'fa fa-angle-left'
                },
        format: "YYYY",
        viewMode: "years",
    });
}

function monthPicker() {
    $('#monthPicker').datetimepicker({
        icons:
                {
                    up: 'fa fa-angle-up',
                    down: 'fa fa-angle-down',
                    next: 'fa fa-angle-right',
                    previous: 'fa fa-angle-left'
                },
        format: "MM",
        viewMode: "months",
    });
}

function removeDocument(id, moduleName) {
    $('#' + id + '_name_container_for_' + moduleName).hide();
    $('#' + id + '_container_for_' + moduleName).show();
    $('#' + id + '_name_href_for_' + moduleName).attr('href', '');
    $('#' + id + '_name_for_' + moduleName).html('');
    $('#' + id + '_remove_btn_for_' + moduleName).attr('onclick', '');
}

function calculateAge(moduleName) {
    var dob = document.getElementById("applicant_dob_" + moduleName).value;
    if (!dob) {
        $('#applicant_age_' + moduleName).val('');
        return false;
    }
    var newdate = dob.split("-").reverse().join("/");
    var dobDate = new Date(newdate);
    var nowDate = new Date();
    var diff = nowDate.getTime() - dobDate.getTime();
    var ageDate = new Date(diff); // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    $('#applicant_age_' + moduleName).val(age);
}

function showOtherOccupationtext(occupationId, id, moduleName) {
    // alert('#' + id + '_for_' + moduleName);
    if (occupationId.value == VALUE_TEN) {
        $('#' + id + '_for_' + moduleName).show();
    } else {
        $('#' + id + '_for_' + moduleName).hide();
    }
}
function showOtherapplicantEducationtext(occupationId, id, moduleName) {
    // alert('#' + id + '_for_' + moduleName);
    if (occupationId.value == VALUE_FIVE) {
        $('#' + id + '_for_' + moduleName).show();
    } else {
        $('#' + id + '_for_' + moduleName).hide();
    }
}
function showOtherapplicantOccupationtext(occupationId, id, moduleName) {
    // alert('#' + id + '_for_' + moduleName);
    if (occupationId.value == VALUE_TWELVE) {
        $('#' + id + '_for_' + moduleName).show();
    } else {
        $('#' + id + '_for_' + moduleName).hide();
    }
}
function showParentOtherOccupationtext(occupationId, id, moduleName) {
    // alert('#' + id + '_for_' + moduleName);
    if (occupationId.value == VALUE_NINE) {
        $('#' + id + '_for_' + moduleName).show();
    } else {
        $('#' + id + '_for_' + moduleName).hide();
    }
}
function showOtherOccupationforChildrentext(occupationId, id, moduleName) {
    // alert('#' + id + '_for_' + moduleName);
    if (occupationId.value == VALUE_EIGHT) {
        $('#' + id + '_for_' + moduleName).show();
    } else {
        $('#' + id + '_for_' + moduleName).hide();
    }
}
function showOtherTypeOfPropertytext(occupationId, id, moduleName) {
    // alert('#' + id + '_for_' + moduleName);
    if (occupationId.value == VALUE_THREE) {
        $('#' + id + '_for_' + moduleName).show();
    } else {
        $('#' + id + '_for_' + moduleName).hide();
    }
}
function showOtherSourceOfIncometext(occupationId, id, moduleName) {
    // alert('#' + id + '_for_' + moduleName);
    if (occupationId.value == VALUE_TWO) {
        $('#' + id + '_for_' + moduleName).show();
    } else {
        $('#' + id + '_for_' + moduleName).hide();
    }
}
function showOtherReligionOfNCLtext(occupationId, id, moduleName) {
    // alert('#' + id + '_for_' + moduleName);
    if (occupationId.value == VALUE_FIVE) {
        $('#' + id + '_for_' + moduleName).show();
    } else {
        $('#' + id + '_for_' + moduleName).hide();
    }
}
function renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationForCode(dataArray, comboId, keyId, valueId, message) {
    if (!dataArray) {
        return false;
    }
    $('#' + comboId).html('<option value="">Select ' + message + '</option>');
    var data = {};
    var optionResult = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined && dataObject[keyId] != 0) {
            data = {"value_field": dataObject[keyId], 'text_field': dataObject[valueId]};
            optionResult = optionTemplate(data);
            $("#" + comboId).append(optionResult);
        }
    });
}
function renderOptionsForStateAndDistrict(dataArray, comboId, keyId, valueId, message) {
    if (!dataArray) {
        return false;
    }
    $('#' + comboId).html('<option value="0">' + message + '</option>');
    var data = {};
    var optionResult = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined && dataObject[keyId] != 0) {
            data = {"value_field": dataObject[keyId], 'text_field': dataObject[valueId]};
            optionResult = optionTemplate(data);
            $("#" + comboId).append(optionResult);
        }
    });
}
function renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(dataArray, comboId, keyId, valueId, valueId2, addBlankOption) {
    if (!dataArray) {
        return false;
    }
    if (typeof addBlankOption === "undefined") {
        addBlankOption = true;
    }
    if (addBlankOption) {
        $('#' + comboId).html('<option value="">&nbsp;</option>');
    }
    var data = {};
    var optionResult = "";
    var textField = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined && dataObject[keyId] != 0) {
            if (dataObject[valueId2]) {
                textField = dataObject[valueId] + (dataObject[valueId2] != null ? ' ( ' + dataObject[valueId2] + ' )' : '');
            } else {
                textField = dataObject[valueId];
            }
            data = {"value_field": dataObject[keyId], 'text_field': textField};
            optionResult = optionTemplate(data);
            $("#" + comboId).append(optionResult);
        }
    });
}
function renderOptionsForTwoDimensionalArrayWithKeyValueWithCombinationForLand(dataArray, comboId, keyId, valueId, valueId2, addBlankOption) {
    if (!dataArray) {
        return false;
    }
    if (typeof addBlankOption === "undefined") {
        addBlankOption = true;
    }
    if (addBlankOption) {
        $('#' + comboId).html('<option value="">&nbsp;</option>');
    }
    var data = {};
    var optionResult = "";
    var textField = "";
    $.each(dataArray, function (index, dataObject) {
        if (dataObject != undefined) {
            if (dataObject[valueId2]) {
                textField = dataObject[valueId] + (dataObject[valueId2] != null ? ' ( ' + dataObject[valueId2] + ' )' : '');
            } else {
                textField = dataObject[valueId];
            }
            data = {"value_field": dataObject[keyId], 'text_field': textField};
            optionResult = optionTemplate(data);
            $("#" + comboId).append(optionResult);
        }
    });
}
function getCommonData() {
    tempVillageData = [];
    tempUVillageData = [];
    tempStateData = [];
    tempDistrictData = [];
    $.ajax({
        url: 'utility/get_common_data',
        type: 'post',
        async: false,
        error: function (textStatus, errorThrown) {
            showError(textStatus.statusText);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                showError(parseData.message);
                return false;
            }
            tempVillageData = parseData.village_data;
            tempUVillageData = parseData.urban_village_data;
            tempStateData = parseData.state_data;
            tempDistrictData = parseData.district_data;
        }
    });
}

function indianCommaIncome(x) {
    x = parseFloat(x) ? parseFloat(x) : 0;
    x = x.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0)
        afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
}

function villageChangeEvent(obj, moduleName, showDisplay = false) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    var surveyNumberId = 'survey_number_for_' + moduleName;
    renderOptionsForTwoDimensionalArray([], surveyNumberId);
    $('#' + surveyNumberId).val('').trigger('change');
    var village = obj.val();
    if (!village) {
        if (showDisplay) {
            $('#dvillage_for_' + moduleName).html('Village Name');
        }
        return false;
    }
    if (showDisplay) {
        $('#dvillage_for_' + moduleName).html(tempVillageData[village] ? tempVillageData[village]['village_name'] : '');
    }
    addTagSpinner(surveyNumberId);
    $.ajax({
        url: 'utility/get_survey_number_list',
        type: 'post',
        data: $.extend({}, {'village': village}, getTokenData()),
        error: function (textStatus, errorThrown) {
            removeTagSpinner();
            generateNewCSRFToken();
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            showError(textStatus.statusText);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                removeTagSpinner();
                showError(parseData.message);
                return false;
            }
            var surveyNumberData = parseData.survey_number_data;
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(surveyNumberData, surveyNumberId, 'survey', 'survey');
            removeTagSpinner();
        }
    });
}

function surveyNumberChangeEvent(obj, moduleName, showDisplay = false) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    var subdivisionNumberId = 'subdivision_number_for_' + moduleName;
    renderOptionsForTwoDimensionalArray([], subdivisionNumberId);
    $('#' + subdivisionNumberId).val('').trigger('change');
    var village = $('#village_for_' + moduleName).val();
    var surveyNumber = obj.val();
    if (!village || !surveyNumber) {
        if (showDisplay) {
            $('#dsurvey_for_' + moduleName).html('Survey');
        }
        return false;
    }
    if (showDisplay) {
        $('#dsurvey_for_' + moduleName).html(surveyNumber);
    }
    addTagSpinner(subdivisionNumberId);
    $.ajax({
        url: 'utility/get_subdivision_number_list',
        type: 'post',
        data: $.extend({}, {'village': village, 'survey_number': surveyNumber}, getTokenData()),
        error: function (textStatus, errorThrown) {
            removeTagSpinner();
            generateNewCSRFToken();
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            showError(textStatus.statusText);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                removeTagSpinner();
                showError(parseData.message);
                return false;
            }
            var tempSubdivData = parseData.subdivision_number_data;
            renderOptionsForTwoDimensionalArrayWithKeyValueWithCombination(tempSubdivData, subdivisionNumberId, 'subdiv', 'subdiv');
            removeTagSpinner();
        }
    });
}

function subdivisionNumberChangeEvent(obj, moduleName, showDisplay = false) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    var village = $('#village_for_' + moduleName).val();
    var surveyNumber = $('#survey_number_for_' + moduleName).val();
    var subdivisionNumber = obj.val();
    if (!village || !surveyNumber || !subdivisionNumber) {
        if (showDisplay) {
            $('#dsubdiv_for_' + moduleName).html('Subdiv');
            $('.dtotal_area_for_' + moduleName).html('Total Area');
            $('#darea_for_' + moduleName).html('Area For N.A.');
            $('#total_area_for_' + moduleName).val('');
        }
        return false;
    }
    $('#dsubdiv_for_' + moduleName).html(subdivisionNumber);
    $('.dtotal_area_for_' + moduleName).html(spinnerTemplate({'type': 'nic-blue', 'extra_class': 'spinner-border-small'}));
    $.ajax({
        url: 'utility/get_area_by_subdivision',
        type: 'post',
        data: $.extend({}, {'village': village, 'survey_number': surveyNumber, 'subdivision_number': subdivisionNumber}, getTokenData()),
        error: function (textStatus, errorThrown) {
            $('.dtotal_area_for_' + moduleName).html('Total Area');
            generateNewCSRFToken();
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            showError(textStatus.statusText);
        },
        success: function (response) {
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                $('.dtotal_area_for_' + moduleName).html('Total Area');
                showError(parseData.message);
                return false;
            }
            $('.dtotal_area_for_' + moduleName).html(parseData.area);
            $('#darea_for_' + moduleName).html('Area For N.A.');
            $('#total_area_for_' + moduleName).val(parseData.area);
            removeTagSpinner();
        }
    });
}

var appNumberRenderer = function (data, type, full, meta) {
    return data + '<hr>' + (full.submitted_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(full.submitted_datetime) : '');
};


var appReverifyStatusRenderer = function (data, type, full, meta) {
    var returnString = '<div id="status_' + data + '">' + (appStatusArray[full.status] ? appStatusArray[full.status] : appStatusArray[VALUE_ZERO]) + '</div>';
    returnString += '<div id="reverification_status_' + data + '">';
    if (full.to_type_reverify != VALUE_ZERO && full.status == VALUE_THREE) {
        returnString += '<hr>';
        if (full.talathi_to_reverify_datetime != '0000-00-00 00:00:00' && full.aci_to_reverify_datetime == '0000-00-00 00:00:00' &&
                full.talathi_to_type_reverify == VALUE_ONE) {
            returnString += full.aci_name;
        } else if (full.talathi_to_reverify_datetime != '0000-00-00 00:00:00' && full.aci_to_reverify_datetime == '0000-00-00 00:00:00' &&
                full.talathi_to_type_reverify == VALUE_TWO) {
            returnString += full.mamlatdar_name;
        } else if ((full.talathi_to_reverify_datetime != '0000-00-00 00:00:00' && full.aci_to_reverify_datetime != '0000-00-00 00:00:00') ||
                (full.talathi_to_reverify_datetime == '0000-00-00 00:00:00' && full.aci_to_reverify_datetime != '0000-00-00 00:00:00')) {
            if (full.aci_to_ldc != VALUE_ZERO && full.aci_rec_reverify == VALUE_ONE && full.ldc_to_mamlatdar == VALUE_ZERO) {
                returnString += full.ldc_name;
            } else {
                returnString += full.mamlatdar_name;
            }
        } else {
            returnString += (full.to_type_reverify == VALUE_ONE ? full.talathi_name : full.aci_name);
        }
    }
    returnString += '</div>';
    return returnString;
};

function gaHistorymovementString(full) {
    var data = JSON.parse(full.application_history);
    data.reverse();
    var returnString = '<table class="table table-bordered mb-0 bg-beige f-s-app-details table-lh1">';
    for (var i = 0; i < data.length; i++) {
        returnString += '<tr>';
        returnString += '<td>' + data[i].forwarded_to_user_name + '</td>';
        returnString += '<td>' + dateTo_DD_MM_YYYY(data[i].forwarded_datetime) + '</td>';
        returnString += '</tr>';
    }
    returnString += '</table>';
    return returnString;
}

function movementString(full) {
    var returnString = '<table class="table table-bordered mb-0 bg-beige f-s-app-details table-lh1">';
    if (full.aci_to_ldc == VALUE_ZERO && full.aci_rec_reverify == VALUE_TWO) {
        if (full.aci_to_reverify_datetime != '0000-00-00 00:00:00') {
            returnString += '<tr><td><b>Reverify : </b>' + (full.mamlatdar_name) +
                    '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_reverify_datetime) + '</td></tr>';
        }
    }
    if (full.ldc_to_mamlatdar != VALUE_ZERO && full.aci_rec_reverify == VALUE_ONE) {
        returnString += '<tr><td><b>Reverify : </b>' + full.mamlatdar_name +
                '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.ldc_to_mamlatdar_datetime) + '</td></tr>';
    }
    if (full.aci_to_ldc != VALUE_ZERO && full.aci_rec_reverify == VALUE_ONE) {
        if (full.aci_to_reverify_datetime != '0000-00-00 00:00:00') {
            returnString += '<tr><td><b>Reverify : </b>' + (full.ldc_name) +
                    '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_reverify_datetime) + '</td></tr>';
        }
    }
    if (full.talathi_to_type_reverify != VALUE_ZERO) {
        returnString += '<tr><td><b>Reverify : </b>' + (full.talathi_to_type_reverify == VALUE_ONE ? full.aci_name : full.mamlatdar_name) +
                '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.talathi_to_reverify_datetime) + '</td></tr>';
    }
    if (full.to_type_reverify != VALUE_ZERO) {
        returnString += '<tr><td><b>Reverify : </b>' + (full.to_type_reverify == VALUE_ONE ? full.talathi_name : full.aci_name) +
                '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.mam_to_reverify_datetime) + '</td></tr>';
    }
    if (full.ldc_to_mamlatdar != VALUE_ZERO && full.aci_rec_reverify == VALUE_ZERO) {
        returnString += '<tr><td>' + full.mamlatdar_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.ldc_to_mamlatdar_datetime) + '</td></tr>';
    }
    if (full.aci_to_ldc != VALUE_ZERO && full.aci_rec_reverify == VALUE_ZERO) {
        returnString += '<tr><td>' + full.ldc_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_ldc_datetime) + '</td></tr>';
    }
    if (full.aci_to_mamlatdar != VALUE_ZERO) {
        returnString += '<tr><td>' + full.mamlatdar_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_mamlatdar_datetime) + '</td></tr>';
    }
    if (full.talathi_to_aci != VALUE_ZERO) {
        returnString += '<tr><td>' + full.aci_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.talathi_to_aci_datetime) + '</td></tr>';
    }
    if (full.appointment_datetime != '0000-00-00 00:00:00') {
        returnString += '<tr><td>' + full.appointment_by_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.appointment_datetime) + '</td></tr>';
    } else if (full.appointment_datetime == '0000-00-00 00:00:00' && full.talathi_to_aci != VALUE_ZERO) {
        returnString += '<tr><td>' + full.talathi_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.talathi_to_aci_datetime) + '</td></tr>';
    }
    returnString += '</table>';
    return returnString;
}

function movementStringMigrant(full) {
    var returnString = '<table class="table table-bordered mb-0 bg-beige f-s-app-details table-lh1">';
    if (full.ldc_to_mamlatdar != VALUE_ZERO && full.aci_rec_reverify == VALUE_THREE) {
        returnString += '<tr><td><b>Reverify : </b>' + full.mamlatdar_name +
                '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.ldc_to_mamlatdar_datetime) + '</td></tr>';
    }
    if (full.aci_to_ldc != VALUE_ZERO && full.aci_rec_reverify == VALUE_THREE) {
        if (full.aci_to_reverify_datetime != '0000-00-00 00:00:00') {
            returnString += '<tr><td><b>Reverify : </b>' + (full.ldc_name) +
                    '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_reverify_datetime) + '</td></tr>';
        }
    }
    if (full.aci_to_ldc == VALUE_ZERO && full.aci_rec_reverify == VALUE_TWO) {
        if (full.aci_to_reverify_datetime != '0000-00-00 00:00:00') {
            returnString += '<tr><td><b>Reverify : </b>' + (full.mamlatdar_name) +
                    '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_reverify_datetime) + '</td></tr>';
        }
    }
    if (full.ldc_to_mamlatdar != VALUE_ZERO && full.aci_rec_reverify == VALUE_ONE) {
        returnString += '<tr><td><b>Reverify : </b>' + full.mamlatdar_name +
                '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.ldc_to_mamlatdar_datetime) + '</td></tr>';
    }
    if (full.aci_to_ldc != VALUE_ZERO && full.aci_rec_reverify == VALUE_ONE) {
        if (full.aci_to_reverify_datetime != '0000-00-00 00:00:00') {
            returnString += '<tr><td><b>Reverify : </b>' + (full.ldc_name) +
                    '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_reverify_datetime) + '</td></tr>';
        }
    }
    if (full.talathi_to_type_reverify != VALUE_ZERO) {
        returnString += '<tr><td><b>Reverify : </b>' + (full.talathi_to_type_reverify == VALUE_ONE ? full.aci_name : full.mamlatdar_name) +
                '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.talathi_to_reverify_datetime) + '</td></tr>';
    }
    if (full.to_type_reverify != VALUE_ZERO) {
        returnString += '<tr><td><b>Reverify : </b>' + (full.to_type_reverify == VALUE_ONE ? full.talathi_name : full.aci_name) +
                '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.mam_to_reverify_datetime) + '</td></tr>';
    }
    if (full.ldc_to_mamlatdar != VALUE_ZERO && full.aci_rec_reverify == VALUE_ZERO) {
        returnString += '<tr><td>' + full.mamlatdar_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.ldc_to_mamlatdar_datetime) + '</td></tr>';
    }
    if (full.aci_to_ldc != VALUE_ZERO && full.aci_rec_reverify == VALUE_ZERO) {
        returnString += '<tr><td>' + full.ldc_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_ldc_datetime) + '</td></tr>';
    }
    if (full.ldc_to_mamlatdar != VALUE_ZERO && (full.aci_rec_reverify == VALUE_THREE || full.aci_rec_reverify == VALUE_ONE)) {
        returnString += '<tr><td>' + full.mamlatdar_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.ldc_to_mamlatdar_datetime) + '</td></tr>';
    }
    if (full.aci_rec == VALUE_THREE) {
        if (full.aci_to_m_ldc != VALUE_ZERO && (full.aci_rec_reverify == VALUE_ZERO || full.aci_rec_reverify == VALUE_ONE || full.aci_rec_reverify == VALUE_TWO || full.aci_rec_reverify == VALUE_THREE)) {
            returnString += '<tr><td><b>Migration: </b>' + full.ldc_name_m + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_m_ldc_datetime) + '</td></tr>';
        }
    }
    if (full.aci_to_mamlatdar != VALUE_ZERO) {
        returnString += '<tr><td>' + full.mamlatdar_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.aci_to_mamlatdar_datetime) + '</td></tr>';
    }
    if (full.talathi_to_aci != VALUE_ZERO) {
        returnString += '<tr><td>' + full.aci_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.talathi_to_aci_datetime) + '</td></tr>';
    }
    if (full.appointment_datetime != '0000-00-00 00:00:00') {
        returnString += '<tr><td>' + full.appointment_by_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.appointment_datetime) + '</td></tr>';
    } else if (full.appointment_datetime == '0000-00-00 00:00:00' && full.talathi_to_aci != VALUE_ZERO) {
        returnString += '<tr><td>' + full.talathi_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.talathi_to_aci_datetime) + '</td></tr>';
    }
    returnString += '</table>';
    return returnString;
}

function movementStringForCharacterCertificate(full) {
    var returnString = '<table class="table table-bordered mb-0 bg-beige f-s-app-details table-lh1">';
    if (full.sdpo_status != VALUE_ZERO) {
        returnString += '<tr><td>' + full.mamlatdar_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.sdpo_status_datetime) + '</td></tr>';
    }
    if (full.mamlatdar_to_sdpo != VALUE_ZERO) {
        returnString += '<tr><td>' + full.sdpo_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.mamlatdar_to_sdpo_datetime) + '</td></tr>';
    }
    if (full.ldc_to_mamlatdar != VALUE_ZERO) {
        returnString += '<tr><td>' + full.mamlatdar_name + '</td><td class="text-center">' + dateTo_DD_MM_YYYY(full.ldc_to_mamlatdar_datetime) + '</td></tr>';
    }
    returnString += '</table>';
    return returnString;
}

function customizedSearch(obj, searchName, searchMain) {
    var value = obj.val().toLowerCase();
    $(searchMain).filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $(searchName).filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

function roundOff(obj) {
    var amount = obj.val();
    if ($.isNumeric(amount)) {
        obj.val(parseFloat(Math.abs(amount)).toFixed(2));
    }
}

function checkValidationForPAN(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var panNumber = $('#' + id).val();
    if (!panNumber) {
        return false;
    }
    var validate = PANValidation(panNumber);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}

function PANValidation(panNumber) {
    var filter = /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/;
    if (!filter.test(panNumber)) {
        return invalidPANValidationMessage;
    }
    return '';
}

function drStatusText(status) {
    return drAppStatusArray[status] ? drAppStatusArray[status] : '';
}

function checkValidationForPincode(moduleName, id) {
    var val = $('#' + id).val();
    validationMessageHide(moduleName + '-' + id);
    if (!val || !val.trim()) {
        validationMessageShow(moduleName + '-' + id, pincodeValidationMessage);
        return false;
    }
    if (val.length != 6) {
        validationMessageShow(moduleName + '-' + id, validPincodeValidationMessage);
        return false;
    }
}

function pincodeValidation(pincode) {
    if (pincode.length != 6) {
        return validPincodeValidationMessage;
    }
    return '';
}

function loadMap(mapId, latClass, lngClass, mapData, allowOnClick) {
    if (typeof allowOnClick === "undefined") {
        allowOnClick = false;
    }
    var map = L.map(mapId).setView([mapData.lat, mapData.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; NIC Daman'
    }).addTo(map);
    var popup = L.popup();
    if (allowOnClick) {
        popup.setLatLng(mapData)
                .setContent('Selected LatLng(' + mapData.lat + ',' + mapData.lng + ')')
                .openOn(map);
        map.on('click', onMapClick);
        function onMapClick(e) {
            popup
                    .setLatLng(e.latlng)
                    .setContent("Selected " + e.latlng.toString())
                    .openOn(map);

            $('.' + latClass).val((e['latlng'].lat).toFixed(6));
            $('.' + lngClass).val((e['latlng'].lng).toFixed(6));
        }
    } else {
        var marker = L.marker([mapData.lat, mapData.lng]).addTo(map);
        marker.bindPopup('Selected LatLng(' + mapData.lat + ',' + mapData.lng + ')').openPopup();
    }
}

function customizedTableSearch(obj, tableId, className = 'accordion-item') {
    var value = obj.val().toLowerCase();
    $("#" + tableId + " ." + className).filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

var appRejDetailsRenderer = function (data, type, full, meta) {
    if (full.status == VALUE_FIVE || full.status == VALUE_SIX) {
        return  '<b><i class="fas fa-user f-s-10px"></i></b> :- ' + full.actioner_user_name + '<hr><b><i class="fas fa-calendar f-s-10px"></i></b> :- ' + dateTo_DD_MM_YYYY_HH_II_SS(full.status_datetime) + '<hr><b><i class="fas fa-comment f-s-10px"></i></b> :- ' + full.remarks;
    } else {
        return '-';
    }
};

function showCertAppInstruction() {
    if ($('#cert_instructions_checkbox_text').is(':checked')) {
        $('#cert_instructions_checkbox_text').click();
    }
    $('#instructions_container_for_modal').html(instructionsTemplate({'e_class': 'col-md-4'}));
    $('#certficate_application_instructions_modal').modal({backdrop: 'static', keyboard: false});
}

function calculateAgeForDob(birthId, ageId, moduleName) {
    var dob = $('#' + birthId + "_for_" + moduleName).val();
    if (!dob) {
        $('#' + ageId + '_for_' + moduleName).val('');
        return false;
    }
    var newdate = dob.split("-").reverse().join("/");
    var dobDate = new Date(newdate);
    var nowDate = new Date();
    var diff = nowDate.getTime() - dobDate.getTime();
    var ageDate = new Date(diff); // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    $('#' + ageId + '_for_' + moduleName).val(age);
}

function feeDetails(btnObj, moduleType, moduleId) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    if (!moduleId || !moduleType) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        url: 'utility/get_fee_details',
        type: 'post',
        data: $.extend({}, {'module_type': moduleType, 'module_id': moduleId}, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            btnObj.html(ogBtnHTML);
            btnObj.attr('onclick', ogBtnOnclick);
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            showError(textStatus.statusText);
        },
        success: function (response) {
            btnObj.html(ogBtnHTML);
            btnObj.attr('onclick', ogBtnOnclick);
            var parseData = JSON.parse(response);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                showError(parseData.message);
                return false;
            }
            showFeeDetails(moduleType, moduleId, parseData.module_data);
        }
    });
}

function showFeeDetails(moduleType, moduleId, moduleData) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    showPopup();
    $('.swal2-popup').css('width', '55em');
    if (moduleData.status == VALUE_THREE) {
        if (!moduleData.hide_submit_btn) {
            moduleData.show_fees_paid = true;
        }
    }
    moduleData.payment_type = moduleData.payment_type == VALUE_ZERO ? VALUE_ONE : moduleData.payment_type;
    moduleData.module_type = moduleType;
    moduleData.module_id = moduleId;
    if (moduleType == VALUE_NINE || moduleType == VALUE_FOURTEEN || moduleType == VALUE_FIFTEEN || moduleType == VALUE_SIXTEEN) {
        moduleData.show_pd = true;
        if (moduleType == VALUE_FOURTEEN) {
            moduleData.show_na = true;
        }
    }
    moduleData.s_title = 'Survey';
    moduleData.sd_title = 'Subdiv';
    if (moduleType == VALUE_TWENTYTHREE) {
        moduleData.s_title = moduleData.ld_area_type == VALUE_TWO ? 'Gauthan Wise Number' : 'P.T. Sheet Number';
        moduleData.sd_title = moduleData.ld_area_type == VALUE_TWO ? 'Plot Number' : 'Chalta Number';
        moduleData.show_psaw = true;
    }
    $('#popup_container').html(payTemplate(moduleData));
    generateBoxes('radio', paymentTypeArray, 'payment_type', 'pfd', moduleData.payment_type, true);

    var ldDetails = JSON.parse(moduleData.land_details);
    $.each(ldDetails, function (index, ld) {
        if (moduleData.show_psaw) {
            var psFormData = psFormArray[ld.property_status] ? psFormArray[ld.property_status] : [];
        }
        $('#ld_item_container_for_' + moduleType).append('<tr><td class="text-center">' + (index + 1) + '</td>'
                + '<td class="text-center">' + ld.survey + '</td><td class="text-center">' + ld.subdiv + '</td>'
                + (moduleData.show_psaw ? ('<td class="text-center">' + (propertyStatusTextArray[ld.property_status] ? propertyStatusTextArray[ld.property_status] : '') + '</td>'
                        + '<td class="text-center">' + (ld.apply_with ? getCheckboxValue(ld.apply_with, psFormData) : '') + '</td>') : '')
                + '<td class="text-right">' + ld.copies + '</td>'
                + (moduleData.show_pd ? '<td class="text-right">' + (moduleData.show_na ? (ld.is_na == VALUE_ONE ? 'N.A.' : (ld.pages ? ld.pages : VALUE_ZERO)) : (ld.pages ? ld.pages : VALUE_ZERO)) + '</td>' : '')
                + '<td class="text-right">' + (moduleData.show_na ? (ld.is_na == VALUE_ONE ? 'N.A.' : ld.amount) : ld.amount) + '</td></tr>');
    });
    loadFB(moduleType, moduleData.fb_data);
    loadPH(moduleType, moduleData.ph_data);
}

function dashboardNaviationToModule(sDistrict, sStatus, sModuleId) {
    if (typeof sDistrict == "undefined") {
        sDistrict = '';
    }
    if (typeof sStatus == "undefined") {
        sStatus = '';
    }
    if (typeof sModuleId == "undefined") {
        sModuleId = '';
    }
    var returnData = {};
    returnData.search_district = sDistrict;
    returnData.search_status = sStatus;
    returnData.search_module_id = sModuleId;
    return returnData;
}

function loadFB(moduleType, fbDetails) {
    var templateData = {};
    templateData.module_type = moduleType;
    $('#fb_container_for_' + moduleType).html(fbListTemplate(templateData));
    var tempCnt = 1;
    var totalFee = 0;
    $.each(fbDetails, function (index, fbd) {
        fbd.module_type = moduleType;
        fbd.fb_cnt = tempCnt;
        $('#fb_item_container_for_' + moduleType).append(fbItemTemplate(fbd));
        var fees = parseInt(fbd.fee);
        totalFee += fees ? fees : 0;
        tempCnt++;
    });
    $('#total_fees_for_fb_' + moduleType).html(totalFee + ' /-');
    if (tempCnt != 1) {
        $('#fb_container_for_' + moduleType).show();
    }
}

function submitPG(pgData) {
    $('#temp_op_enct').val(pgData.op_enct);
    $('#temp_op_mt').val(pgData.op_mt);
    $('#temp_op_mmptd').val(pgData.op_mmptd);
    $('#qwertyuiqwdjkoplkjhfgazcxzc').submit();
    $('.null-pdjshdjs').val('');
}

function loadPH(moduleType, phDetails) {
    var templateData = {};
    templateData.module_type = moduleType;
    $('#ph_container_for_' + moduleType).html(phListTemplate(templateData));
    var tempCnt = 1;
    $.each(phDetails, function (index, phd) {
        phd.module_type = moduleType;
        phd.ph_cnt = tempCnt;
        phd.transaction_datetime = phd.op_transaction_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(phd.op_transaction_datetime) : (phd.op_start_datetime != '0000-00-00 00:00:00' ? dateTo_DD_MM_YYYY_HH_II_SS(phd.op_start_datetime) : '');
        phd.status_text = getPGStatus(phd.op_status, phd.fees_payment_id);
        if (phd.op_status == VALUE_FOUR || phd.op_status == VALUE_FIVE || phd.op_status == VALUE_SIX) {
            phd.show_update_payment_status_btn = true;
        }
        $('#ph_item_container_for_' + moduleType).append(phItemTemplate(phd));
        tempCnt++;
    });
    if (tempCnt == 1) {
        $('#ph_item_container_for_' + moduleType).html(noRecordFoundTemplate({'colspan': 7, 'message': noRecordFoundMessage}));
        return false;
    }
}

var pgStatusRenderer = function (data, type, full, meta) {
    return getPGStatus(data, full.fees_payment_id);
};

function getPGStatus(data, feePaymentId) {
    return '<div class="pg_status_' + feePaymentId + '">' + (pgStatusTextArray[data] ? pgStatusTextArray[data] : pgStatusTextArray[VALUE_ZERO]) + '</div>';
}

var pgMessageRenderer = function (data, type, full, meta) {
    return pgMessage(data, full.fee_payment_id);
};

function pgMessage(data, feePaymentId) {
    return '<div class="pg_message_' + feePaymentId + '">' + (data ? data : '') + '</div>';
}

function payFormFees(btnObj) {
    if (!tempIdInSession || tempIdInSession == null) {
        loginPage();
        return false;
    }
    validationMessageHide();
    var formData = $('#pfd_form').serializeFormJSON();
    if (!formData.module_id_for_pfd || !formData.module_type_for_pfd) {
        showError(invalidAccessValidationMessage);
        return false;
    }
    if (!formData.payment_type_for_pfd) {
        $('#payment_type_for_pfd_1').focus();
        validationMessageShow('pfd-payment_type_for_pfd', oneOptionValidationMessage);
        return false;
    }
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        type: 'POST',
        url: 'utility/submit_fee_details',
        data: $.extend({}, formData, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            btnObj.html(ogBtnHTML);
            if (textStatus.status === 403) {
                loginPage();
                return false;
            }
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            btnObj.attr('onclick', ogBtnOnclick);
            showError(textStatus.statusText);
        },
        success: function (data) {
            btnObj.html(ogBtnHTML);
            btnObj.attr('onclick', ogBtnOnclick);
            var parseData = JSON.parse(data);
            if (parseData.is_logout === true) {
                loginPage();
                return false;
            }
            setNewToken(parseData.temp_token);
            if (parseData.success == false) {
                showError(parseData.message);
                return false;
            }
            Swal.close();
            if (parseData.payment_type == VALUE_ONE) {
                openFullPageOverlay();
                submitPG(parseData);
                return false;
            }
        }
    });
}

function checkPaymentDV(btnObj, feesPaymentId, mType, rltpId) {
    if (typeof rltpId == "undefined") {
        rltpId = VALUE_ZERO;
    }
    if (!feesPaymentId || !btnObj || (mType != VALUE_ONE && mType != VALUE_TWO && mType != VALUE_THREE)) {
        showError(invalidAccessValidationMessage);
        return;
    }
    if (mType == VALUE_ONE || mType == VALUE_TWO) {
        if (!tempIdInSession || tempIdInSession == null) {
            loginPage();
            return false;
        }
    }
    $('.success-message-ph').html('');
    var ogBtnHTML = btnObj.html();
    var ogBtnOnclick = btnObj.attr('onclick');
    btnObj.html(iconSpinnerTemplate);
    btnObj.attr('onclick', '');
    $.ajax({
        url: 'payment_status/check_payment_dv',
        type: 'post',
        data: $.extend({}, {'fees_payment_id': feesPaymentId, 'm_type': mType}, getTokenData()),
        error: function (textStatus, errorThrown) {
            generateNewCSRFToken();
            if (!textStatus.statusText) {
                loginPage();
                return false;
            }
            btnObj.html(ogBtnHTML);
            btnObj.attr('onclick', ogBtnOnclick);
            showError(textStatus.statusText);
        },
        success: function (response) {
            btnObj.remove();
            var parseData = JSON.parse(response);
            setNewToken(parseData.temp_token);
            if (parseData.success === false) {
                showError(parseData.message);
                return false;
            }
            $('.success-message-ph').html(parseData.message);
            if (parseData.is_updated_fp) {
                $('.pg_status_' + feesPaymentId).html(pgStatusTextArray[parseData.updated_op_status] ? pgStatusTextArray[parseData.updated_op_status] : '');
                $('.pg_message_' + feesPaymentId).html(parseData.updated_op_message);
                if (parseData.updated_status == VALUE_FOUR && (parseData.module_type == VALUE_NINE || parseData.module_type == VALUE_THIRTEEN ||
                        parseData.module_type == VALUE_FOURTEEN || parseData.module_type == VALUE_FIFTEEN ||
                        parseData.module_type == VALUE_SIXTEEN)) {
                    $('#status_' + parseData.module_id).html(fAppStatusArray[parseData.updated_status] ? fAppStatusArray[parseData.updated_status] : appStatusArray[VALUE_ZERO]);
                }
                if ((mType == VALUE_TWO || mType == VALUE_THREE) && parseData.updated_op_status == VALUE_TWO && parseData.updated_status == VALUE_FOUR) {
                    $('#rltpd_action_container').html('<button type="button" class="btn btn-sm btn-danger" style="padding: 2px 7px;" title="T.R.5"'
                            + 'onclick="downloadTRFive(' + rltpId + ')"><i class="fas fa-file-pdf"></i> T.R.5</button>');
                }
            }
        }
    });
}

function getCheckboxValue(columValue, arrayValue) {
    var tempstring = [];
    var str = columValue;
    if (columValue) {
        var splitComma = str.split(',');
        $.each(splitComma, function (index, value) {
            if (index != VALUE_ZERO) {
                tempstring += ', ';
            }
            tempstring += arrayValue[value] ? arrayValue[value] : '';
        });
        return tempstring;
    }
}

function checkValidationForYearlyIncome(moduleName, id) {
    validationMessageHide(moduleName + '-' + id);
    var yearlyIncome = $('#' + id).val();
    if (!yearlyIncome) {
        validationMessageShow(moduleName + '-' + id, applicantYearlyIncomeValidationMessage);
        return;
    }
    var validate = yearlyIncomeValidation(yearlyIncome);
    if (validate != '') {
        validationMessageShow(moduleName + '-' + id, validate);
        return false;
    }
}

function yearlyIncomeValidation(yearlyIncome) {
    var pi = parseInt(yearlyIncome) ? parseInt(yearlyIncome) : 0;
    if (pi < MIN_YEALRY_INCOME) {
        return minYearlyIncomeValidationMessage;
    }
    return '';
}

function getPerCopyAmountForEOCSSitePlan(totalArea) {
    var pricePerCopy = VALUE_ZERO;
    if (totalArea < 2000) {
        pricePerCopy = 45;
    } else if (totalArea >= 2000 && totalArea < 4000) {
        pricePerCopy = 60;
    } else if (totalArea >= 4000 && totalArea < 10000) {
        pricePerCopy = 75;
    } else if (totalArea >= 10000 && totalArea < 30000) {
        pricePerCopy = 150;
    } else {
        pricePerCopy = 300;
    }
    return pricePerCopy;
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

