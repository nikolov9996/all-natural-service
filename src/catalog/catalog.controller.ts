import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('/catalog')
  getHello(): string {
    return this.catalogService.getCatalog();
  }
}
