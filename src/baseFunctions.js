const moment = require("moment");

function getDate(date) {
  const dateInt = parseInt(date);

  switch (dateInt) {
    case 1:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");

      break;
    case 2:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 3:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 4:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 5:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 6:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 7:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 8:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 9:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 10:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 11:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;
    case 12:
      return moment()
        .month(dateInt - 1)
        .date(0)
        .format("YYYY-MM-DD HH:mm:ss.SSSSSS");
      break;

    default:
      break;
  }
}

function parseDataToString(date){
  const dateInt = date;
  return moment().month(dateInt - 1).format("MMMM")
}

module.exports = { getDate, parseDataToString };
