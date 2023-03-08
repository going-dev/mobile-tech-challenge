import { useRouter, useSegments } from "expo-router";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type User = Record<string, never> | null;

const AuthContext = createContext<User>(null);

export function useAuth(): User {
  return useContext(AuthContext);
}

function useProtectedRoute(user): void {
  const rootSegment = useSegments()[0];

  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (!user && rootSegment !== "(auth)") {
      router.replace("/sign-in");
    } else if (user && rootSegment !== "(app)") {
      router.replace("/going");
    }
  }, [user, rootSegment]);
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const { getItem, setItem, removeItem } = useAsyncStorage("USER");

  const [user, setAuth] = useState<User>(undefined);

  useEffect((): void => {
    (async (): Promise<void> => {
      await getItem().then((jsonStr: string): void => {
        if (jsonStr != null) {
          setAuth(JSON.parse(jsonStr) as User);
        } else {
          setAuth(null);
        }
      });
    })();
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (): Promise<void> => {
          setAuth({});
          await setItem(JSON.stringify({}));
        },
        signOut: async (): Promise<void> => {
          setAuth(null);
          await removeItem();
        },
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
