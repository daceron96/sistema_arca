function get_order(id_order){
    /**vacia el body de la tabla del modal*/
    $('#body_modal').empty();
  
    /**realiza la peticion ajax */
    $.ajax({
        url: '/order/get-detail-order/',
        type: 'GET',
        data: {'id_order':id_order},
        success: function(response){
            $('#num_order').text('Orden de pedido número ' + id_order )
            for (detail in response.data){
                $('#body_modal').append(
                    "<tr>"
                    + "<th> " + (parseInt(detail) + 1) + "</th>"
                    + "<td> " + response.data[detail]['product'] + "</td>"
                    + "<td> " + response.data[detail]['quantity_product'] + "</td>"
                    + "<td> " + (parseInt(response.data[detail]['sale_price']) * parseInt(response.data[detail]['quantity_product'])) + "</td>"
                    + "</tr>"
                )
                $('#btn_upd').attr('href','/order/update-order/'+response['id_order'])
            }

        }
    })
}