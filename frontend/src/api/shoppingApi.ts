export type ShoppingItem = {
  id: number;
  name: string;
  description?: string | null;
  quantity: number;
  completed: boolean;
};

export type PendingShoppingItem = Omit<ShoppingItem, "id">;

export interface ShoppingApi {
  list(): Promise<ShoppingItem[]>;
  create(item: PendingShoppingItem): Promise<ShoppingItem>;
  update(
    id: number,
    patch: Partial<PendingShoppingItem>,
  ): Promise<ShoppingItem>;
  remove(id: number): Promise<void>;
}
