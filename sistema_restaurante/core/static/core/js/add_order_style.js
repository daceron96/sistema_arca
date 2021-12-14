function decrease_amount(){
    var amount = parseInt($('#amount').val());
    if(amount > 0){
        amount = amount - 1;
    }
    if(amount == 0){
        $('#btn_decrease_amount').prop("disabled",true);
        $('#btn_add_product').prop('disabled',true)
    }
    $('#amount').val(amount);
}
function increase_amount(){
    var amount = 0
    if($('#amount').val() == ""){
        amount = 0
    }else{
        amount = parseInt($('#amount').val());
    }

    amount = amount + 1
    $('#amount').val(amount);
    if(amount > 0 && $('#btn_decrease_amount').is(':disabled')){
        $('#btn_decrease_amount').prop("disabled",false);
    }
    if($('#btn_add_product').is(':disabled') && $('#amount').val() == 1){
        $('#btn_add_product').prop('disabled',false);
        console.log('entre')
    }
}
/*Funcion que añade dinamicamente un producto a la lista final de pedido */
function add_product_list(id_product){

    amount = $('#amount').val();
    $("#product_list").append(
        "<button class='list-group-item d-flex justify-content-between align-items-center' data-bs-toggle='modal'data-bs-target='#modal-item-add'>"
        + "Hamburguesa sencilla"
        + "<span class='badge bg-primary rounded-pill px-4'>"+amount+"</span>"
        + "</button>"
    );

}
function list_product(id){

    $('#list_product').empty();
    if(id == 1){
        $('#list_product').append(
            "<button type='button' class='list-group-item list-group-item-action' id='product_1' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('1')'><b>1. </b>Costilla Ahumada</button>"
            + "<button type='button' class='list-group-item list-group-item-action' id='product_2' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('2')'><b>2. </b>Costilla BBQ</button>"
            + "<button type='button' class='list-group-item list-group-item-action' id='product_3' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('3')'><b>3. </b>Lomo de res</button>"
            + "<button type='button' class='list-group-item list-group-item-action' id='product_4'  data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('4')'><b>4. </b>Pechuga a la plancha</button>"
            + "<button type='button' class='list-group-item list-group-item-action' id='product_5'  data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('5')'><b>5. </b>Lomo de cerdo</button>"
            + "<button type='button' class='list-group-item list-group-item-action' id='product_6'  data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('6')'><b>6. </b>Pechuga a la plancha especial</button>"
            + "<button type='button' class='list-group-item list-group-item-action' id='product_7'  data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('7')'><b>7. </b>Plato mixto (Res - Cerdo)</button>"
            + "<button type='button' class='list-group-item list-group-item-action' id='product_8'  data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('8')'><b>8. </b>Plato mixto (Res - Pollo)</button>"
            + "<button type='button' class='list-group-item list-group-item-action' id='product_9'  data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('9')'><b>9. </b>Plato mixto (Cerdo - Pollo)</button>"
        );
    }
    if(id == 4){
        $('#list_product').append(
            "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>1.</b> Hamburguesa sencilla</button>"
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>2.</b> Hamburguesa contocineta</button>" 
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>3.</b> Hamburguesa con pollo</button> "
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>4.</b> Hamburguesa con pollo y tocineta</button> "
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>5.</b> Hamburguesa con pollo y champiñones</button> "
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>6.</b> Hamburguesa con pollo parilla</button> "
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>7.</b> Hamburguesa con pollo parilla y tocineta</button>"
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>8.</b> Hamburguesa angus</button>"
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>9.</b> Hamburguesa angus doble</button>"
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>10.</b> Hamburguesa ranchera</button>"
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>11.</b> Hamburguesa doble carne</button>"
			+ "<button type='button' class='list-group-item list-group-item-action' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>12.</b> Hamburguesa doble carne tocineta</button>"
			+ "<button type='button' class='list-group-item list-group-item-action'data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='complete_modal('')'><b>13.</b> Hamburguesa super</button>"
	
        );
    }

}

