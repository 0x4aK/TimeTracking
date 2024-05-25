import { parseCSV } from "~/utils/parsers";

async function setUsersAndTimeSpansFromCSV(file: File) {
  loading.value = true;
  try {
    const data = await readFile(file, "CP1252");
    [users.value, timeSpans.value] = parseCSV(data);
  } finally {
    loading.value = false;
  }
}

const loading = ref(false);
const { users } = useUsers();
const { timeSpans } = useTimeSpans();

export const useUserManager = () => ({
  loading,
  setUsersAndTimeSpansFromCSV,
});
