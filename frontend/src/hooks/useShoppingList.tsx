import { useCallback, useEffect, useState } from "react";

export type State = {
  items: Record<string, ShoppingItem>;
};

export type ShoppingItem = {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  completed: boolean;
};
export type PendingShoppingItem = Omit<ShoppingItem, "id">;
const STORAGE_KEY = "shopping:list:v1";

function getFromLocalStorage(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: State = raw ? JSON.parse(raw) : null;
    return parsed ?? { items: {} };
  } catch {
    return { items: {} };
  }
}

export function newId(): number {
  const ts = Date.now();
  const rnd = Math.floor(Math.random() * 1_000_000);
  return ts * 1_000_000 + rnd;
}

export function useShoppingList() {
  const [state, setState] = useState<State>(() => getFromLocalStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = useCallback((item: PendingShoppingItem) => {
    const title = item.name.trim();
    if (!title) return;

    const quantity = Math.max(item.quantity, 1);
    const description = item.description?.trim();

    const id = newId();
    const newItem: ShoppingItem = {
      id,
      name: title,
      description,
      completed: item.completed,
      quantity,
    };
    setState((prev) => ({
      items: { ...prev.items, [id]: newItem },
    }));
  }, []);

  const editItem = useCallback(
    (id: string, update: Partial<PendingShoppingItem>) => {
      setState((prev) => {
        const updated = prev.items[id];
        if (!updated) return prev;

        updated.completed = update?.completed ?? updated.completed;
        updated.description =
          update?.description?.trim() ?? updated.description;
        updated.quantity = Math.max(update?.quantity ?? updated.quantity, 1);
        updated.name = update?.name?.trim() ?? updated.name;

        return {
          ...prev,
          items: { ...prev.items, [id]: updated },
        };
      });
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setState((prev) => {
      if (!prev.items[id]) return prev;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = prev.items;
      return { items: rest };
    });
  }, []);

  const toggleItem = useCallback((id: string) => {
    setState((prev) => {
      const item = prev.items[id];
      if (!item) return prev;
      return {
        ...prev,
        items: {
          ...prev.items,
          [id]: { ...item, completed: !item.completed },
        },
      };
    });
  }, []);

  return {
    items: Object.values(state.items),
    addItem,
    editItem,
    removeItem,
    toggleItem,
  };
}
