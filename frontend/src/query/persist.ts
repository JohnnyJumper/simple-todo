import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { queryClient } from "./client";

persistQueryClient({
  queryClient,
  persister: createAsyncStoragePersister({
    storage: window.localStorage,
    key: "rq:shopping:v1",
  }),
  maxAge: 1000 * 60 * 60 * 24,
});
