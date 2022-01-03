function create_product(){
    $.ajax({
        data : $('#form_product').serialize(),
        url : $('#form_product').attr('action'),
        type : $('#form_product').attr('method'),
        success: function(response){

        },
        error: function(error){

        }
    })
}