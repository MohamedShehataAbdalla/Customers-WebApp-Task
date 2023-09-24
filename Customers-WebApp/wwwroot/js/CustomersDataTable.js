$(document).ready(function () {
    $('#CustomersTable').dataTable({
        "serverSide": true,
        "filter": true,
        "ajax": {
            "url": "/api/customers",
            "type": "POST",
            "datatype": "json",
        },
        "columnDefs": [{
            "targets": [0, 5, 10, 11],
            "visible": false,
            "searchable": true,
        }],
        "columns": [
            { "data": "id", "name": "Id", "autowidth": true },
            { "data": "firstName", "name": "FirstName", "autowidth": true },
            { "data": "lastName", "name": "LastName", "autowidth": true },
            { "data": "email", "name": "Email", "autowidth": true },
            { "data": "phone", "name": "Phone", "autowidth": true },
            { "data": "gender", "name": "Gender", "autowidth": true },
            { "data": "dateOfBirth", "name": "DateOfBirth", "autowidth": true, "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        var dateOfBirth = new Date(data);
                        return dateOfBirth.toLocaleDateString();
                    }
                    return data;
                }
            },
            { "data": "accountBalance", "name": "AccountBalance", "autowidth": true, "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        var balance = parseFloat(data);

                        if (!isNaN(balance)) {
                            return balance.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            });
                        }
                    }
                    return data;
                }
            },
            {
                "data": "image", "name": "Image", "autowidth": true, "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        return '<img src="' + data + '" class="img-thumbnail" style="height:50px; width:50px;" />';
                    }
                    return data;
                }
            },
            { "data": "city", "name": "City", "autowidth": true },
            { "data": "zipCode", "name": "ZipCode", "autowidth": true },
            { "data": "address", "name": "Address", "autowidth": true },
            {
                "data": "active", "name": "Active", "autowidth": true, "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        if (data === true) {
                            return '<span class="badge rounded-pill bg-success">Success</span>';
                        } else {
                            return '<span class="badge rounded-pill bg-warning">Warning</span>';
                        }
                    }
                    return data; 
                }
            },
            { "render": function (data, type, row) { return '<a href="" class="btn btn-info btn-sm" onclick=DetailsCustomer("' + row.id + '") ><i class="bi bi-binoculars"></i> View</a>' }, "orderable": false },
            //{ "render": function (data, type, row) { return '<a href="" class="btn btn-info btn-sm" onclick=DetailsCustomer("' + row.id + '") ><i class="bi bi-binoculars"></i> View</a> <a href="" class="btn btn-warning btn-sm" onclick=EditCustomer("' + row.id + '") ><i class="bi bi-pencil"></i> Edit</a> <a href="" class="btn btn-danger btn-sm" onclick=DeleteCustomer("' + row.id + '") ><i class="bi bi-trash3"></i> Delete</a>' }, "orderable": false },
        ],
    });
});