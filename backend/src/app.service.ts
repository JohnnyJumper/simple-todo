import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, ShoppingItem } from '@prisma/client';
import { PendingShoppingItem } from './types';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger('AppService');
  constructor(private readonly prisma: PrismaService) {}

  async getShoppingItems() {
    const items = await this.prisma.shoppingItem.findMany({
      where: {
        deleted: false,
      },
    });
    this.logger.debug(`found ${items.length} items to return`);
    return items;
  }

  async getItem(id: number) {
    return this.prisma.shoppingItem.findUnique({
      where: { id },
    });
  }

  async createShoppingItem(item: PendingShoppingItem) {
    const validatedItem = this.validateItem(item);
    this.logger.debug('creating a new item', validatedItem);
    return this.prisma.shoppingItem.create({
      data: {
        deleted: false,
        name: validatedItem.name,
        description: validatedItem.description,
        quantity: validatedItem.quantity,
        completed: false,
      },
    });
  }

  async editShoppingItem(id: number, patch: Partial<PendingShoppingItem>) {
    const existingItem = await this.prisma.shoppingItem.findUnique({
      where: { id },
    });
    if (!existingItem || existingItem.deleted) {
      throw new NotFoundException('item not found');
    }

    const data: Prisma.ShoppingItemUpdateInput = {};

    if (patch.name !== undefined) {
      const name = patch.name.trim();
      if (!name) throw new BadRequestException('item must have a title');
      data.name = name;
    }

    if (patch.description !== undefined) {
      const desc = patch.description.trim();
      data.description = desc && desc.length > 0 ? desc : null;
    }

    if (patch.quantity !== undefined) {
      const quantity = Number(patch.quantity);
      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new BadRequestException('quantity must be a positive integer');
      }
      data.quantity = quantity;
    }

    if (patch.completed !== undefined) {
      data.completed = !!patch.completed;
    }

    if (Object.keys(data).length === 0) {
      this.logger.debug('nothing to update, returning the data as is', {
        data,
        patch,
        id,
      });
      return existingItem;
    }

    return this.prisma.shoppingItem.update({
      where: { id },
      data,
    });
  }

  async deleteShoppingItem(id: number) {
    this.logger.debug('marking the item as deleted', { id });

    const existingItem = await this.prisma.shoppingItem.findUnique({
      where: { id },
    });
    if (!existingItem || existingItem.deleted) {
      throw new NotFoundException('item not found');
    }

    return await this.prisma.shoppingItem.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  }

  validateItem(item: PendingShoppingItem): PendingShoppingItem {
    item.name = item.name.trim();
    item.description = item.description?.trim();
    if (item.quantity <= 0) item.quantity = 1;
    if (!item.name) {
      throw new HttpException('item must have a title', HttpStatus.BAD_REQUEST);
    }
    return item;
  }
}
