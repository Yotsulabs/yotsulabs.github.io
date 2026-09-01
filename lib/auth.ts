import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const loginAdmin = async (
  usernameInput: string,
  passwordInput: string
): Promise<boolean> => {
  try {
    const colRef = collection(db, "users");
    const snapshot = await getDocs(colRef);

    if (!snapshot.empty) {
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const dbUser = data.username || data.user || data.email;
        const dbPw = data.password || data.pw || data.pass;

        if (
          dbUser &&
          dbPw &&
          String(dbUser).trim() === usernameInput.trim() &&
          String(dbPw).trim() === passwordInput.trim()
        ) {
          if (typeof window !== "undefined") {
            localStorage.setItem("admin_user", String(dbUser));
          }
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

export const logoutAdmin = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_user");
  }
};

export const isAdminLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem("admin_user"));
};

export const getAdminUser = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_user");
};
