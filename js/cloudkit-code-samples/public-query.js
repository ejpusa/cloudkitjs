function readQuery() {

        var container = CloudKit.getDefaultContainer();
        var publicDB = container.publicCloudDatabase;

        // Set up a query that sorts results in ascending distance from the
        // above location.
        var query = {
            recordType: 'Locations'
        };

        // Execute the query.
        return publicDB.performQuery(query)
            .then(function(response) {
                if (response.hasErrors) {
                    // Handle them in your app.
                    throw response.errors[0];
                } else {
                    var records = response.records;
                    var numberOfRecords = records.length;

                    if (numberOfRecords === 0) {
                        return render('No matching locations')
                    } else {
                        var startOfTable = "<table border=1>"
                        document.write(startOfTable);

                        var tableHead = "<tr><th style='width: 100px'>Place Name</th>";
                        tableHead += "<th>Category</th>";
                        tableHead += "<th>Address</th>";
                        tableHead += "<th>City</th>";
                        tableHead += "<th>State</th>";
                        tableHead += "<th style='width: 100px'>Zip Code</th>";
                        tableHead += "<th>Country</th>";
                        tableHead += "<th>Days and Hours</th>";
                        tableHead += "<th>Contact</th>";
                        tableHead += "<th>Phone</th>";
                        tableHead += "<th>Email</th>";
                        tableHead += "<th>Site</th>";
                        tableHead += "<th>Facebook</th>";
                        tableHead += "<th>Twitter</th>";
                        tableHead += "<th>Instagram</th>";
                        tableHead += "<th>Latitude</th>";
                        tableHead += "<th>Longitude</th>";
                        tableHead += "<th>Notes</th></tr>";

                        document.write(tableHead);

                        records.forEach(function(record) {
                            var fields = record.fields;
                            var tableActual = "<tr><td>" + fields['placeName'].value + "</td><td>" + fields['category'].value + "</td><td>" + fields['address'].value + "</td><td>" + fields['city'].value + "</td><td>" + fields['state'].value + "</td><td>" + fields['zipCode'].value + "</td><td>" + fields['country'].value + "</td><td>" + fields['daysHours'].value + "</td><td>" + fields['contact'].value + "</td><td>" + fields['phone'].value + "</td><td>" + fields['email'].value + "</td><td>" + fields['site'].value + "</td><td>" + fields['facebook'].value + "</td><td>" + fields['twitter'].value + "</td><td>" + fields['instagram'].value + "</td><td>" + fields['location'].value + "</td><td>" + fields['location'].value + "</td><td>" + fields['notes'].value + "</td></tr>"

                            document.write(tableActual)
                        });
                        var endOfTable = "</table>"
                        document.write(endOfTable)

                    }
                }
            });
    }