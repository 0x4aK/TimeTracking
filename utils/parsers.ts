import { parse as parseDate } from "date-fns";

type UserData = { id: number; name: string };
type TimeStamp = { date: Date; type: EventType; userId: number };
export type Users = Map<number, UserData>;
export type UserTimeSpans = Map<number, TimeSpan[]>;
export type TimeSpan = { spanId: number; userId: number; start: Date; end: Date; active: boolean };

enum EventType {
  EXIT = 0,
  ENTRY = 1,
}

function parseWorker(words: string[]): [number, UserData] {
  const [, , id, name] = words;
  return [+id, { id: +id, name }];
}

function parseTimestamp(words: string[]): TimeStamp {
  const [timestamp, event, , , id, , , ,] = words;

  return {
    date: parseDate(timestamp, "kk:mm:ss dd.MM.yyyy", new Date()),
    type: event === "1" ? EventType.ENTRY : EventType.EXIT,
    userId: +id,
  };
}

export function parseCSV(data: string): [Users, UserTimeSpans] {
  const users: Users = new Map();
  const spans: UserTimeSpans = new Map();

  const timestamps: TimeStamp[] = [];

  for (const line of data.split("\r\n")) {
    const words = line.split(" ; ");
    switch (words.length) {
      case 4:
        users.set(...parseWorker(words));
        break;
      case 9:
        timestamps.push(parseTimestamp(words));
        break;
    }
  }

  const timestampIter = timestamps[Symbol.iterator]();
  let _id = 0;

  for (const entryTimeStamp of timestampIter) {
    if (entryTimeStamp.type !== EventType.ENTRY) continue;

    for (const exitTimeStamp of timestampIter) {
      if (exitTimeStamp.userId !== entryTimeStamp.userId) break;
      if (exitTimeStamp.type !== EventType.EXIT) continue;

      const span = reactive<TimeSpan>({
        spanId: _id++,
        userId: entryTimeStamp.userId,
        start: entryTimeStamp.date,
        end: exitTimeStamp.date,
        active: true,
      });

      spans.get(entryTimeStamp.userId)?.push(span) || spans.set(entryTimeStamp.userId, [span]);

      break;
    }
  }
  return [users, spans];
}
