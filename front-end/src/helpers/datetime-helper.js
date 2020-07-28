/*
  DatetimeHelper.js
*/

/*

  app_datetime_string(datetime)

  expects a Date object and returns a date in the app format  yyyy-mm-dd hh:mm:ss:zzz where length of each number is variable so mm may be just m, for instance.

*/

function app_datetime_string(datetime) {
    let returnString = "---------- --:--:--:---";
    if (datetime) {
	returnString = (datetime.getFullYear() + "-" +
		    (datetime.getMonth() + 1) + "-" +
 		    datetime.getDate() + " " +		
		    datetime.getHours() + ":" +
		    datetime.getMinutes() + ":" +
		    datetime.getSeconds() + ":" +
		    datetime.getMilliseconds() );
    }
    return returnString;
}


/*

  milliseconds_for_app_datetime_milliseconds(datetime_string) 

  expects an app-formatted datetime and returns unix datetime milliseconds

*/

function app_datetime_milliseconds(app_datetime_string) {
    const split_time_string = app_datetime_string.split(":");
    const new_date_string = split_time_string[0] +
	  ":" + split_time_string[1] +
	  ":" + split_time_string[2];
    return Date.parse(new_date_string) + parseInt(split_time_string[3]);
};


export {
    app_datetime_string,  
    app_datetime_milliseconds,
};

