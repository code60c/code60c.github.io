// Common AJAX function with jQuery and linear progress indicator
function ajaxRequest({
    url,
    method = 'GET',
    headers = {},
    data = null,
    dataType = 'json',
    contentType = 'application/json',
    onSuccess = (response) => console.log(response),
    onError = (error) => console.error(error),
    onFinally = () => {}
}) {
    // Create a linear progress bar element
    let progressBar = $('<div class="progress">\
                            <div class="progress-bar progress-bar-striped progress-bar-animated" \
                                role="progressbar" style="width: 0%;" aria-valuenow="0" \
                                aria-valuemin="0" aria-valuemax="100"></div>\
                        </div>').appendTo('body');

    // Initialize progress to 0%
    progressBar.find('.progress-bar').css('width', '0%');

    $.ajax({
        url: url,
        type: method,
        headers: headers,
        data: data ? JSON.stringify(data) : null,
        dataType: dataType,
        contentType: contentType,
        xhr: function () {
            let xhr = new window.XMLHttpRequest();
            // Track upload progress for POST requests
            if (method.toUpperCase() === 'POST') {
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        let percentComplete = (evt.loaded / evt.total) * 100;
                        progressBar.find('.progress-bar').css('width', percentComplete + '%');
                    }
                }, false);
            }
            return xhr;
        },
        success: function(response) {
            onSuccess(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            onError({ jqXHR, textStatus, errorThrown });
        },
        complete: function() {
            progressBar.remove(); // Remove progress bar after request completes
            onFinally();
        }
    });
}

