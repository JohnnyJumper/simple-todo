import type { ShoppingApi, ShoppingItem } from "./shoppingApi";

export const createHttpShoppingApi = (baseUrl: string): ShoppingApi => {
  const req = async <T>(path: string, init?: RequestInit): Promise<T> => {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
    if (!res.ok)
      throw new Error((await res.text().catch(() => "")) || res.statusText);

    return res.status === 204
      ? (undefined as unknown as T)
      : ((await res.json()) as T);
  };

  return {
    list: () => req<ShoppingItem[]>("/v1/items"),
    create: (item) =>
      req<ShoppingItem>("/v1/items", {
        method: "POST",
        body: JSON.stringify(item),
      }),
    update: (id, patch) =>
      req<ShoppingItem>(`/v1/items/${id}`, {
        method: "PUT",
        body: JSON.stringify(patch),
      }),
    remove: (id) => req<void>(`/v1/items/${id}`, { method: "DELETE" }),
  };
};
