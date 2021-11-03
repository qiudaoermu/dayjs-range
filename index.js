/**
 * 根据 年份 和 季度  月度的 第一天 和 季度 最后 一天
 * @param {timeStamp} string
 * @param type {string} [month, quartor, year]
 * @return {string} 2020-10-01 - 2020-10-31
 */
export default (option, dayjsClass, dayjsFactory) => {
  dayjsFactory.getTimeBorder = getTimeBorder
}
const getQuartorStartDate = (d) => {
  const month = d.getMonth();
  const year = d.getFullYear();
  const quarterRange = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ];
  let startMonth = 1;
  let endMonth = 1;
  quarterRange.forEach((element) => {
    if (element.includes(month)) {
      startMonth = element.shift();
      endMonth = startMonth + 2;
    }
  });
  const startDate =
    d.getFullYear() + "-" + formatDate(startMonth) + '-' + '0' + d.getDate();
  const endDate =
    d.getFullYear() +
    "-" +
    formatDate(endMonth) +
    "-" +
    new Date(year, endMonth, 0).getDate();
  return {
    startDate,
    endDate,
  };
};


const getMonthStartDate = (d) => {
  let startMon;
  let month = d.getMonth();
  startMon = formatDate(month);
  let lastDay = new Date(d.getTime() - 1000 * 60 * 60 * 24).getDate(); // 获取当月最后一天日期
  let startDate = d.getFullYear() + "-" + startMon + "-" + "0" + d.getDate();
  let endDate = d.getFullYear() + "-" + startMon + "-" + lastDay;
  return {
    startDate,
    endDate,
  };
};

const getYearStartDate = (d) => {
  const year = d.getFullYear();
  let startMon = "01";
  let endMonth = "12";
  let startDate = d.getFullYear() + "-" + startMon + "-" + "0" + d.getDate();
  let endDate = d.getFullYear() + 
      "-" + endMonth + 
      "-" + new Date(year, endMonth, 0).getDate();;
  return {
    startDate,
    endDate,
  };
};

const getTimeBorder = (timeStamp = "", type) => {
  let date = timeStamp ? new Date(timeStamp) : new Date();
  let month = date.getMonth() + 1;
  var d = new Date(date.getFullYear(), month, 1); // 取当年当月中的第一天
  if (type === "year") {
    return getYearStartDate(d);
  }

  if (type === "month") {
    return getMonthStartDate(d);
  }

  if (type === "quartor") {
    return getQuartorStartDate(d);
  }
};
// 格式化月和日为MM、dd
const formatDate = (value) => {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
};
