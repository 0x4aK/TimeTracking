import { parse as parseDate } from "date-fns";

export type TimeSpan = { id: number; start: Date; end: Date };
type WorkHours = Map<string, TimeSpan[]>;
type WorkerData = { id: number; name: string; hours: WorkHours };
export type Workers = Map<number, WorkerData>;

enum EventType {
  EXIT = 0,
  ENTRY = 1,
}

function parseWorker(words: string[]): [number, WorkerData] {
  const [, , id, name] = words;
  return [+id, { id: +id, name, hours: new Map() as WorkHours }];
}

type TimeStamp = { date: Date; type: EventType; id: number };
function parseTimestamp(words: string[]): TimeStamp {
  const [timestamp, event, , , id, , , ,] = words;

  return {
    date: parseDate(timestamp, "kk:mm:ss dd.MM.yyyy", new Date()),
    type: event === "1" ? EventType.ENTRY : EventType.EXIT,
    id: +id,
  };
}

function parseData(data: string): Workers {
  const workers: Workers = new Map();
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
    const workerData = workers.get(entryTimeStamp.id);
    if (!workerData) break;

    for (const exitTimeStamp of timestampIter) {
      if (exitTimeStamp.id !== entryTimeStamp.id) break;
      if (exitTimeStamp.type !== EventType.EXIT) continue;

      const date = entryTimeStamp.date.toDateString();
      const span = { id: _id++, start: entryTimeStamp.date, end: exitTimeStamp.date };

      const hoursIn = workerData.hours.get(date);
      if (hoursIn) hoursIn.push(span);
      else workerData.hours.set(date, [span]);

      break;
    }
  }
  return workers;
}

const setWorkersFromCSV = async (file: File) => {
  loading.value = true;
  try {
    const data = await readFile(file, "CP1252");
    workers.value = parseData(data);
  } finally {
    loading.value = false;
  }
};

const loading = ref(false);
const workers = shallowRef<Workers>(new Map());
const selected = ref<WorkerData | null>(null);

export const useWorkers = () => ({
  loading,
  workers,
  selected,
  setWorkersFromCSV,
});

const disabledSpans = reactive<Set<number>>(new Set());
const selectedHours = computed(() => (selected.value ? selected.value.hours : null));

export const useWorkHours = () => ({
  selectedHours,
  removeSpan: disabledSpans.delete,
  addSpan: disabledSpans.add,
  toggleSpan: (spanId: number) =>
    disabledSpans.has(spanId) ? disabledSpans.delete(spanId) : disabledSpans.add(spanId),
});
