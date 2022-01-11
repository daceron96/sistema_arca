function create_category() {
    $.ajax({
        data: $('#form_category').serialize(),
        url: $('#form_category').attr('action'),
        type: $('#form_category').attr('method'),
        success: function (response) {
            $('#body_table').append(
                "<tr id='item_list_"+response['id']+"'>"
                + "<td><b>" + (parseInt($('#table_list > tbody > tr').length) + 1)  + "</b></td>"
                + set_item_list(response)
                + "</td>"
                + "</tr>"
            )
            $('#modal_category').modal('hide')
        },
        error: function (error) {
            set_error_form(error)
        }
    })
}

function delete_category(id_category){
    $.ajax({
        url: '/product/category/delete/'+id_category+ '/',
        type: 'GET',
        success: function(response){
            $('#modal_confirm').modal('hide');
            $('#btn_confirm_delete').removeAttr('onclick')
            $('#item_list_'+response['id']).remove();

        }
    })
}

function get_update_category(id_category,position) {
    clean_modal();
    $.ajax({
        url: '/product/category/update/' + id_category + '/',
        type: 'GET',
        success: function (response) {
            $('#title_modal').text('Editar categoria')
            $('#id_name').val(response['name'])
            $('#id_description').val(response['description'])
            $("#id_work_section option[value='" + response['work_section'] + "']").attr("selected", true);
            $('#modal_category').modal('show')
            $('#btn_add').addClass('visually-hidden')
            $('#btn_upd').removeClass('visually-hidden').attr('onclick', 'update_category(' + response['id'] +","+ position + ')')
        }
    })
}

function update_category(id_category, position) {
    $.ajax({
        data: $('#form_category').serialize(),
        url: '/product/category/update/' + id_category + '/',
        type: $('#form_category').attr('method'),
        success: function (response) {
            $('#item_list_'+response['id']).empty()
            $('#item_list_'+response['id']).append(
                "<td id='"+ position+"'><b>" + position  + "</b></td>"
                + set_item_list(response,position)
                + "</td>"
            ).addClass('table-success')
            let aux = 'hola mundo'
            $('#modal_category').modal('hide')
        },  
        error: function (error) {
            set_error_form(error)

        }
    })
}

function set_item_list(object,position) {
    item ="<td>" + object['name'] + "</td>"
        + "<td>" + object['description'] + "</td>"
        + "<td>" + object['work_section'] + "</td>"
        + "<td> <span class='badge  bg-success p-2'>Activo</span></td>"
        + "<td>"
        + "<button type='button' class='btn btn-outline-secondary btn-sm'  onclick='get_update_category("+ object['id']+","+position+")'><i class='bi bi-pencil'></i> Editar</button>"
        + " <button type='button' id='btn_delete_"+ object['id']+"' class='btn btn-outline-danger btn-sm'><i class='bi bi-trash '></i> Eliminar</button>"
    return item
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

function confirm_delete(name,id_category){
    $('#name_category').text(name);
    $('#btn_confirm_delete').attr('onclick', 'delete_category('+id_category+')')
    $('#modal_confirm').modal('show');
}


function clean_modal() {
    $('#title_modal').text('Crear nueva categorua')
    $('.is-invalid').removeClass('is-invalid')
    $("#form_category")[0].reset();
    $('#id_work_section option:selected').removeAttr('selected')
    $('#btn_add').removeClass('visually-hidden')
    $('#btn_upd').addClass('visually-hidden').removeAttr('onclick')
}