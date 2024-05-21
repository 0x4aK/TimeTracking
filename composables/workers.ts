type WorkHours = Map<string, { start: Date; end: Date }[]>;
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
  const [timestampRaw, event, , , id, , , ,] = words;
  const [time, date] = timestampRaw.split(" ");

  return {
    date: new Date([date.split(".").reverse().join("-"), "T", time].join("")),
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

  for (const entryTimeStamp of timestampIter) {
    if (entryTimeStamp.type !== EventType.ENTRY) continue;
    const workerData = workers.get(entryTimeStamp.id);
    if (!workerData) break;

    for (const exitTimeStamp of timestampIter) {
      if (exitTimeStamp.id !== entryTimeStamp.id) break;
      if (exitTimeStamp.type !== EventType.EXIT) continue;

      const date = entryTimeStamp.date.toDateString();
      const span = { start: entryTimeStamp.date, end: exitTimeStamp.date };

      const hoursIn = workerData.hours.get(date);
      if (hoursIn) hoursIn.push(span);
      else workerData.hours.set(date, [span]);

      break;
    }
  }
  return workers;
}

function readFile(file: File, encoding: string = "UTF-8"): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => resolve(target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file, encoding);
  });
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
