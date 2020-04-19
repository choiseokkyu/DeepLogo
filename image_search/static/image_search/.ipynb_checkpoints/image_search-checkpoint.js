function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#profile-img-tag').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$("#profile-img").change(function () {
    readURL(this);
    let fileName = $(this).val().split('\\').pop();
    $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
});


function upload(event) {
    event.preventDefault();
    var data = new FormData($('#image_form').get(0));
    console.log(data)
    $.ajax({
        url: 'image_upload',
        type: 'POST',
        data: data,
        contentType: 'multipart/form-data',
        processData: false,
        contentType: false,
        beforeSend: function () {
            $('#results').empty()
            $('.wrap-loading').removeClass('display-none');
        },
        success: function (data) {
            $('#result_section').css('display', 'block');
            $('.wrap-loading').addClass('display-none');
            $.each(data, function (index, item) {
                var card_front = '<div class="col-md-3 col-sm-6 thumbnail-card">\n' +
                    '<div class="card h-100">\n' +
                    '<img class="card-img-top" src="/images/' + item.id + '" onerror="this.onerror=null; this.src=\'/static/image_search/images/default.png\'">\n' +
                    '<div class="card-body">\n' +
                    '<h5 class="card-title">' + item.id + '</h5>\n' +
                    '</div>\n' +
                    '</div>\n' +
                    '</div>';

                $('#results').append(card_front);
                    var offset = $("#result_section").offset();
                    $('html, body').animate({scrollTop: offset.top}, 400);
	    });
        }
    });
    return false;
}

$(function () {
    $('#image_form').submit(upload);
});
