export interface User {
    id: number
    email: "john@mail.com",
    password: "changeme",
}

export interface CrateUserDTO extends Omit<User, 'id'> {
  categoryId: number;
}

