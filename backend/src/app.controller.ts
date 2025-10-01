import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Body,
  Delete,
  ParseIntPipe,
  NotFoundException,
  ParseArrayPipe,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { PendingShoppingItem } from './types';

@Controller('/v1/items')
export class AppController {
  private readonly logger: Logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Get()
  async getActiveItems() {
    const items = await this.appService.getShoppingItems();
    return items.map(({ deleted, ...item }) => item);
  }

  @Get(':id')
  async getOneActiveItem(@Param('id', ParseIntPipe) id: number) {
    const item = await this.appService.getItem(id);

    if (!item || item.deleted) {
      throw new NotFoundException('item not found');
    }
    return item;
  }

  @Post()
  async createNewItem(@Body() item: PendingShoppingItem) {
    return this.appService.createShoppingItem(item);
  }

  @Put(':id')
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() patch: Partial<PendingShoppingItem>,
  ) {
    return this.appService.editShoppingItem(id, patch);
  }

  @Delete(':id')
  async deleteItem(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteShoppingItem(id);
  }
}
