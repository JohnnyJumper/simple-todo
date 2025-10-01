import type { ShoppingItem, PendingShoppingItem } from "../api/shoppingApi";
import { useQueryClient } from "@tanstack/react-query";

export const QUERY_KEY = ["shopping-items"] as const;

function toList<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

function sanitizePending(pending: PendingShoppingItem): PendingShoppingItem {
  return {
    name: pending.name.trim(),
    description: pending.description?.trim() || null,
    quantity: Math.max(pending.quantity, 1),
    completed: !!pending.completed,
  };
}

function applyPatch(
  it: ShoppingItem,
  patch: Partial<PendingShoppingItem>,
): ShoppingItem {
  return {
    id: it.id,
    name: patch.name !== undefined ? patch.name.trim() || it.name : it.name,
    description:
      patch.description !== undefined
        ? patch.description?.trim() || null
        : (it.description ?? null),
    quantity:
      patch.quantity !== undefined ? Math.max(patch.quantity, 1) : it.quantity,
    completed: patch.completed ?? it.completed,
  };
}

export function getList(
  queryClient: ReturnType<typeof useQueryClient>,
): ShoppingItem[] {
  return toList<ShoppingItem>(queryClient.getQueryData(QUERY_KEY));
}

export async function optimisticCreate(
  queryClient: ReturnType<typeof useQueryClient>,
  payload: PendingShoppingItem,
) {
  await queryClient.cancelQueries({ queryKey: QUERY_KEY, exact: true });
  const prev = getList(queryClient);
  const tmpId = -Math.floor(Math.random() * 1_000_000) - 1;

  const optimistic: ShoppingItem = { id: tmpId, ...sanitizePending(payload) };
  queryClient.setQueryData<ShoppingItem[]>(QUERY_KEY, [...prev, optimistic]);
  return { prev, tmpId };
}

export async function optimisticUpdate(
  queryClient: ReturnType<typeof useQueryClient>,
  id: number,
  patch: Partial<PendingShoppingItem>,
) {
  await queryClient.cancelQueries({ queryKey: QUERY_KEY, exact: true });
  const prev = getList(queryClient);
  queryClient.setQueryData<ShoppingItem[]>(
    QUERY_KEY,
    prev.map((it) => (it.id === id ? applyPatch(it, patch) : it)),
  );
  return { prev };
}

export async function optmisticRemove(
  queryClient: ReturnType<typeof useQueryClient>,
  id: number,
) {
  await queryClient.cancelQueries({ queryKey: QUERY_KEY, exact: true });
  const prev = getList(queryClient);
  queryClient.setQueryData<ShoppingItem[]>(
    QUERY_KEY,
    prev.filter((it) => it.id !== id),
  );
  return { prev };
}

export function restore(
  queryClient: ReturnType<typeof useQueryClient>,
  prev: ShoppingItem[],
) {
  return queryClient.setQueryData<ShoppingItem[]>(QUERY_KEY, prev);
}
