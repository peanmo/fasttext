export function dateFormat(dateTime:Date) {
  return dateTime.toLocaleString("en-GB", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(',', '');
}

// ฟังก์ชัน dateInputFormat
export function dateInputFormat(date:Date) {
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
}