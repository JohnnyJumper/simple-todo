import { ShoppingItem } from '@prisma/client';

export type PendingShoppingItem = Omit<
  ShoppingItem,
  'id' | 'deleted' | 'description'
> & { description?: string };
