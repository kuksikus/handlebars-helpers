(function(Handlebars) {

	// IF $1 OR $2
	// {{#ifor type_id offer_id}}
	Handlebars.registerHelper('ifor', function(i1, i2, block) {
		if(i1 || i2) {
			return block.fn(this);
		} else {
			return block.inverse(this);
		}
	});

	// IF $1 == $2
	// {{#ifequals type_id "2"}}
	Handlebars.registerHelper('ifequals', function(i1, i2, block) {
		if(i1 == i2) {
			return block.fn(this);
		} else {
			return block.inverse(this);
		}
	});

	// Date Format from unix timestamp to date
	// {{dateformat timestamp}} // 10.11.2012
	// {{dateformat timestamp "rus"}} // 10 декабря 2012
	Handlebars.registerHelper('dateformat', function(ts, type) {

		if (typeof(type) == 'undefined' || typeof(type) == 'object') {
			type = 'date';
		}

		ts = ts * 1;
		if(!isNaN(ts)) {
			var date = new Date(ts * 1000);

			var day = date.getDate();
			var month = date.getMonth();
			var year = date.getFullYear();

			var rus_months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

			if (type == 'date') {
				var date_string = day+'.'+month+'.'+year;
			} else if (type == 'rus') {
				var date_string = day+' '+rus_months[month]+' '+year;
			}
			return date_string;
		}
		return '';
	});

	Handlebars.registerHelper('nl2br', function(str) {
		str = str.replace(/([^>])\n{2,}/g, '$1<br><br>');
		str = str.replace(/([^>])\n/g, '$1<br>');
		return str;
	});
	
	// Loop index
	// {{#loop "5"}}
	// 		{{index}} // 0 1 2 3 4
	// {{/loop}}

	// {{#loop "5" "3"}}
	// 		{{index}} // 3 4 5 6 7
	// {{/loop}}
	Handlebars.registerHelper("loop", function(loop, start, block) {

		// if start not set
		if (typeof(start) == 'object') {
			block = start;
			start = 0;
		} else {
			start = start * 1;
			loop = loop * 1;
			loop = start + loop;
		}

		var ret = '';
		for (var i = start; i < loop; i++) {
			ret = ret + block.fn({index: i});
		}
		return ret;
	});

	


})(Handlebars);