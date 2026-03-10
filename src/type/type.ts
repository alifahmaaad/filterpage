import type { ReactNode, SelectHTMLAttributes } from "react";

export interface Province {
  id: number;
  name: string;
}
export interface Regency {
  id: number;
  name: string;
  province_id: number;
}
export interface District {
  id: number;
  name: string;
  regency_id: number;
}

export interface SelectOption {
  id: string | number;
  name: string;
}

export interface AppData {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
}

export interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  placeholder: string;
  icon: ReactNode;
  options: SelectOption[];
}

export interface FilterResponse {
  options: AppData;
  selections: {
    province: Province | undefined;
    regency: Regency | undefined;
    district: District | undefined;
  };
}
