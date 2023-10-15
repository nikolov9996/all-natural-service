import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogService {
  getCatalog(): string {
    return 'Catalog here!';
  }
}
