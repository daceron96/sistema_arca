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
                    +"id='product_"+data[i]["code"]+"' "
                    +"data-bs-toggle='modal' data-bs-target='#modal_add_product' "
                    +"onclick=complete_add_modal("+data[i]["code"] +")>"
                    +"<b> "+(i+1)+". </b>"+data[i]["name"]
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
        if(query_data[i]['code'] == code_product){
            $('#btn_decrease_quantity').prop("disabled",true);
            $('#quantity').val('');
            $('#order_comment').val('');
            $('#name_product').text(query_data[i]['name']);
            product = query_data[i]
            $('#btn_modal_product').attr('onclick','add_order_detail()')
            break;
        }
    }
    $('#btn_modal_product').prop('disabled',true)
    $('#btn_del_product').addClass('visually-hidden').prop('disabled',true);
    
}

/*Funcion que añade dinamicamente un producto a la lista final de pedido */
function add_order_detail(){
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
    $('#btn_send_order').removeClass('disabled')
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
    if(detail_order.total_price == 0){
        $('#btn_send_order').addClass('disabled');
    }
}

function add_order(table){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $.ajax({
        
        data : {'data' : JSON.stringify(detail_order),
                'total_price' : JSON.stringify(detail_order.total_price),
                'table':table, 
            },
        url: '/order/create/',
        type : 'POST',
        headers: {'X-CSRFToken': csrftoken},        
        success: function(){
            window.location =  "/order/table-list"
        }

    });
}

function update_order(id_order){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $.ajax({
        
        data : {'data' : JSON.stringify(detail_order),
                'total_price' : JSON.stringify(detail_order.total_price),
            },
        url: '/order/update-order/'+id_order+'/',
        type : 'POST',
        headers: {'X-CSRFToken': csrftoken},        
        success: function(){
            window.location =  "/order/table-list"
        }

    });
}



function get_detail_order(pk, code){
    let bandera = false
    for(let i=0; i < detail_order.length; i++){
        if(parseInt(detail_order[i]['code']) == code ){
            complete_edit_modal(code)
            $('#modal_add_product').modal('show');
            bandera = true
            break;
        }
    }
    if (!bandera){
        $.ajax({
            data : {'pk':pk},
            url : '/order/get-detail',
            type : 'GET',
            success: function(response){
                detail_order.push(response)
                complete_edit_modal(response['code'])
                $('#cancel_detail').attr('onclick',"cancellation_confirmation("+response['code']+")")
                $('#modal_add_product').modal('show');

            }
        })
    }
    
}

function cancel_detail(position){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $.ajax({
        data : {'comment': $('#comment_cancel').val()},
        url : '/order/cancel-detail/'+detail_order[position]['id_detail']+'/',
        type : 'POST',
        headers: {'X-CSRFToken': csrftoken},        
        success: function(response){
            del_order_detail(position)
            $('#modal_confirm').modal('hide');
        }
    })
}

function cancellation_confirmation(code){
   
    for(var i=0; i < detail_order.length; i++){
        if(detail_order[i]['code'] == code){
            $('#name_product_confirm').text(detail_order[i]['name'])
            break;
        }
    }
    $('#btn_confirm_cancel').attr('onclick',"cancel_detail("+i+")")
    $('#modal_confirm').modal('show');

}
