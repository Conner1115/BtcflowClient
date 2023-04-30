import { User } from "@replit/extensions";
import { useReplitEffect } from "@replit/extensions-react";
import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useReplitEffect(async (replit) => {
    setCurrentUser((await replit.data.currentUser({})).user);
  }, []);

  return currentUser;
}
