function decrease_amount(){
    var amount = parseInt($('#amount').val());
    if(amount > 0){
        amount = amount - 1;
    }
    if(amount == 0){
        $('#btn_decrease_amount').prop("disabled",true);
    }
    $('#amount').val(amount);
}
function increase_amount(){
    
    var amount = 0
    if($('#amount').val() == ""){
        amount = 0
    }else{
        amount = parseInt($('#amount').val());
    }

    amount = amount + 1
    $('#amount').val(amount);
    if(amount > 0 && $('#btn_decrease_amount').is(':disabled')){
        $('#btn_decrease_amount').prop("disabled",false);

    }
}