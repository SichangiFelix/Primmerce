console.log("working fine");

const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

$("#commentForm").submit(function(e){
    e.preventDefault();

    let dt = new Date();
    let time = dt.getDay() + " " + monthNames[dt.getUTCMonth] + ", " + dt.getFullYear()

    $.ajax({
        data: $(this).serialize(),
        method: $(this).attr("method"),
        url: $(this).attr("action"),
        dataType: "json",
        success: function(res){
            console.log("Comment saved to DB...")

            if(res.bool == true){
                $("#review-res").html("Review added successfully")
                $(".hide-comment-form").hide()
                $(".add-review").hide()

                let _html = '<div class="single-comment justify-content-between d-flex mb-30">'
                    _html += '<div class="user justify-content-between d-flex">'
                    _html += '<div class="thumb text-center">'
                        _html += '<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E" alt="" />'
                            _html += '<br>'
                        _html += '<a href="#" class="font-heading text-brand"> '+ res.context.user +'</a>'
                    _html += '</div>'
                    _html += '<div class="desc">'
                        _html += '<div class="d-flex justify-content-between mb-10">'
                            _html += '<div class="d-flex align-items-center">'
                                _html += '<span class="font-xs text-muted">' + time + '</span>'
                            _html += '</div>'
                            _html += '<div class="product-rate d-inline-block">'
                                _html += '<div class="product-rating" style="width: 100%"></div>'
                           _html += ' </div>'

                           for(let i = 1; i<= res.context.rating; i++){
                            _html += '<i class="fas fa-star text-warning"></i>'
                           }

                        _html += '</div>'
                        _html += '<p class="mb-10">' + res.context.review + '</p>'
                    _html += '</div>'
                _html += '</div>'
            _html += '</div>'

            $(".comment-list").prepend(_html)
            }
        }
    })

})