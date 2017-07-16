var request = require('request');

function next_page(next, heads, list, done) {
    if (!next) {
	done(list)
    } else {
	var options = {
	    url: next,
	    headers: heads
	}
	request(options, function (err, resp, body) {
	    if (err) {
		console.log(err);
		return;
	    }

	    data = JSON.parse(body);
	    list = list.concat(data.entries);
	    next_page(data.nextPage, heads, list, done);
	});
    }
}

function get_homes(city, state, start_date, end_date,
		   lat, lon, dist, callback) {
    var homeaway_auth_url = 'https://ws.homeaway.com/oauth/token';
    var properties = [];

    request.post(homeaway_auth_url, function (err, resp, body) {
	if (err) {
	    console.log(err);
	    return;
	}

	auth = JSON.parse(body);

	var homeaway_url = 'https://ws.homeaway.com/public/search';

	var hw_params = {
	    availabilityStart: start_date,
	    availabilityEnd: end_date,
	    // centerPointLatitude: 0,
	    // centerPointLongitude: 0,
	    // distanceInKm: 0,
	    q: city + ', ' + state,
	    pageSize: 30,
	};

	if (lat && lon && dist) {
	    hw_params.centerPointLatitude = lat;
	    hw_params.centerPointLongitude = lon;
	    hw_params.distanceInKm = dist * 1.609344;
	}

	var options = {
	    url: homeaway_url,
	    qs: hw_params,
	    headers: {
		'Authorization': 'Bearer ' + auth.access_token
	    }
	};

	request(options, function (err, resp, body) {
	    if (err) {
		console.log(err);
		return;
	    }

	    data = JSON.parse(body);
	    properties = properties.concat(data.entries);

	    next_page(data.nextPage, options.headers, properties, callback);
	});
    }).auth('55c23d2c-05a0-4c05-af67-7953d2aa1de0',
	    '99e2747e-556c-4730-b033-cda6acb70a7e');
}

get_homes('Austin', 'Texas', '2017-07-21', '2017-07-23',
	  null, null, null, function (props) {
	      console.log(props);
	      console.log(props.length);
	  });

get_homes('Austin', 'Texas', '2017-07-21', '2017-07-23',
	  30.286519, -97.745220, 1, function (props) {
	      console.log(props);
	      console.log(props.length);
	  });
