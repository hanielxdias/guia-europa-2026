export type PageId =
  | "home"
  | "routes"
  | "transport"
  | "hotels"
  | "tips";

export interface NavItem {
  id: PageId;
  label: string;
}
