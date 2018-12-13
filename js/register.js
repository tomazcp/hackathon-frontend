$(document).ready(function() {
    
    const registerForm = $('#registerForm');
    const submitBtn = $('#registerBtn');
    const inputs = $('#registerForm :input').not('#registerBtn');

    const processForm = () => {
        //registerForm.forEach()
    }

    submitBtn.click(function(e) {
        e.preventDefault();
        inputs.each(function() {
            
        })
    });

});