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
					+"<a href='#' class='btn btn-primary btn-sm'><i class='bi-search'></i> Ver</a>"
					+"<a href='#' class='btn btn-warning btn-sm'><i class='bi bi-pencil'></i> Editar</a>"
					+"<a href='#' class='btn btn-danger btn-sm'><i class='bi bi-trash'></i> Eliminar</a>"
				+"</td>"
            )
        },
        error: function(error){
            console.log(error)

        }
    })
}