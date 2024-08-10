export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    avatar: string

}

export interface CrateUserDTO extends Omit<User, 'id'> {
}

