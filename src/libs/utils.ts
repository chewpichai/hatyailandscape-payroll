import moment from "moment-timezone";

export function getDateRange() {
  const now = moment().hour(0).minute(0);
  const day = now.date();
  if (day > 15)
    return [
      now.date(15).toDate(),
      now.date(1).add(1, "months").subtract(1, "days").toDate(),
    ];
  return [now.date(1).toDate(), now.date(15).toDate()];
}
