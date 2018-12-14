$(document).ready(function() {

    const patientUrl = 'http://192.168.1.29:8080/hackathon/api/auth/profile';
    const imgAvatar = $('img.avatar');
    const nameTag = $('p.patient-name');
    const emailTag = $('p.patient-email');
    const sidenavEdit = $('.sidenav-edit');
    const sidenavProfile = $('.sidenav-profile');
    const submitBtn = $('#editBtn');
    const profile = $('.profile');
    const formDiv = $('.form');
    const inputs = $('#editProfile :input').not('#editBtn');
    const avatars = { male: '../img/male_avatar.png', female: '../img/female_avatar.png' };
    const editUrl = 'http://192.168.1.29:8080/hackathon/api/patient/register';
    
    function getPatient(callback) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: patientUrl,
            dataType: 'json',
            async: true,
            success: callback
        });
    }

    function submitForm(data, callback) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: editUrl,
            type: 'POST',
            async: true,
            dataType: 'json',
            data: JSON.stringify(data),
            success: callback
        });
    }

    function onData(patient) {
        imgAvatar.attr('src', avatars[patient.gender]);
        nameTag.text(patient.name);
        emailTag.text(patient.email);
        populateForm(patient);
        formDiv.hide();
    }

    function populateForm(patient) {
        console.log(patient);
        inputs.each(function() {
            this.value = patient[this.name];
        });      
    }

    submitBtn.click(function(e) {
        e.preventDefault();
        let form = {};

        inputs.each(function() {
            form[$(this).attr('name')] = $(this).val();
        });

        submitForm(form);
    });

    sidenavEdit.click(function(e) {
        e.preventDefault();
        formDiv.show();
        profile.hide();
    });

    sidenavProfile.click(function(e) {
        e.preventDefault();
        formDiv.hide();
        profile.show();
    });


    getPatient(onData);


});