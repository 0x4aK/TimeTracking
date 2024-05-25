import type { Users } from "~/utils/parsers";

const users = shallowRef<Users>(new Map());
const selectedUser = ref<number | null>(null);
const selectedUserData = computed(() => (selectedUser.value && users.value.get(selectedUser.value)) || null);

export const useUsers = () => ({
  users,
  selectedUser,
  selectedUserData,
});
