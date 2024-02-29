import dayjs from "dayjs";

/**
 * @desc 时间转换成字符类型
 * @param date 时间戳/时间/时间字符串
 * @param fmt 格式化 YYYY/MM/DD hh:mm:ss
 * @returns String
 */
export function formatDateToString(
  date?: Date | string | number,
  fmt: string = "YYYY/MM/DD"
) {
  if (!date) return "-";
  return dayjs(date).format(fmt);
}
export const wait = (timeout = 100) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

/**
 * 获取当天的日期
 * @returns
 */
export const getToday = (fmt = "YYYY-MM-DD") => {
  return formatDateToString(Date.now(), fmt);
};
