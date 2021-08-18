import { Field, FieldProps } from "formik"

export interface InputGroupProps {
  name: string
  label?: string
  type?: string
}

export function InputGroup(props: InputGroupProps) {
  const { name, label, type } = props

  return (
    <Field {...props}>
      {({ field, meta }: FieldProps) => (
        <div>
          {label && (
            <label
              htmlFor={name}
              className="block text-gray-500 font-medium mb-1"
            >
              {label}
            </label>
          )}
          <input
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            id={name}
            type={type ?? "text"}
            {...field}
          />
          {meta.touched && meta.error && (
            <div className="text-red-500 text-sm">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  )
}

export default InputGroup
