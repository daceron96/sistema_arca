let detail_order = []
detail_order.total_price = 0
let product = []
let query_data = []


/*Funcionalidad de disminuir la cantidad de productos a agregar en la lista final */
function decrease_quantity(){
    let quantity = parseInt($('#quantity').val());
    if(quantity > 0){
        quantity = quantity - 1;
    }
    if(quantity == 0){
        $('#btn_decrease_quantity').prop("disabled",true);
        $('#btn_modal_product').prop('disabled',true)
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

    $('#quantity').val(quantity +1 );
   
    if($('#quantity').val() > 0 && $('#btn_decrease_quantity').is(':disabled')){
        $('#btn_decrease_quantity').prop("disabled",false);
    }
    if($('#btn_modal_product').is(':disabled') && $('#quantity').val() == 1){
        $('#btn_modal_product').prop('disabled',false);
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
        url: '/order/get-product/',
        type: 'GET',
        data: {'id_category':id_category},
        dataType: 'json',
        success: function(data){
            if(data.length != 0){
                for(let i=0; i < data.length; i++){
                    let item ="<button " 
                    +"class='list-group-item list-group-item-action' "
                    +"id='product_"+data[i]["fields"]["code"]+"' "
                    +"data-bs-toggle='modal' data-bs-target='#modal_add_product' "
                    +"onclick=complete_add_modal("+data[i]["fields"]["code"] +")>"
                    +"<b> "+(i+1)+". </b>"+data[i]["fields"]["name"]
                    +"</button>" 
                    $('#list_product').append(item)
                    $('#list_product').addClass('border-2 border-bottom')

                }
            }else{
                $('#list_product').append("<h2 class='text-center '><b>No existe ningun producto para esta categoria</b></h2>")
            }
            $('#btn_categories_list_'+id_category).addClass('active');

            query_data = data;
        }
    })
}
/*Cambia dinamicamnete el contenido del modal que añade el detalle de pedido */
function complete_add_modal(code_product){
    for(let i=0; i < query_data.length; i++){
        if(query_data[i]['fields']['code'] == code_product){
            $('#btn_decrease_quantity').prop("disabled",true);
            $('#quantity').val('');
            $('#order_comment').val('');
            $('#name_product').text(query_data[i]['fields']['name']);
            product = query_data[i]['fields']
            $('#btn_modal_product').attr('onclick','add_order_detail()')
            break;
        }
    }
    $('#btn_modal_product').prop('disabled',true)
    $('#btn_del_product').addClass('visually-hidden').prop('disabled',true);
    
}

/*Funcion que añade dinamicamente un producto a la lista final de pedido */
function add_order_detail(){
    let total_price = parseInt(($('#total_price').text()))
    quantity = $('#quantity').val();
    $("#detail_list").append(
        "<button class='list-group-item d-flex justify-content-between align-items-center' id='product_detail_"+product['code'] +"' onclick='complete_edit_modal("+product['code'] +")' data-bs-toggle='modal' data-bs-target='#modal_add_product'>"
        + product['name']
        + "<span class='badge bg-primary rounded-pill px-4' id='quantity_span_"+product['code']+"'>"+quantity+"</span>"
        + "</button>"
    );
    product.comment = $('#order_comment').val()
    product.quantity_product = quantity
    detail_order.push(product)
    detail_order.total_price = detail_order.total_price + (quantity * parseInt(product['sale_price']))
    product = []
    $('#total_price').empty().append("<h6><b>Total: </b>"+detail_order.total_price+"</h6>")
    $('#footer_order_list').removeClass('visually-hidden')
    $('#quantity').val('');
    $('#order_comment').val('');
    $('#btn_modal_product').prop('disabled',true).removeAttr('onclick');
    
}

/** Funcion completa el modal pareditar el detalle de orden */
function complete_edit_modal(code_product){

    for(let i=0; i < detail_order.length; i++){
        if(detail_order[i]['code'] == code_product){
            $('#btn_decrease_quantity').prop("disabled",false);
            $('#name_product').text(detail_order[i]['name']);
            $('#quantity').val(detail_order[i]['quantity_product']);
            $('#order_comment').val(detail_order[i]['comment']);
            $('#btn_modal_product').prop('disabled',false);
            $('#btn_del_product').removeClass('visually-hidden').attr('onclick','del_order_detail('+i+')').prop('disabled',false)
            $('#btn_modal_product').attr('onclick','edit_order_detail('+i+')')
            break;
        }
    }

}
/**Funcion que edita la lista de detalle de orden en sus parametros cantidad y comentarios */
function edit_order_detail(indice){
    let quantity_product = parseInt($('#quantity').val())
    if(quantity_product != detail_order[indice]['quantity_product']){
        detail_order.total_price = detail_order.total_price - (parseInt(detail_order[indice]['sale_price']) * parseInt(detail_order[indice]['quantity_product']))
        detail_order.total_price = detail_order.total_price + (parseInt(quantity_product) * detail_order[indice]['sale_price'])
    }
    detail_order[indice]['quantity_product'] = $('#quantity').val()
    detail_order[indice]['comment'] = $('#order_comment').val()
    $('#btn_modal_product').prop('disabled',true)
    $('#quantity_span_'+detail_order[indice]['code']).text($('#quantity').val())
    $('#total_price').empty().append("<h6><b>Total: </b>"+detail_order.total_price+"</h6>")
    
}
/*Eliminar detalle de producto en la lista de pedido*/
function del_order_detail(indice){
    $('#product_detail_'+detail_order[indice]['code']).remove()
    detail_order.total_price = detail_order.total_price - parseInt(detail_order[indice]['sale_price']) * parseInt(detail_order[indice]['quantity_product'])
    detail_order.splice(indice,1)
    $('#total_price').empty().append("<h6><b>Total: </b>"+detail_order.total_price+"</h6>")
    if(detail_order.length == 0){
        $('#footer_order_list').addClass('visually-hidden');
    }
}

function add_order(){
    $.ajax({
        
        data : {'data' : JSON.stringify(detail_order)},
        url: '/order/add-order',
        type : 'GET',
        
        success: function(){
            window.location =  "/desk-list"
        }

    });
}