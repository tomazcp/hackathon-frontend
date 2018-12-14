$(document).ready(function() {

    const loginUrl = 'http://localhost:8080/hackathon/api/auth/login';
    const loginBtn = $('#loginBtn');
    const inputs = $('#loginForm :input').not('button');
    
    loginBtn.click(function(e) {
        e.preventDefault();

        let login = {};
        
        inputs.each(function() {
            login[this.name] = this.value;
        });

        doLogin(login, function(res) {
            window.location.href = '../views/profile.html';
        })
    })

    function doLogin(loginData, callback) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: loginUrl,
            data: JSON.stringify(loginData),
            dataType: 'json',
            async: true,
            success: callback
        });
    }
});