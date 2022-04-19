declare namespace IUser {
  interface User {
    username: string;
    role: UserRole;
  }
  interface CreateUser extends User {
    password: string;
  }
  interface UpdateUser extends User {}

  type UserRole = "admin" | "user";
}
