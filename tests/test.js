const homeaway = require('../server/homeaway.js');
const expedia = require('../server/expedia.js');

get_activities('Austin', 'Texas', '2017-07-21', '2017-07-23',
	       function (act) {
		   console.log(act);
	       });

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
