console.log("working fine");

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

$("#commentForm").submit(function (e) {
  e.preventDefault();

  let dt = new Date();
  let time =
    dt.getDay() + " " + monthNames[dt.getUTCMonth] + ", " + dt.getFullYear();

  $.ajax({
    data: $(this).serialize(),
    method: $(this).attr("method"),
    url: $(this).attr("action"),
    dataType: "json",
    success: function (res) {
      console.log("Comment saved to DB...");

      if (res.bool == true) {
        $("#review-res").html("Review added successfully");
        $(".hide-comment-form").hide();
        $(".add-review").hide();

        let _html =
          '<div class="single-comment justify-content-between d-flex mb-30">';
        _html += '<div class="user justify-content-between d-flex">';
        _html += '<div class="thumb text-center">';
        _html +=
          '<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E" alt="" />';
        _html += "<br>";
        _html +=
          '<a href="#" class="font-heading text-brand"> ' +
          res.context.user +
          "</a>";
        _html += "</div>";
        _html += '<div class="desc">';
        _html += '<div class="d-flex justify-content-between mb-10">';
        _html += '<div class="d-flex align-items-center">';
        _html += '<span class="font-xs text-muted">' + time + "</span>";
        _html += "</div>";
        _html += '<div class="product-rate d-inline-block">';
        _html += '<div class="product-rating" style="width: 100%"></div>';
        _html += " </div>";

        for (let i = 1; i <= res.context.rating; i++) {
          _html += '<i class="fas fa-star text-warning"></i>';
        }

        _html += "</div>";
        _html += '<p class="mb-10">' + res.context.review + "</p>";
        _html += "</div>";
        _html += "</div>";
        _html += "</div>";

        $(".comment-list").prepend(_html);
      }
    },
  });
});

$(document).ready(function () {
  $(".filter-checkbox, #price-filter-btn").on("click", function () {
    console.log("Checked out mahn!");

    let filter_object = {};

    let min_price = $("#max_price").attr("min");
    let max_price = $("#max_price").val();

    filter_object.min_price = min_price;
    filter_object.max_price = max_price;

    $(".filter-checkbox").each(function () {
      let filter_value = $(this).val();
      let filter_key = $(this).data("filter");

      console.log("Filter value is:", filter_value);
      console.log("Filter key is:", filter_key);

      filter_object[filter_key] = Array.from(
        document.querySelectorAll(
          "input[data-filter=" + filter_key + "]:checked"
        )
      ).map(function (element) {
        return element.value;
      });
    });

    console.log("Filter Object is: ", filter_object);
    $.ajax({
      url: "/filter-products",
      data: filter_object,
      dataType: "json",
      beforeSend: function () {
        console.log("Trying to filter products...");
      },
      success: function (response) {
        console.log(response.length);
        console.log("Data filtered successfuly...");
        $("#filtered-product").html(response.data);
      },
    });
  });

  $("#max_price").on("blur", function () {
    let min_price = $(this).attr("min");
    let max_price = $(this).attr("max");
    let current_price = $(this).val();

    // console.log("Current Price is:", current_price);
    // console.log("Max Price is:", max_price);
    // console.log("Min Price is:", min_price);

    if (
      current_price < parseInt(min_price) ||
      current_price > parseInt(max_price)
    ) {
      console.log("Price Error Occured");

      min_price = Math.round(min_price * 100) / 100;
      max_price = Math.round(max_price * 100) / 100;

      // console.log("################################################")
      // console.log("Max Price is:", max_Price);
      // console.log("Min Price is:", min_Price);
      alert("Price must be between $ " + min_price + " and $" + max_price);
      $(this).val(min_price);
      $("#range").val(min_price);

      $(this).focus();

      return false;
    }
  });

  // Add to cart functionality
  $(".add-to-cart-btn").on("click", function () {
    let this_val = $(this);
    let index = this_val.attr("data-index");

    let quantity = $(".product-quantity-" + index).val();
    let product_title = $(".product-title-" + index).val();

    let product_id = $(".product-id-" + index).val();
    let product_price = $(".current-product-price-" + index).text();

    let product_pid = $(".product-pid-" + index).val();
    let product_image = $(".product-image-" + index).val();

    console.log("Quantity:", quantity);
    console.log("Title:", product_title);
    console.log("Price:", product_price);
    console.log("ID:", product_id);
    console.log("PID:", product_pid);
    console.log("Image:", product_image);
    console.log("Index", index);
    console.log("Current Element:", this_val);

    $.ajax({
      url: "/add-to-cart",
      data: {
        id: product_id,
        pid: product_pid,
        image: product_image,
        qty: quantity,
        title: product_title,
        price: product_price,
      },
      dataType: "json",
      beforeSend: function () {
        console.log("Adding Product to Cart...");
      },
      success: function (response) {
        //this_val.html("<i class='fas fa-check-circle'></i>");
        this_val.html("Added Product to cart!");

        console.log("Added Product to Cart!");
        $(".cart-items-count").text(response.totalcartitems);
      },
    });
  });

  $(".delete-product").on("click", function () {
    let product_id = $(this).attr("data-product");
    let this_val = $(this);

    console.log("Product ID:", product_id);

    $.ajax({
        url: "/delete-from-cart",
        data: {
            "id": product_id
        },
        dataType: "json",
        beforeSend: function(){
            this_val.hide()
        },
        success: function(response){
            this_val.show()
            $(".cart-items-count").text(response.totalcartitems)
            $("#cart-list").html(response.data)
        },
    })
  });

  $(".update-product").on("click", function () {
    let product_id = $(this).attr("data-product");
    let this_val = $(this);
    let product_quantity = $(".product-qty-"+product_id).val()

    console.log("Product ID:", product_id);
    console.log("Product QTY:", product_quantity);

    $.ajax({
        url: "/update-cart",
        data: {
            "id": product_id,
            "qty": product_quantity,
        },
        dataType: "json",
        beforeSend: function(){
            this_val.hide()
        },
        success: function(response){
            this_val.show()
            $(".cart-items-count").text(response.totalcartitems)
            $("#cart-list").html(response.data)
        },
    })
  });

});
