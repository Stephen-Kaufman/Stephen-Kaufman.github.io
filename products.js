/*global $*/
/*global _*/
"use strict";
$(document).on('ready', function () {
    $.getJSON('data/product.json', function (products) {
        // ALL YOUR CODE GOES BELOW HERE //
        
        initView(products);
        showProducts(products);
       
    });
});

function initView(products) {
    // setting up parent container for products //
    $('<div>', {
        "id": "prod-container"
    }).appendTo("#container");
    
    // generate your filter dropdown: use reduce to summarize all types in data (reduce/Object.keys()) //
    var typeObj = _.reduce(products, function(seed, product){
        const type = product.type;
        if(type in seed) {
            seed[type]++;
        } else {
            seed[type] = 1;
        }
        return seed;
    });
    var typeArr = Object.keys(typeObj);
    
    _.map(typeArr, function(element, index, collection){
        //make li of array elements and give them a class
            return $("<li>").text(element)
                .addClass("li-filter")
                .attr('value', element)
                .appendTo(".dropdown-menu");
    });
    // listen for change to filter dropdown > on change, filter products, pass subset to showProducts() //
    $('.li-filter').on('click', function(event) {
        const $li = $(event.currentTarget);
        const $liValue = $(this).attr('value');
        // get type from value of li 
        
        var someProducts = _.filter(products, function(product) {
         //...filter using value of li
            if (product.type === $liValue) {
                return product;
            }
        });
        showProducts(someProducts);
    });
    // toggle product order based on price
    $("button").attr("id", "low-to-high")
        .appendTo(".navbar-header");
        $("input").prependTo("#container");
        

    $("button").on("click", function() {
            var clicks = $(this).data('clicks');
        console.log("clicked");
        function bubbleSort(products) {  
            var swapped;
            do {
                swapped = false;
                for (var i=0; i < products.length-1; i++) {
                    if (products[i].price > products[i+1].price) {
                        var temp = products[i];
                        products[i] = products[i+1];
                        products[i+1] = temp;
                        swapped = true;
                    }
                }
            } while (swapped);
            return products;
        }
        var sorted = bubbleSort(products);
        var revSort = sorted.slice().reverse();
        if (clicks) {
                showProducts(sorted);
            } else {
                showProducts(revSort);
            }
             $(this).data("clicks", !clicks);
      
    
    });
    
    
    // search function
    $("#search").keyup(function () {
        var search = $(this).val();
        $("#prod-container li").each(function () {
            if ($(this).text().search(new RegExp(search, "i")) < 0) {
                $(this).fadeOut();
            } else {
                $(this).show();
            }
        });
    });
}

//function to put the list of items on the page
function showProducts(products) {
    $('#prod-container')
        .empty()
        .append(createProductList(products));
}
//function to put list items in a list
function createProductList(products) {
    return $('<ul>')
        .attr('id', 'list-products')
        .addClass()
        .append(createProductListItems(products));
}

//function to create the list items dynamically
function createProductListItems(products) {
    return _.map(products, function(product) {
        return $('<li>')
            .addClass('item')
            .append($('<p>').text(`Item: ${product.desc}`))
            .append($('<p>').text(`Price: ${product.price}`))
            .append($('<p>').text(`Color: ${product.color}`).attr('class', 'details'))
            .append($('<p>').text(`Available Colors: ${product.availableColors}`).attr('class', 'details'))
            .append($('<p>').text(`Specifications: ${product.specs}`).attr('class', 'details'))
            .append($('<p>').text(`Number Remaining: ${product.stock}`).attr('class', 'details'))
            .prepend($('<img>')
            .attr('src', './img/product/thumbs/' + product.image)
            .addClass("phoneImg"));
    });
    
}

 // ALL YOUR CODE GOES ABOVE HERE //
