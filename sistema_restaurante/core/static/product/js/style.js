function create_product(){
    $.ajax({
        data : $('#form_product').serialize(),
        url : $('#form_product').attr('action'),
        type : $('#form_product').attr('method'),
        success: function(response){
            console.log(response)
            $('#body_table').append(
                '<tr>'
                    +"<th scope='row'>"+response['code'] +"</th>"
                    +"<td>"+response['name']+"</td>"
                    +"<td>"+response['sale_price']+"</td>"
                    +"<td> <span class='badge  bg-success'>Activo</span></td>"
                    +"<td>"+response['category']+"</td>"
                    +"<td>"
                        + "<a href='#' class='btn btn-warning btn-sm text-white'><i class='bi bi-pencil'></i> Editar </a>"
                        + "<a href='#' class='btn btn-danger btn-sm'><i class='bi bi-trash'></i> Eliminar </a>"
                    +"</td>"
                +"</tr>"
            )
            $('#modal_product').modal('hide')
        },
        error: function(error){
            console.log(error)
            let errors = Object.keys(error.responseJSON.error)
            $('.is-invalid').removeClass('is-invalid')
            for(let item in errors){
                $('#invalid_'+errors[item]).empty()
                $('#id_'+errors[item]).addClass('is-invalid')
                $('#invalid_'+errors[item]).append(error.responseJSON.error[errors[item]])
            }


        }
    })
}