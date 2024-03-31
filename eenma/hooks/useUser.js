import SupabaseBrowser from "@/lib/supabase/SupabaseBrowser";
import { useQuery } from "@tanstack/react-query";

const initialUser = {};

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = SupabaseBrowser();

      const user = await supabase.auth.getUser();

      if (user.data?.user) {
        // fetch user info

        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.data.user.id);

        return data;
      }

      return initialUser;
    },
  });
}
