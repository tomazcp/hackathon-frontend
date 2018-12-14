$(document).ready(function() {

    const patientUrl = 'http://192.168.1.29:8080/hackathon/api/auth/profile';
    const imgAvatar = $('img.avatar');
    const nameTag = $('p.patient-name');
    const emailTag = $('p.patient-email');
    const avatars = { male: '../img/male_avatar.png', female: '../img/female_avatar.png' };
    
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

    function onData(patient) {
        imgAvatar.attr('src', avatars[patient.gender]);
        nameTag.text(patient.name);
        emailTag.text(patient.email);
    }


    getPatient(onData);

});