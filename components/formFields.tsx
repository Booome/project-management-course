import { capitalCase } from "change-case";
import { DatePicker } from "./DatePicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export function FormInputField({
  control,
  name,
  label,
  type = "text",
}: {
  control: any;
  name: string;
  label?: string;
  type?: "text" | "number";
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label || capitalCase(name)}:</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              value={field.value === undefined ? "" : field.value}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(Number(e.target.value));
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormTextareaField({
  control,
  name,
}: {
  control: any;
  name: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{capitalCase(name)}:</FormLabel>
          <FormControl>
            <Textarea {...field} rows={4} className="resize-none" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormSelectField({
  control,
  name,
  options,
}: {
  control: any;
  name: string;
  options: string[];
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{capitalCase(name)}:</FormLabel>
          <FormControl>
            <Select
              {...field}
              onValueChange={(value) => {
                if (value === "") {
                  field.onChange(undefined);
                } else {
                  field.onChange(value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="-----" />
              </SelectTrigger>
              <SelectContent>
                {options.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormDateField({
  control,
  name,
}: {
  control: any;
  name: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{capitalCase(name)}:</FormLabel>
          <FormControl>
            <DatePicker date={field.value} onDateChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
