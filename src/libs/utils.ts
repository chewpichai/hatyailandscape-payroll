import dayjs from "dayjs";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

export function getDateRange() {
  const now = dayjs().hour(0).minute(0).second(0);
  const day = now.date();
  if (day > 15)
    return [
      now.date(15).toDate(),
      now.date(1).add(1, "months").subtract(1, "days").toDate(),
    ];
  return [now.date(1).toDate(), now.date(15).toDate()];
}

export function getPath(path: string) {
  return `${BASE_PATH}${path}`;
}
