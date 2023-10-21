import { Controller, Get } from '@nestjs/common';
import { CatalogService, CatalogType } from './catalog.service';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('/catalog')
  getHello(): CatalogType[] {
    return this.catalogService.getCatalog();
  }
}
