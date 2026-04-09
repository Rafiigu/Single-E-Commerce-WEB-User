"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@uidotdev/usehooks";

type Option<T> = {
  data?: T;
  value: string;
  label: string;
};

export type ComboboxProps<T> = {
  value?: string[];
  label?: string;
  placeholder?: string;
  includeAllOption?: boolean;
  className?: string;
  queryFn: (search: string) => Promise<Option<T>[]>;
  onValueChange: (value?: string[]) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Combobox<T extends Record<string, any>>({
  value = [],
  label,
  placeholder,
  includeAllOption = false,
  className,
  queryFn,
  onValueChange,
}: ComboboxProps<T>) {
  const [options, setOptions] = React.useState<Option<T>[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<Option<T>[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [open, setOpen] = React.useState(false);
  const initializedSelectedOptionsRef = React.useRef(false);
  console.log("Rendered!");
  console.log(selectedOptions);
  console.log(value);

  React.useEffect(() => {
    const fetchAsync = async () => {
      const options = await queryFn(debouncedSearchValue);
      if (includeAllOption) {
        setOptions([{ label: "Semua", value: "all" }, ...options]);
      } else {
        setOptions(options);
      }
    };

    fetchAsync();
  }, [queryFn, debouncedSearchValue, includeAllOption]);

  // run once after options dan value ada.
  React.useEffect(() => {
    if (options.length > 0) {
      if (!initializedSelectedOptionsRef.current) {
        initializedSelectedOptionsRef.current = true;
        setSelectedOptions(options.filter((o) => value.includes(o.value)));
      }
    }
  }, [options, value]);

  const availableOptionsWithSelectedOptions = React.useMemo(() => {
    const optionsMap: Record<string, string> = {};

    for (let i = 0; i < options.length; i++) {
      optionsMap[options[i].value] = options[i].label;
      // key: id, value: label
    }

    for (let i = 0; i < selectedOptions.length; i++) {
      optionsMap[selectedOptions[i].value] = selectedOptions[i].label;
    }
    return optionsMap;
  }, [options, selectedOptions]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-[2.5rem] border-neutral-400",
            className
          )}
        >
          <div className="w-full flex items-center text-ellipsis">
            {label ? (
              <span className="text-neutral-700 mr-2">{label}: </span>
            ) : null}
            {value && value.length > 0 ? (
              <span>
                {value
                  .map((id) => availableOptionsWithSelectedOptions[id])
                  .join(", ")}
              </span>
            ) : (
              <span className="text-neutral-500 font-normal">
                {placeholder}
              </span>
            )}
          </div>
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            value={searchValue}
            placeholder={placeholder}
            onValueChange={(v) => {
              setSearchValue(v);
            }}
          />
          {/* Kita nanti harus ada mekanisme searching sendiri. Kenapa?
          karena kalau kita searching pakai CommandInput, dia itu look up value
          dari si value CommandItem, dan value CommandItem itu kan id, kalau kita mau
          searching, kan harusnya kita searching berdasarkan label, cuma kan gak bisa
          jadi harus kita custom lagi. */}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, i) => (
                <CommandItem
                  key={`option-${option.value}-${i}`}
                  value={option.value}
                  onSelect={(v) => {
                    console.log("Click", v);
                    if (value.includes(v)) {
                      // jika value yang kita pilih ada di dalam currentValue, maka dia akan dikeluarkan dari currentValue
                      onValueChange(value.filter((s) => s !== v));
                      setSelectedOptions(
                        value
                          .filter((s) => s !== v)
                          .map((s) => ({
                            value: s,
                            label: availableOptionsWithSelectedOptions[s],
                          }))
                      );
                    } else if (v !== "all") {
                      onValueChange([...value.filter((v) => v !== "all"), v]);
                      setSelectedOptions(
                        [...value.filter((v) => v !== "all"), v].map((s) => ({
                          value: s,
                          label: availableOptionsWithSelectedOptions[s],
                        }))
                      );
                    } else {
                      console.log("MASUK KE SINI");
                      onValueChange([v]);
                      setSelectedOptions(
                        [v].map((s) => ({
                          value: s,
                          label: availableOptionsWithSelectedOptions[s],
                        }))
                      );
                    }
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(option.value) || value.includes("all")
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
