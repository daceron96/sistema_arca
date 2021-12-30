function get_order(id_order){
    /**vacia el body de la tabla del modal*/
    $('#body_modal').empty();
  
    /**realiza la peticion ajax */
    $.ajax({
        url: '/order/get-detail-order/',
        type: 'GET',
        data: {'id_order':id_order},
        dataType: 'json',
        success: function(data){
            console.log(data)

        }
    })
}