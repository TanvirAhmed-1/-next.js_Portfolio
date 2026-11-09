export interface IService {
  id?: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  icon?: string | null;
  iconImage?: string | null;
  pricing?: string | null;
  deliveryTime?: string | null;
  status: "ACTIVE" | "INACTIVE";
  showOnHome: boolean;
  featured?: boolean;
  order?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IServiceFilters {
  searchTerm?: string;
  status?: string;
  showOnHome?: boolean;
  featured?: boolean;
}

