declare namespace IProfile {
  interface Profile {
    name: string;
    email: string;
  }
  interface CreateProfile extends Profile {}
  interface UpdateProfile extends Profile {}
}
