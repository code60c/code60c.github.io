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

// POST request with data and alert message on success
ajaxRequest({
    url: '/api/submit-data',
    method: 'POST',
    data: { key1: 'value1', key2: 'value2' },
    onSuccess: (response) => {
        console.log('Data submitted successfully:', response);
        alert('Data submitted successfully!');
    },
    onError: (error) => console.error('Error occurred:', error)
});
