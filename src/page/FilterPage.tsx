import { Form, useSubmit, useLoaderData } from "react-router-dom";
import {
  MapPin,
  Building2,
  Map,
  ChevronDown,
  Globe2Icon,
  FunnelXIcon,
  ChevronRight,
  ArrowDown,
} from "lucide-react";
import type { CustomSelectProps, FilterResponse } from "../type/type";

export default function FilterPage() {
  const { options, selections } = useLoaderData() as FilterResponse;
  const submit = useSubmit();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const changedName = (e.nativeEvent.target as HTMLSelectElement).name;

    if (changedName === "provinceId") {
      formData.delete("regencyId");
      formData.delete("districtId");
    } else if (changedName === "regencyId") {
      formData.delete("districtId");
    }

    submit(formData);
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.closest("form")?.reset();

    submit({});
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans text-slate-800">
      <aside className="w-full md:w-[20rem] border-r border-slate-200 bg-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Globe2Icon className="w-6 h-6 text-blue-500 mr-3" />
          <span className="font-bold text-slate-800 text-lg">
            Frontend Assessment
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col gap-4">
          <h2 className="text-[0.75rem] font-bold text-slate-400 uppercase">
            Filter Wilayah
          </h2>

          <Form onChange={handleChange} className="flex flex-col h-full gap-4">
            <CustomSelect
              label="Provinsi"
              name="provinceId"
              placeholder="Pilih Provinsi"
              icon={<Map className="w-5 h-5" />}
              options={options.provinces || []}
              defaultValue={selections.province?.id || ""}
            />

            <CustomSelect
              label="Kota/Kabupaten"
              name="regencyId"
              placeholder="Pilih Kota/Kabupaten"
              icon={<Building2 className="w-5 h-5" />}
              options={options.regencies || []}
              defaultValue={selections.regency?.id || ""}
              disabled={options.regencies.length === 0}
            />

            <CustomSelect
              label="Kecamatan"
              name="districtId"
              placeholder="Pilih Kecamatan"
              icon={<MapPin className="w-5 h-5" />}
              options={options.districts}
              defaultValue={selections.district?.id || ""}
              disabled={options.districts.length === 0}
            />

            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border-2 border-blue-500 text-blue-600 font-bold text-xs tracking-wider uppercase hover:bg-blue-50 transition-colors"
              >
                <FunnelXIcon className="w-4 h-4" />
                Reset
              </button>
            </div>
          </Form>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-slate-50/50 transition-opacity duration-200 ">
        <header className="h-16 flex items-center px-8 border-b border-slate-100 bg-white">
          <div className="flex flex-wrap items-center text-xs font-medium gap-2 text-slate-400">
            <span>Indonesia</span>
            {selections.province && (
              <>
                <ChevronRight className="w-2 h-3 self-end" />
                <span>{selections.province.name}</span>
              </>
            )}
            {selections.regency && (
              <>
                <ChevronRight className="w-2 h-3 self-end" />
                <span>{selections.regency.name}</span>
              </>
            )}
            {selections.district && (
              <>
                <ChevronRight className="w-2 h-3 self-end" />
                <span className="text-blue-500 font-bold">
                  {selections.district.name}
                </span>
              </>
            )}
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-10">
          {selections.province && (
            <div className="text-center">
              <p className="text-[0.75rem] font-bold text-blue-400 uppercase tracking-[0.2em] mb-3">
                Provinsi
              </p>
              <h2 className="text-5xl font-extrabold text-slate-800 tracking-tight">
                {selections.province.name}
              </h2>
            </div>
          )}

          {selections.regency && (
            <>
              <ArrowDown className="w-5 h-5 text-slate-300" />
              <div className="text-center">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-3">
                  Kota / Kabupaten
                </p>
                <h2 className="text-5xl font-extrabold text-slate-800 tracking-tight">
                  {selections.regency.name}
                </h2>
              </div>
            </>
          )}

          {selections.district && (
            <>
              <ArrowDown className="w-5 h-5 text-slate-300" />
              <div className="text-center">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-3">
                  Kecamatan
                </p>
                <h2 className="text-5xl font-extrabold text-slate-800 tracking-tight">
                  {selections.district.name}
                </h2>
              </div>
            </>
          )}

          {!selections.province && (
            <div className="text-center text-slate-400">
              <p className="text-lg">
                Silakan pilih wilayah pada menu di sebelah kiri.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const CustomSelect = ({
  label,
  placeholder,
  icon,
  options,
  name,
  defaultValue = "",
  disabled = false,
  ...restProps
}: CustomSelectProps) => {
  return (
    <div>
      <label className="block text-[0.75rem] font-bold text-slate-500 uppercase mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          {icon}
        </div>

        <select
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className="block w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 px-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
          {...restProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option
              key={opt.id}
              value={opt.id}
              className="bg-white text-slate-700"
            >
              {opt.name}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
