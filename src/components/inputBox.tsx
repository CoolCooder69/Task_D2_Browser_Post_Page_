import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface IinputBoxProp{
    heading : string, 
    placeholder? : string, 
    onChange: (e : React.ChangeEvent<HTMLInputElement>)=> void, 
    type?: string; 
    name: string, 
    value: string, 
}

export function InputBox({heading, placeholder, onChange, type, name, value} : IinputBoxProp) {
  return (
    <Field>
      <FieldLabel htmlFor={`input-${name}`}>{heading}</FieldLabel>
      <Input
        id={`input-${name}`}
        type={type}
        placeholder={placeholder}
        className="rounded-3xl"
        onChange={onChange}
        name={name}
        value={value}
      />
    </Field>
  )
}