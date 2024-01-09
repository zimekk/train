import {
  type ChangeEventHandler,
  type FormEventHandler,
  type ReactElement,
  useCallback,
  useId,
  useState,
} from 'react'

const createItem = () => ({
  number: '',
  name: '',
  type: '',
  paint: '',
})

type Item = ReturnType<typeof createItem>

const formatItem = (item: Item) =>
  `${item.number} ${item.name} / ${item.type}-${item.paint}`

function Field({
  item,
  label,
  name,
  placeholder,
  onChange,
}: {
  item: Item
  label: string
  name: keyof Item
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}) {
  const id = useId()
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={item[name]}
        onChange={onChange}
      />
    </div>
  )
}

export default function Trains(): ReactElement {
  const [item, setItem] = useState(createItem)
  const [list, setList] = useState<Item[]>(() => [
    {
      number: 'EIC 1350',
      name: 'Tatry',
      type: 'EP09',
      paint: '003',
    },
  ])
  const [selected, setSelected] = useState<number[]>(() => [0])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) =>
      setItem((item) => ({
        ...item,
        [target.name]: target.value,
      })),
    [],
  )
  const handleSubmit = useCallback<FormEventHandler>(
    (event) => (
      event.preventDefault(),
      setItem((item) => {
        if (item.number.length > 0) {
          setList((list) => list.concat(item))
          return createItem()
        }
        return item
      })
    ),
    [],
  )

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        {list.map((item, index) => (
          <li className="flex items-center" key={index}>
            <button
              onClick={() =>
                setSelected((selected) =>
                  selected.includes(index)
                    ? selected.filter((i) => i !== index)
                    : selected.concat(index),
                )
              }
            >
              <svg
                className={`w-3.5 h-3.5 me-2 ${
                  selected.includes(index) ? 'text-green-500' : 'text-gray-500'
                } dark:text-green-400 flex-shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </button>
            {formatItem(item)}
          </li>
        ))}
      </ul>
      <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2">
        <Field
          item={item}
          label="Train number"
          name="number"
          placeholder="eg. IC 61104"
          onChange={handleChange}
        />
        <Field
          item={item}
          label="Name"
          name="name"
          placeholder="eg. NAŁKOWSKA"
          onChange={handleChange}
        />
        <Field
          item={item}
          label="Type"
          name="type"
          placeholder="eg. EP07"
          onChange={handleChange}
        />
        <Field
          item={item}
          label="Paint"
          name="paint"
          placeholder="eg. 1035"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add
        </button>
      </div>
    </form>
  )
}
