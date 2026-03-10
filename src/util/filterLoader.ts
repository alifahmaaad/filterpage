import type { LoaderFunctionArgs } from "react-router-dom";
import type {
  AppData,
  District,
  FilterResponse,
  Province,
  Regency,
} from "../type/type";

export const filterLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<FilterResponse> => {
  const url = new URL(request.url);
  const provinceId = url.searchParams.get("provinceId");
  const regencyId = url.searchParams.get("regencyId");
  const districtId = url.searchParams.get("districtId");

  try {
    const [provincesData, regenciesData, districtsData] = await Promise.all([
      fetch("/data/indonesia_provinces.json").then((res) => res.json()),
      fetch("/data/indonesia_regencies.json").then((res) => res.json()),
      fetch("/data/indonesia_districts.json").then((res) => res.json()),
    ]);

    const data: AppData = {
      provinces: provincesData,
      regencies: regenciesData,
      districts: districtsData,
    };

    const availableProvinces = data.provinces;
    const availableRegencies = provinceId
      ? data.regencies.filter(
          (regencie: Regency) => regencie.province_id.toString() === provinceId,
        )
      : [];
    const availableDistricts = regencyId
      ? data.districts.filter(
          (district: District) => district.regency_id.toString() === regencyId,
        )
      : [];

    const selectedProvince = availableProvinces.find(
      (province: Province) => province.id.toString() === provinceId,
    );
    const selectedRegency = availableRegencies.find(
      (regencie: Regency) => regencie.id.toString() === regencyId,
    );
    const selectedDistrict = availableDistricts.find(
      (district: District) => district.id.toString() === districtId,
    );

    return {
      options: {
        provinces: availableProvinces,
        regencies: availableRegencies,
        districts: availableDistricts,
      },
      selections: {
        province: selectedProvince,
        regency: selectedRegency,
        district: selectedDistrict,
      },
    };
  } catch (error) {
    console.error("Error loading region JSON files:", error);
    return {
      options: { provinces: [], regencies: [], districts: [] },
      selections: {
        province: undefined,
        regency: undefined,
        district: undefined,
      },
    };
  }
};
