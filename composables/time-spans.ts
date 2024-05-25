const { selectedUser } = useUsers();

const selectedUserSpans = computed(() => (selectedUser.value && timeSpans.value.get(selectedUser.value)) || null);

const spansByWeek = computed(() => {
  if (!selectedUserSpans.value) return null;

  return selectedUserSpans.value.reduce((spans, span) => {
    const week = getWeek(span.start);
    spans.get(week)?.push(span) || spans.set(week, [span]);
    return spans;
  }, new Map<number, TimeSpan[]>());
});

const spansByDate = computed(() => {
  if (!selectedDate.value || !selectedUserSpans.value) return null;
  return selectedUserSpans.value.reduce((spans, span) => {
    const date = formatDate(span.start);
    spans.get(date)?.push(span) || spans.set(date, [span]);
    return spans;
  }, new Map<string, TimeSpan[]>());
});

const selectedDateSpans = computed(
  () => (selectedDate.value !== null && spansByDate.value?.get(formatDate(selectedDate.value))) || null,
);
const selectedWeekSpans = computed(
  () => (selectedDate.value !== null && spansByWeek.value?.get(getWeek(selectedDate.value))) || null,
);

const timeSpans = shallowRef<UserTimeSpans>(new Map());
const selectedDate = ref<Date | null>(new Date());

export const useTimeSpans = () => ({
  timeSpans,
  selectedDate,
  spansByWeek,
  spansByDate,
  selectedDateSpans,
  selectedWeekSpans,
});
