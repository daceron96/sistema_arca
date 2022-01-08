function create_product() {
    $.ajax({
        data: $('#form_product').serialize(),
        url: $('#form_product').attr('action'),
        type: $('#form_product').attr('method'),
        success: function (response) {
            $('#body_table').append(
                "<tr id='item_list_"+response['code']+"'>"
                + set_item_list(response)
                + "</tr>"
            )
            $('#modal_product').modal('hide')
        },
        error: function (error) {
            set_error_form(error)
        }
    })
}

function get_update_product(id_product) {
    clean_modal();
    $.ajax({
        url: '/product/update/' + id_product + '/',
        type: 'GET',
        success: function (response) {
            console.log(response)
            $('#title_modal').text('Editar producto')
            $('#id_code').val(response['code'])
            $('#id_name').val(response['name'])
            $('#id_sale_price').val(response['sale_price'])
            $('#id_description').val(response['description'])
            $("#id_category option[value='" + response['category'] + "']").attr("selected", true);
            $('#modal_product').modal('show')
            $('#btn_add').addClass('visually-hidden')
            $('#btn_upd').removeClass('visually-hidden').attr('onclick', 'update_product(' + response['id'] + ')')
        }
    })
}

function update_product(id_product) {
    $.ajax({
        data: $('#form_product').serialize(),
        url: '/product/update/' + id_product + '/',
        type: $('#form_product').attr('method'),
        success: function (response) {
            $('#item_list_'+response['code']).empty()
            $('#item_list_'+response['code']).append(set_item_list(response)).addClass('table-success')
            $('#modal_product').modal('hide')
        },
        error: function (error) {
            set_error_form(error)

        }
    })
}

function delete_product(id_product){
    $.ajax({
        url: '/product/delete/'+id_product+ '/',
        type: 'GET',
        success: function(response){
            $('#modal_confirm').modal('hide');
            $('#btn_confirm_delete').removeAttr('onclick')
            $('#item_list_'+response['code']).remove();

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

function set_item_list(object) {
    item ="<td><b>" + object['code'] + "</b></td>"
        + "<td>" + object['name'] + "</td>"
        + "<td>" + object['sale_price'] + "</td>"
        + "<td> <span class='badge  bg-success'>Activo</span></td>"
        + "<td>" + object['category'] + "</td>"
        + "<td>"
        + "<button type='button' class='btn btn-warning btn-sm text-white' onclick='get_update_product("+ object['id']+")'><i class='bi bi-pencil'></i> Editar</button>"
        + " <button type='button' class='btn btn-danger btn-sm ' onclick='confirm_delete("+object['name']+","+object['id']+")'><i class='bi bi-trash '></i> Eliminar</button>"
        + "</td>"
        
    return item
}

function clean_modal() {
    $('#title_modal').text('Crear nuevo producto')
    $('.is-invalid').removeClass('is-invalid')
    $("#form_product")[0].reset();
    $('#id_category option:selected').removeAttr('selected')
    $('#btn_add').removeClass('visually-hidden')
    $('#btn_upd').addClass('visually-hidden').removeAttr('onclick')
}

function confirm_delete(name,id_product){
    $('#name_product').text(name);
    $('#btn_confirm_delete').attr('onclick', 'delete_product('+id_product+')')
    $('#modal_confirm').modal('show');
}

function prueba(){
    $('#item_list_3').after(
        '<tr> <td> asdasdasdds </td> </tr>'
    )
}