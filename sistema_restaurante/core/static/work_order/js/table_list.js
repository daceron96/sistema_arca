function get_order(id_order) {
    /**vacia el body de la tabla del modal*/
    $('#body_modal').empty();

    /**realiza la peticion ajax */
    $.ajax({
        url: '/order/get-detail-order/',
        type: 'GET',
        data: { 'id_order': id_order },
        success: function(response) {
            $('#num_order').text('Orden de pedido número ' + id_order)
            $('#num_table').text('Mesa # ' + response['table'])
            for (detail in response.data) {
                $('#body_modal').append(
                    "<tr>" +
                    "<th> " + (parseInt(detail) + 1) + "</th>" +
                    "<td> " + response.data[detail]['product'] + "</td>" +
                    "<td> " + response.data[detail]['quantity_product'] + "</td>" +
                    "<td> " + (parseInt(response.data[detail]['sale_price']) * parseInt(response.data[detail]['quantity_product'])) + "</td>" +
                    "</tr>"
                )
                $('#btn_upd').attr('href', '/order/update-order/' + response['id_order'])
                $('#btn_cancel_order').attr('onclick', "cancellation_confirmation(" + response['id_order'] + ")")
            }

        }
    })
}


function cancellation_confirmation(id_order) {
    $('#num_orden').text('Número ' + id_order)
    $('#btn_confirm_cancel').attr('onclick', "cancel_order(" + id_order + ")")
    $('#modal_confirm').modal('show');

}

function cancel_order(id_order) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $('#comment_cancel').removeClass('is-invalid')
    console.log($('#comment_cancel').val().length)
    if ($('#comment_cancel').val().length >= 10) {
        $.ajax({
            data: { 'comment': $('#comment_cancel').val() },
            url: '/order/cancel-order/' + id_order + '/',
            type: 'POST',
            headers: { 'X-CSRFToken': csrftoken },
            success: function(response) {

                $('#table_' + response['table']).empty();
                $('#table_' + response['table']).removeClass('bg-warning').addClass('bg-primary');
                $('#table_' + response['table']).append(
                    "<a href='/order/new-order/" + response['table'] + "' class='stretched-link link-light' style='text-decoration:none' ><b>Mesa " + response['table'] + "</b></a>"
                )
                $('#modal_confirm').modal('hide');
            }
        })
    } else {
        $('#comment_cancel').addClass('is-invalid')
    }
}

/*funciones para gestion de mesas */
function create_table() {
    $.ajax({
        data: $('#form_table').serialize(),
        url: $('#form_table').attr('action'),
        type: $('#form_table').attr('method'),
        success: function(response) {
            console.log(response)
            $('#table_list').append(
                "<div class='col-lg-2 text-center mb-4'>" +
                "<div class='card' >" +
                "<svg class='bd-placeholder-img card-img-top' width='100%' height='100' xmlns='http://www.w3.org/2000/svg'" +
                "role='img' aria-label='Placeholder: Thumbnail' preserveAspectRatio='xMidYMid slice' focusable='false'>" +
                "<title>Placeholder</title>" +
                "<rect width='100%' height='100%' fill='#55595c' />" +
                "</svg>" +
                "<div class='card-body bg-primary 'id=table_" + response['table_number'] + ">" +
                "<a href='/order/new-order/" + response['table_number'] + "/' class='stretched-link link-light' style='text-decoration:none' ><b>Mesa " + response['table_number'] + " </b></a>" +
                "</div>"
            )
            $('#modal_table').modal('hide')
        },
        error: function(error) {
            set_error_form(error)
        }
    })
}
function set_error_form(error) {
    let errors = Object.keys(error.responseJSON.error)
    $('.is-invalid').removeClass('is-invalid')
    for (let item in errors) {
        $('#invalid_' + errors[item]).empty()
        $('#id_' + errors[item]).addClass('is-invalid')
        $('#invalid_' + errors[item]).append(error.responseJSON.error[errors[item]])
    }
}

function clean_modal_table() {
    $('#id_table_number').removeClass('is-invalid').val('')

}