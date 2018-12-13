$(document).ready(function() {
    
    const registerForm = $('#registerForm');
    const submitBtn = $('#registerBtn');
    const inputs = $('#registerForm :input').not('#registerBtn');

    const processForm = () => {
        //registerForm.forEach()
    }

    submitBtn.click(function(e) {
        let registration;
        e.preventDefault();

        inputs.each(function() {
            registration[$(this).attr('name')] = $(this).val();            
        })
        //console.log(registration);
    });

});