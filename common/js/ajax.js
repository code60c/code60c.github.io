// Common AJAX function with jQuery
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
    $.ajax({
        url: url,
        type: method,
        headers: headers,
        data: data ? JSON.stringify(data) : null,
        dataType: dataType,
        contentType: contentType,
        success: function(response) {
            onSuccess(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            onError({ jqXHR, textStatus, errorThrown });
        },
        complete: function() {
            onFinally();
        }
    });
}
