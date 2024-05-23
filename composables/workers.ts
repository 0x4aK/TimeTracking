import { getDay, parse as parseDate } from "date-fns";

export type TimeSpan = { spanId: number; workerId: number; start: Date; end: Date; active: boolean };
type WorkerData = { id: number; name: string };
export type Workers = Map<number, WorkerData>;
export type WorkerTimeSpans = Map<number, TimeSpan[]>;

enum EventType {
  EXIT = 0,
  ENTRY = 1,
}

function parseWorker(words: string[]): [number, WorkerData] {
  const [, , id, name] = words;
  return [+id, { id: +id, name }];
}

type TimeStamp = { date: Date; type: EventType; workerId: number };
function parseTimestamp(words: string[]): TimeStamp {
  const [timestamp, event, , , id, , , ,] = words;

  return {
    date: parseDate(timestamp, "kk:mm:ss dd.MM.yyyy", new Date()),
    type: event === "1" ? EventType.ENTRY : EventType.EXIT,
    workerId: +id,
  };
}

function parseData(data: string): [Workers, WorkerTimeSpans] {
  const workers: Workers = new Map();
  const spans: WorkerTimeSpans = new Map();

  const timestamps: TimeStamp[] = [];

  for (const line of data.split("\r\n")) {
    const words = line.split(" ; ");
    switch (words.length) {
      case 4:
        workers.set(...parseWorker(words));
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
      if (exitTimeStamp.workerId !== entryTimeStamp.workerId) break;
      if (exitTimeStamp.type !== EventType.EXIT) continue;

      const span = reactive<TimeSpan>({
        spanId: _id++,
        workerId: entryTimeStamp.workerId,
        start: entryTimeStamp.date,
        end: exitTimeStamp.date,
        active: true,
      });

      spans.get(entryTimeStamp.workerId)?.push(span) || spans.set(entryTimeStamp.workerId, [span]);

      break;
    }
  }
  return [workers, spans];
}

const setWorkersFromCSV = async (file: File) => {
  loading.value = true;
  try {
    const data = await readFile(file, "CP1252");
    [workers.value, timeSpans.value] = parseData(data);
  } finally {
    loading.value = false;
  }
};

const loading = ref(false);
const workers = shallowRef<Workers>(new Map());
const selectedWorker = ref<number | null>(null);
const selectedWorkerData = computed(() => (selectedWorker.value && workers.value.get(selectedWorker.value)) || null);

export const useWorkers = () => ({
  loading,
  workers,
  selectedWorker,
  selectedWorkerData,
  setWorkersFromCSV,
});

const timeSpans = shallowRef<WorkerTimeSpans>(new Map());

const selectedSpans = computed(() => {
  if (!selectedWorker.value) return null;
  return timeSpans.value.get(selectedWorker.value) || null;
});

const selectedWeek = ref<number | null>(null);
const spansByWeek = computed(() => {
  if (!selectedSpans.value) return null;

  return selectedSpans.value.reduce((spans, span) => {
    const week = getWeek(span.start);
    spans.get(week)?.push(span) || spans.set(week, [span]);
    return spans;
  }, new Map<number, TimeSpan[]>());
});
const selectedWeeksSpans = computed(() => {
  return (selectedWeek.value && spansByWeek.value?.get(selectedWeek.value)) || null;
});

const selectedDay = ref<number | null>(null);
const selectedWeeksSpansByDay = computed(() => {
  if (!selectedWeeksSpans.value) return null;
  return selectedWeeksSpans.value.reduce((spans, span) => {
    const day = getDay(span.start);
    spans.get(day)?.push(span) || spans.set(day, [span]);
    return spans;
  }, new Map<number, TimeSpan[]>());
});

export const useWorkHours = () => ({
  timeSpans,
  selectedWeek,
  selectedDay,
  spansByWeek,
  selectedWeeksSpans,
  selectedWeeksSpansByDay,
});
