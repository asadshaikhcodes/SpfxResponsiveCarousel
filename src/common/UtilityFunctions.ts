export default class UtilityFunctions {
  constructor() {}
  public static convertToDate(dt) {
    let _dt = new Date(dt);
    return `${this.pad(_dt.getMonth() + 1, 2)}/${this.pad(
      _dt.getDate(),
      2
    )}/${_dt.getFullYear()}`;
  }
  public static convertToShortDate(dt) {
    debugger;
    let _dt = new Date(dt);
    return `${this.pad(_dt.getMonth() + 1, 2)}/${this.pad(_dt.getDate(), 2)}`;
  }
  public static pad(n, width, z?) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  public static findTimeDifference(
    timeInHr: string,
    timeInMin: string,
    timeOutHr: string,
    timeOutMin: string
  ) {
    let _t1 = parseInt(timeInHr);
    let _t2 = parseInt(timeInMin);
    let _t3 = parseInt(timeOutHr);
    let _t4 = parseInt(timeOutMin);

    if (isNaN(_t1) || isNaN(_t2) || isNaN(_t3) || isNaN(_t4)) {
      return "-1";
    }

    let startTime = new Date();
    startTime.setHours(_t1);
    startTime.setMinutes(_t2);

    let endTime = new Date();
    endTime.setHours(_t3);
    endTime.setMinutes(_t4);

    let diff: number = endTime.getTime() - startTime.getTime();
    let time = Math.round(diff / (1000 * 60));
    let hr = this.pad(Math.floor(time / 60), 2);
    let min = this.pad(time % 60, 2);
    return hr + ":" + min;
    //18026700/(1000*60*60)
  }
  public static removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split("?");
    if (urlparts.length >= 2) {
      var prefix = encodeURIComponent(parameter) + "=";
      var pars = urlparts[1].split(/[&;]/g);

      //reverse iteration as may be destructive
      for (var i = pars.length; i-- > 0; ) {
        //idiom for string.startsWith
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1);
        }
      }

      return urlparts[0] + (pars.length > 0 ? "?" + pars.join("&") : "");
    }
    return url;
  }
  public static isValidURL(str) {
    
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    
    return pattern.test(str);
  }
  public static isValidUrl(str){
    
    var pattern=new RegExp(
      "((http|https)://)?" + "[a-zA-Z0-9@:%._\\+~#?&//=]" + "{2,256}\\.[a-z]" + "{2,6}\\b([-a-zA-Z0-9@:%" + "._\\+~#?&//=]*)" 
    );
    
    return pattern.test(str)
  }
  public static getErrorMessage(err: string) {
    let errMessage: string = "";
    if (err.indexOf(">") > 0) {
      let splitError = err.split(">");
      if (splitError.length > 0) {
        let messageString = splitError[1].trim();
        let messageObj = JSON.parse(messageString);
        errMessage = messageObj["odata.error"].message.value || "";
      } else {
        errMessage = err;
      }
    } else {
      errMessage = err;
    }
    return errMessage;
  }

  public static getMontNameByNumber(month: number) {
    switch (month) {
      case 0:
        return "JAN";
        break;
      case 1:
        return "FEB";
        break;
      case 2:
        return "MAR";
        break;
      case 3:
        return "APR";
        break;
      case 4:
        return "MAY";
        break;
      case 5:
        return "JUN";
        break;
      case 6:
        return "JUL";
        break;
      case 7:
        return "AUG";
        break;
      case 8:
        return "SEP";
        break;
      case 9:
        return "OCT";
        break;
      case 10:
        return "NOV";
        break;
      case 11:
        return "DEC";
        break;
      default:
        break;
    }
  }
  public static getWeekDayNameByNumber(weekNum: number) {
    switch (weekNum) {
      case 0:
        return "SUN";
        break;
      case 1:
        return "MON";
        break;
      case 2:
        return "TUE";
        break;
      case 3:
        return "WED";
        break;
      case 4:
        return "THU";
        break;
      case 5:
        return "FRI";
        break;
      case 6:
        return "SAT";
        break;
      default:
        break;
    }
  }
  public static getWeekNumberFromWeekday(weekday: string) {
    switch (weekday.toLowerCase()) {
      case "sunday":
        return 0;
        break;
      case "monday":
        return 1;
        break;
      case "tuesday":
        return 2;
        break;
      case "wednesday":
        return 3;
        break;
      case "thursday":
        return 4;
        break;
      case "friday":
        return 5;
        break;
      case "saturday":
        return 6;
        break;
      default:
        break;
    }
  }
  public static treatAsUTC(date: any) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  }
  public static daysBetweenDates(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (
      (this.treatAsUTC(endDate).getTime() -
        this.treatAsUTC(startDate).getTime()) /
      millisecondsPerDay
    );
  }

  public static getUniQueValuesFromJSONArray(
    jsonArray,
    keyToSearch,
    type,
    jsonKey?
  ) {
    let returnArray = [];
    if (type == "JSON") {
      jsonArray.forEach((element, index) => {
        if (returnArray.indexOf(element[keyToSearch][jsonKey]) == -1) {
          returnArray.push(element[keyToSearch][jsonKey]);
        }
      });
    } else if (type == "string") {
      jsonArray.forEach((element, index) => {
        if (returnArray.indexOf(element[keyToSearch]) == -1) {
          returnArray.push(element[keyToSearch]);
        }
      });
    }
    return returnArray;
  }
  public static sortJSONArray(jsonArray, keyToSort, compareType) {
    if (compareType == "Date") {
      return jsonArray.sort((a, b) => {
        return Number(new Date(a[keyToSort])) - Number(new Date(b[keyToSort]));
      });
    }
  }

  public static getMonthNumberFromShortName(monthName: string): number {
    switch (monthName.toUpperCase()) {
      case "JAN":
        return 0;
        break;
      case "FEB":
        return 1;
        break;
      case "MAR":
        return 2;
        break;
      case "APR":
        return 3;
        break;
      case "MAY":
        return 4;
        break;
      case "JUN":
        return 5;
        break;
      case "JUL":
        return 6;
        break;
      case "AUG":
        return 7;
        break;
      case "SEP":
        return 8;
        break;
      case "OCT":
        return 9;
        break;
      case "NOV":
        return 10;
        break;
      case "DEC":
        return 11;
        break;
      default:
        break;
    }
  }
}
