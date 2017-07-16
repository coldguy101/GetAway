var request = require('request');

exports.get_activities = function get_activities(city, state, start_date, end_date, callback) {
    var expedia_url = 'https://www.expedia.com/lx/api/search';

    var expedia_params = {
	publishUIS: true,
	locale: 'en_US',
	poiEnabled: false,
	userQualifiedForAirMip: true,
	filterAirportTransfers: true,
	essLXActivitiesNearCurrentLocationEnabled: false,
	slimSearchEnabled: true,
	srpRedesignMVT: 0,
	mplcFreeCancellation:  false,
	dealsFilterEnabled:  false,
	mplcLandmarkFilterEnabled:  false,
	romeNewCategoryMvt:  0,
	mplcFiltersVisualMvt:  true,
	expertPicks: true,
	categorySort: true,
	shortDescEnabled:  true,
	familyFilterFlagEnabled: true,
	likelyToSelloutEnabled:  true,
	location: '',
	startDate: '',
	endDate: '',
	siteid: 1,
	countryCode: 'US'
    };

    expedia_params.location = city + ', ' + state;
    expedia_params.startDate = start_date;
    expedia_params.endDate = end_date;

    request({url:expedia_url, qs:expedia_params}, function (err, resp, body) {
	if (err) {
	    console.log(err);
	    return;
	}
	callback(JSON.parse(body));
    });
}

get_activities('Austin', 'Texas', '2017-07-21', '2017-07-23', function (act) {
    console.log(act);
});
