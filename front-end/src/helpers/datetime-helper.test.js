import { DatetimeHelper } from "../helpers";


describe("DatetimeHelper.app_datetime_string(date_object)", () => {
    it("takes a Date object and returns app-formatted datetime", () => {
	let date_object = new Date("2020-7-9 14:25:40");
	expect(DatetimeHelper.app_datetime_string(date_object))
	    .toBe("2020-7-9 14:25:40:0");
	date_object = new Date("2020-12-19 4:15:04");
	expect(DatetimeHelper.app_datetime_string(date_object))
	    .toBe("2020-12-19 4:15:4:0");
    });
    
    test("takes falsey values and returns app-formatted dashes", () => {
	expect(DatetimeHelper.app_datetime_string(null))
	    .toBe("---------- --:--:--:---");
	expect(DatetimeHelper.app_datetime_string(undefined))
	    .toBe("---------- --:--:--:---");	
    });
});

describe("DatetimeHelper.app_datetime_milliseconds()", () => {
    it("returns correct milliseconds for the string", () => {
	let datetime_string = "2020-7-9 14:25:40:9";
	expect(DatetimeHelper.app_datetime_milliseconds(datetime_string))
	    .toBe(new Date("2020-7-9 14:25:40").getTime() + 9);
	datetime_string = "2020-10-19 4:5:4:90";
	expect(DatetimeHelper.app_datetime_milliseconds(datetime_string))
	    .toBe(new Date("2020-10-19 4:5:4").getTime() + 90);
    });
});    
 
