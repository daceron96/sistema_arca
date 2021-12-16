let query_data = []
let detail_order = []
/*Funcionalidad de disminuir la cantidad de productos a agregar en la lista final */
function decrease_quantity(){
    let quantity = parseInt($('#quantity').val());
    if(quantity > 0){
        quantity = quantity - 1;
    }
    if(quantity == 0){
        $('#btn_decrease_quantity').prop("disabled",true);
        $('#btn_add_product').prop('disabled',true)
    }
    $('#quantity').val(quantity);
}
/*Funcionalidad de aumentar la cantidad de productos a agregar en la lista final */

function increase_quantity(){
    let quantity = 0
    if($('#quantity').val() == ""){
        quantity = 0
    }else{
        quantity = parseInt($('#quantity').val());
    }

    quantity = quantity + 1
    $('#quantity').val(quantity);
    if(quantity > 0 && $('#btn_decrease_quantity').is(':disabled')){
        $('#btn_decrease_quantity').prop("disabled",false);
    }
    if($('#btn_add_product').is(':disabled') && $('#quantity').val() == 1){
        $('#btn_add_product').prop('disabled',false);
    }
}

/**funcion buscar lista de productos por categoria */
function list_product(id_category){
    /**vacia el div de lista de productos */
    $('#list_product').empty();
    /**recorre la lista e categorias y si encuentra una categoria con la clase active la quita */
    $('#div_categories button').each(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active')
        }
    })
    /**realiza la peticion ajax */
    $.ajax({
        url: '/order/get-products/',
        type: 'GET',
        data: {'id_category':id_category},
        dataType: 'json',
        success: function(data){
            if(data.length != 0){
                for(let i=0; i < data.length; i++){
                    let item ="<button type='button' class='list-group-item list-group-item-action' id='product_"+data[i]["fields"]["code"]+"' data-bs-toggle='modal' data-bs-target='#modal_add_product' onclick=complete_add_modal("+data[i]["fields"]["code"] +")><b>"+(i+1)+ ". </b>"+data[i]["fields"]["name"] +"</button>"
                    $('#list_product').append(item)
                }
            }else{
                $('#list_product').append("<h2 class='text-center '><b>No existe ningun producto para esta categoria</b></h2>")
            }
            $('#btn_categories_list_'+id_category).addClass('active');
            
            query_data  = data;
        }
    })
}
/*Cambia dinamicamnete el contenido del modal que añade el detalle de pedido */
function complete_add_modal(code_product){
    for(let i=0; i < query_data.length; i++){
        if(query_data[i]['fields']['code'] == code_product){
            $('#name_product').text(query_data[i]['fields']['name']);
            console.log(query_data[i])
            break;
        }
    }
}

