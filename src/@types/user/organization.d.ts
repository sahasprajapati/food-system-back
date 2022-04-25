declare namespace IOrganization {
  interface Organization {
    name: string;
    creditLimit: number;
  }
  interface CreateOrganization extends Organization {}
  interface UpdateOrganization extends Organization {}
}
