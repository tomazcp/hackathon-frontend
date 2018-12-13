$(document).ready(function() {
    
    const registerForm = $('#registerForm');
    const submitBtn = $('#registerBtn');
    const inputs = $('#registerForm :input').not('#registerBtn');
    const registrationUrl = "http://localhost:8080/hackathon/api/auth/register";

    submitBtn.click(function(e) {
        e.preventDefault();
        let registration = {};

        inputs.each(function() {
            registration[this.name] = $(this).val();            
        });
        
        submitForm(registration);
    });

    function submitForm(data) {
        $.post(registrationUrl, data, function(result) {
            console.log(result);
        });    
    }

    

});