import { Injectable } from '@nestjs/common';

import { faker } from '@faker-js/faker';

@Injectable()
export class CatalogService {
  getCatalog(): CatalogType[] {
    const resp = getCatalog();
    return resp;
  }
}

// temp mock
export type CatalogType = {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
};

function getCatalog(): CatalogType[] {
  const result: CatalogType[] = [
    {
      id: faker.string.uuid(),
      name: faker.word.sample(),
      description: faker.lorem.words({ min: 4, max: 13 }),
      backgroundImage: faker.internet.avatar(),
    },
    {
      id: faker.string.uuid(),
      name: faker.word.sample(),
      description: faker.lorem.words({ min: 4, max: 13 }),
      backgroundImage: faker.internet.avatar(),
    },
    {
      id: faker.string.uuid(),
      name: faker.word.sample(),
      description: faker.lorem.words({ min: 4, max: 13 }),
      backgroundImage: faker.internet.avatar(),
    },
  ];

  return result;
}
