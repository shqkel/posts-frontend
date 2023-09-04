// Utils.js

const f = (n) => n < 10 ? '0' + n : n;
// export const formatDate =  (dateStr) => {
//   const d = new Date(dateStr); // KST로 자동 변환
//   return `${d.getFullYear()}-${f(d.getMonth() + 1)}-${f(d.getDate())} ${f(d.getHours())}:${f(d.getMinutes())}`;
// }
export const formatDateTime = (dates) => {
  return `${dates[0]}-${f(dates[1])}-${f(dates[2])} ${f(dates[3])}:${f(dates[4])}`;
}
export const formatDate = (dates) => {
  return `${dates[0]}-${f(dates[1])}-${f(dates[2])}`;
}