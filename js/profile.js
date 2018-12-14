$(document).ready(function() {

    const patientUrl = 'http://192.168.1.29:8080/hackathon/api/auth/profile';
    
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

    function onData(data) {
        console.log(data)
    }


    getPatient(onData);

});