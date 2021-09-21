var price, crust_price, topping_price;
let total = 0;
function Getpizza(name, size, crust, topping, total) {
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
    this.total = total;
}

// proceed to the next step button
$(document).ready(function () {
    $("button.proceed").click(function (event) {
        let pname = $(".name option:selected").val();
        let psize = $("#size option:selected").val();
        let pcrust = $("#crust option:selected").val();
        let ptopping = [];
        $.each($("input[name='toppings']:checked"), function () {
            ptopping.push($(this).val());
        });
        console.log(ptopping.join(", "));

        if( psize == "large"){
            price = 1200;
            console.log("The price is Ksh." +price);
          }
          else if( psize == "medium"){
            price = 850;
            console.log("The price is Ksh." +price);
          }
          else if( psize == "small"){
            price = 600;
            console.log("The price is Ksh." +price);
          }
          else{
            price = 0;
          }
        switch (pcrust) {
            case "0":
                crust_price = 0;
                break;
            case "Crispy":
                crust_price = 200;
                break;
            case "Stuffed":
                crust_price = 250;
                break;
            case "Gluten-free":
                crust_price = 180;
                break;
            default:
                console.log("No price");
        }
        let topping_value = ptopping.length * 50;
        console.log("toppins value" + topping_value);

        if ((psize == "0") && (pcrust == "0")) {
            console.log("nothing selected");
            $("button.proceed").show();
            $("#information").show();
            $("div.choise").hide();
            alert("Please select pizza size and crust");
        }
        else {
            $("button.proceed").hide();
            $("#information").hide();
            $("div.choise").slideDown(1000);
        }

        total = price + crust_price + topping_value;
        console.log(total);
        let checkoutTotal = 0;
        checkoutTotal = checkoutTotal + total;

        $("#pizzaname").html($(".name option:selected").val());
        $("#pizzasize").html($("#size option:selected").val());
        $("#pizzacrust").html($("#crust option:selected").val());
        $("#pizzatopping").html(ptopping.join(", "));
        $("#totals").html(total);
        // Addition of pizza button
        $("button.addPizza").click(function () {
            let pname = $(".name option:selected").val();
            let psize = $("#size option:selected").val();
            let pcrust = $("#crust option:selected").val();
            let ptopping = [];
            $.each($("input[name='toppings']:checked"), function () {
                ptopping.push($(this).val());
            });
            console.log(ptopping.join(", "));
            if (psize == "large") {
                price = 1200;
                console.log("The price is Ksh." + price);
            }
            else if (psize == "medium") {
                price = 850;
                console.log("The price is Ksh." + price);
            }
            else if (psize == "small") {
                price = 600;
                console.log("The price is Ksh." + price);
            }
            else {
                price = 0;
            }
            switch (pcrust) {
                case "0":
                    crust_price = 0;
                    break;
                case "Crispy":
                    crust_price = 200;
                    break;
                case "Stuffed":
                    crust_price = 150;
                    break;
                case "Gluten-free":
                    crust_price = 180;
                    break;
                default:
                    console.log("No price");
            }
            let topping_value = ptopping.length * 50;
            console.log("toppins value" + topping_value);
            total = price + crust_price + topping_value;
            console.log(total);

            checkoutTotal = checkoutTotal + total;
            console.log(checkoutTotal);
            // constractor function
            var newOrder = new Getpizza(pname, psize, pcrust, ptopping, total);

            $("#ordersmade").append('<tr><td id="pizzaname">' + newOrder.name + '</td><td id="pizzasize">' + newOrder.size + '</td><td id="pizzacrust">' + newOrder.crust + '</td><td id="pizzatopping">' + newOrder.topping + '</td><td id="totals">' + newOrder.total + '</td></tr>');
            console.log(newOrder);
        });

        // Checkout button
        $("button#checkout").click(function () {
            $("button#checkout").hide();
            $("button.addPizza").hide();
            $("button.deliver").slideDown(1000);
            $("#addedprice").slideDown(1000);
            console.log("Your total bills is Ksh." + checkoutTotal);
            $("#pizzatotal").append("Your bill is Ksh." + checkoutTotal);
        });

        // home delivery button
        $("button.deliver").click(function () {
            $(".pizzatable").hide();
            $(".choise h2").hide();
            $(".delivery").slideDown(1000);
            $("#addedprice").hide();
            $("button.deliver").hide();
            $("#pizzatotal").hide();
            let deliveryAmount = checkoutTotal + 150;
            console.log("You will pay Ksh. " + deliveryAmount + " on delivery");
            $("#totalbill").append("Your bill plus delivery fee is Ksh." + deliveryAmount);
        });

        // when one clicks place order button
        $("button#final-order").click(function (event) {
            event.preventDefault();

            $("#pizzatotal").hide();
            $(".delivery").hide();
            $("button#final-order").hide();
            let deliveryAmount = checkoutTotal + 150;
            console.log("Final Bill is Ksh." + deliveryAmount);
            let person = $("input#name").val();
            let phone = $("input#phone").val();
            let location = $("input#location").val();

            if ($("input#name").val() && $("input#phone").val() && $("input#location").val() != "") {

                $("#finallmessage").append("Dear " + person + ", we have recieved your order which should be delivered to you at " + location + ". Pay Ksh." + deliveryAmount + " upon delivery.");
                $("#totalbill").hide();
                $("#finallmessage").slideDown(1200);
            }
            else {
                swal("Please fill in these details for successful delivery!");
                $(".delivery").show();
                $("button#final-order").show();
            }
        });
        event.preventDefault();
    });
});