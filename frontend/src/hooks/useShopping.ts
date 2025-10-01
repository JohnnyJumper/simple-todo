import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ShoppingApi,
  ShoppingItem,
  PendingShoppingItem,
} from "../api/shoppingApi";
import {
  QUERY_KEY,
  getList,
  optmisticRemove,
  optimisticCreate,
  optimisticUpdate,
  restore,
} from "./shopping-utils";

export function useShopping(api: ShoppingApi) {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => api.list(),
  });

  const create = useMutation({
    mutationFn: (payload: PendingShoppingItem) => api.create(payload),
    onMutate: (payload) => optimisticCreate(queryClient, payload),
    onError: (_err, _payload, ctx) => {
      if (!ctx) return;
      restore(queryClient, ctx.prev);
    },
    onSuccess: (created, _payload, ctx) => {
      const curr = getList(queryClient);
      queryClient.setQueryData<ShoppingItem[]>(
        QUERY_KEY,
        curr.map((it) => (it.id === ctx?.tmpId ? created : it)),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: true }),
  });

  const update = useMutation({
    mutationFn: ({
      id,
      patch,
    }: {
      id: number;
      patch: Partial<PendingShoppingItem>;
    }) => api.update(id, patch),
    onMutate: ({ id, patch }) => optimisticUpdate(queryClient, id, patch),
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      restore(queryClient, ctx.prev);
    },
    onSuccess: (server) => {
      const curr = getList(queryClient);
      queryClient.setQueryData<ShoppingItem[]>(
        QUERY_KEY,
        curr.map((it) => (it.id === server.id ? server : it)),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => api.remove(id),
    onMutate: (id) => optmisticRemove(queryClient, id),
    onError: (_err, _id, ctx) => {
      if (!ctx) return;
      restore(queryClient, ctx.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    list,
    create: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync,
  };
}
