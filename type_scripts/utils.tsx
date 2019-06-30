import * as $ from 'jquery'

export function postJSON(url, data) {
    // var dataStr = $.isPlainObject(data) || $.isArray(data) ? JSON.stringify(data) : data.toString();
    var dataStr = JSON.stringify(data); 

    return $.ajax({
        type: 'POST',
        url: url,
        data: dataStr,
        contentType: "application/json",
        dataType: 'json'
    });
}
