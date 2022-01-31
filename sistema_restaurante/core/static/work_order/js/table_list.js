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
            $('#num_table').text('Mesa # ' + response['table'] )
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
                $('#btn_cancel_order').attr('onclick',"cancellation_confirmation("+response['id_order']+")")
            }

        }
    })
}


function cancellation_confirmation(id_order){
    $('#num_orden').text('Número ' + id_order)
    $('#btn_confirm_cancel').attr('onclick',"cancel_order("+id_order+")")
    $('#modal_confirm').modal('show');

}

function cancel_order(id_order){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $('#comment_cancel').removeClass('is-invalid')
    console.log($('#comment_cancel').val().length)
    if($('#comment_cancel').val().length >= 10 ){
        $.ajax({
            data : {'comment': $('#comment_cancel').val()},
            url : '/order/cancel-order/'+id_order+'/',
            type : 'POST',
            headers: {'X-CSRFToken': csrftoken},        
            success: function(response){
                
                $('#table_'+response['table']).empty();
                $('#table_'+response['table']).removeClass('bg-warning').addClass('bg-primary');
                $('#table_'+response['table']).append(
                    "<a href='/order/new-order/"+response['table']+"' class='stretched-link link-light' style='text-decoration:none' ><b>Mesa "+ response['table']+"</b></a>"
                )                
                $('#modal_confirm').modal('hide');
            }
        })
    }else{
        $('#comment_cancel').addClass('is-invalid')
    }
}
