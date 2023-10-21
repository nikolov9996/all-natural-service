import { faker } from '@faker-js/faker';

export type UserType = {
  username: string;
  email: string;
  avatar: string;
  isSeller: boolean;
};

export function getUser(): UserType {
  return <UserType>{
    username: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    isSeller: !!faker.number.int({ min: 0, max: 1 }),
  };
}
