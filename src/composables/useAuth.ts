import { ref, onUnmounted } from "vue";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export function useAuth() {
  const user = ref<User | null>(null);
  const isAuthReady = ref(false);

  const auth = getAuth();

  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    user.value = authUser;
    isAuthReady.value = true;
  });

  onUnmounted(() => unsubscribe());

  return {
    user,
    isAuthReady,
  };
}
