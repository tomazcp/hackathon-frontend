$(document).ready(function() {

    const inputs = $('#evaluation :input').not('button');
    const submitBtn = $('#evaluationBtn');

    submitBtn.click(function(e) {
        e.preventDefault();
        let evaluation = {};

        inputs.each(function() {
            if ($(this).prop('checked')) {
                evaluation[this.name] = this.value;
            }
        });
        console.log(evaluation);
    });  
});