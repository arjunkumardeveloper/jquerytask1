var products = [];
$(document).ready(function () {

    // Field Validation (Data type check)

    $('#sku').keypress(function () {
        if ((event.keyCode > 47) && (event.keyCode < 58)) {
            return true;
        }
        else {
            $('#error').html('SKU field should be integer. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
    });
    $('#price').keypress(function () {
        if ((event.keyCode > 47) && (event.keyCode < 58)) {
            return true;
        }
        else {
            $('#error').html('Price field should be integer. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
    });
    $('#qty').keypress(function () {
        if ((event.keyCode > 47) && (event.keyCode < 58)) {
            return true;
        }
        else {
            $('#error').html('Quantity field should be integer. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
    });
    $('#name').keypress(function () {
        if ((event.keyCode > 47) && (event.keyCode < 58)) {
            $('#error').html('Name field should be String. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else {

            return true;
        }
    });

    $('#submit').click(function () {

        // fetch value from input field

        var sku = $('#sku').val();
        var name = $('#name').val();
        var price = $('#price').val();
        var qty = $('#qty').val();

        // Empty input field validation


        if (sku == "") {
            $('#error').html('SKU filed is empty. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else if (name == "") {
            $('#error').html('Name field is empty. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else if (price == "") {
            $('#error').html('Price field is empty. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else if (qty == "") {
            $('#error').html('Quantity field is empty. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else {
            // create Object for containing field value

            pro = {};
            pro.sku = sku;
            pro.name = name;
            pro.price = price;
            pro.qty = qty;

            // Push object input in array
            
            
            if (products.length == 0) {
                products.push(pro);
                $('#success').css('display', 'block')
                    .html('Product Added Successfully. <a class="close">&times;</a>');
                $('.close').click(function () {
                    $('#success').css('display', 'none');
                });
                
            }
            else if ((products.length > 0)) {
                for(i = 0; i < products.length; i++)
                {
                    var id = products[i].sku;
                }
                if(id != sku)
                {

                    products.push(pro);
                    $('#success').css('display', 'block')
                    .html('Product Added Successfully. <a class="close">&times;</a>');
                    $('.close').click(function () {
                        $('#success').css('display', 'none');
                    });
                }
                else
                {
                    $('#error').css('display', 'block')
                    .html("SKU field can't be duplicate ! . <a class='close'>&times;</a>");
                    $('.close').click(function () {
                        $('#error').css('display', 'none');
                    });
                    return false;
                }
            }

            // Declear   function for insert value in table

            insertValue();

            // Declear function for clear input field value
        }
        formClear();
    });
});

// Define function for clear input field value

function formClear() {
    $('#sku').val('');
    $('#name').val('');
    $('#price').val('');
    $('#qty').val('');
}

// Define function for insert value into table

function insertValue() {
    var row = "";
    for (i = 0; i < products.length; i++) {
        row += "<tr><td>" + products[i].sku + "</td><td>" + products[i].name + "</td><td>" + "$ " + products[i].price + "</td><td>" + products[i].qty + "</td><td><a href='#' class='dr' onclick='deleteRow(" + i + ")'>Delete</a>||<a href='#' onclick='editRow(" + i + ")'>Edit</a></td></tr>";
        // console.log(i);
    }
    $('#data').html(row);
}

// Define function for delete specific row

function deleteRow(index) {
    if (confirm('Are You Sure Want To Delete...?')) {
        products.splice(index, 1);
        $('#success').html('Successfully Delete Your Product. <a class="close">&times;</a>')
            .css('display', 'block');
        $('.close').click(function () {
            $('#success').css('display', 'none');
        });

        var row = "";
        for (i = 0; i < products.length; i++) {
            row += "<tr><td>" + products[i].sku + "</td><td>" + products[i].name + "</td><td>" + "$ " + products[i].price + "</td><td>" + products[i].qty + "</td><td><a href='#' class='dr' onclick='deleteRow(" + i + ")'>Delete</a>||<a href='#' onclick='editRow(" + i + ")'>Edit</a></td></tr>";
        }
        $('#data').html(row);
    }
}

// Define function for edit specific row

function editRow(index) {
    // console.log(index);
    $('#sku').val(products[index].sku);
    $('#sku').attr('readonly', 'readonly');
    $('#sku').focus(function () {
        $('#error').html("You can't edit it, because it is a id. <a class='close'>&times;</a>")
            .css('display', 'block');
        $('.close').click(function () {
            $('#error').hide();
        });
    });
    $('#name').val(products[index].name);
    $('#price').val(products[index].price);
    $('#qty').val(products[index].qty);
    $('#submit').css('display', 'none');
    $('#updateRow').css('display', 'block');


    // alert(index + ", " + sku + ", " + name + ", " + price + ", " + qty);


    $('#updateRow').click(function () {

        var sku = $('#sku').val();
        $('#sku').removeAttr('readonly');
        $('#sku').focus(function () {
            $('#error').html("You can't edit it, because it is a id. <a class='close'>&times;</a>")
                .css('display', 'none');
        });
        var name = $('#name').val();
        var price = $('#price').val();
        var qty = $('#qty').val();

        if (sku == "") {
            $('#error').html('SKU filed is empty. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else if (name == "") {
            $('#error').html('Name field is empty. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else if (price == "") {
            $('#error').html('Price field is empty. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else if (qty == "") {
            $('#error').html('Quantity field is empty. <a class="close">&times;</a>')
                .css('display', 'block');
            $('.close').click(function () {
                $('#error').css('display', 'none');
            });
            return false;
        }
        else 
        {

            skuid = products.findIndex((pro => pro.sku == sku));
            
            products[skuid].sku = sku;
            products[skuid].name = name;
            products[skuid].price = price;
            products[skuid].qty = qty;
            
            
            $('#submit').css('display', 'block');
            $('#updateRow').css('display', 'none');
            $('#success').html('Successfully Update Your Product. <a class="close">&times;</a>')
            .css('display', 'block');
            
            $('.close').click(function () {
                $('#success').css('display', 'none');
            });
            
            var row = "";
            for (i = 0; i < products.length; i++) {
                row += "<tr><td>" + products[i].sku + "</td><td>" + products[i].name + "</td><td>" + "$ " + products[i].price + "</td><td>" + products[i].qty + "</td><td><a href='#' class='dr' onclick='deleteRow(" + i + ")'>Delete</a>||<a href='#' onclick='editRow(" + i + ")'>Edit</a></td></tr>";
                // console.log(i);
            }
            $('#data').html(row);
            
            // Declear function for clear input field value after update 
            
            // formUpdateClear();
        }
    });
}

// Define function for clear input field value after update

// function formUpdateClear() {
//     $('#sku').val('');
//     $('#name').val('');
//     $('#price').val('');
//     $('#qty').val('');
// }
