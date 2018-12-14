$(document).ready(function() {
    
    const registerForm = $('#registerForm');
    const submitBtn = $('#registerBtn');
    const inputs = $('#registerForm :input').not('#registerBtn');
    const registrationUrl = "http://192.168.1.29:8080/hackathon/api/auth/register";

    submitBtn.click(function(e) {
        e.preventDefault();
        let registration = {};

        inputs.each(function() {
            registration[this.name] = $(this).val();            
        });
        
        submitForm(registration, function(res, status) {
            if (status === 'success') {
                window.location.href = '../views/login.html';
            }
        });
    });

    function submitForm(data, callback) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: registrationUrl,
            data: JSON.stringify(data),
            dataType: 'json',
            async: true,
            success: callback
            
        });
    }

    function redirect(res) {
        console.log(res);
    }


    

});