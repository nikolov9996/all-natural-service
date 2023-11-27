import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatalogService, CatalogType } from './catalog.service';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  getCatalog(): CatalogType[] {
    return this.catalogService.getCatalog();
  }

  @Post()
  addCatalogItem(@Body() params: CatalogType) {
    console.log(params);
  }
}
