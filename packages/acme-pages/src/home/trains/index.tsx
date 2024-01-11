import {
  type ChangeEventHandler,
  type FormEventHandler,
  type ReactElement,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react'

const TYPES = [
  'ED160',
  'ED161',
  'ED250',
  'ED73',
  'ED74',
  'EN57',
  'EN71',
  'EN97',
  'EP05',
  'EP06',
  'EP07',
  'EP08',
  'EP09',
  'ET22',
  'EU05',
  'EU06',
  'EU07',
  'EU08',
  'EU160',
  'EU44',
  'SA106',
  'SA133',
  'SM42',
  'SN81',
  'ST44',
  'ST48',
  'SU160',
]

const createItem = () => ({
  number: '',
  name: '',
  type: TYPES[TYPES.length - 1],
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
  options,
  onChange,
}: {
  item: Item
  label: string
  name: keyof Item
  placeholder?: string
  options?: string[]
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}) {
  const id = useId()
  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      {options ? (
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name={name}
          id={id}
          value={item[name]}
          onChange={onChange}
        >
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          value={item[name]}
          onChange={onChange}
        />
      )}
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

  const sorted = useMemo(
    () => list.sort((a, b) => formatItem(a).localeCompare(formatItem(b))),
    [list],
  )

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        {sorted.map((item, index) => (
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
          placeholder="Train number"
          onChange={handleChange}
        />
        <Field
          item={item}
          label="Name"
          name="name"
          placeholder="Train name"
          onChange={handleChange}
        />
        <Field
          item={item}
          label="Type"
          name="type"
          placeholder="Type of train"
          options={TYPES}
          onChange={handleChange}
        />
        <Field
          item={item}
          label="Paint"
          name="paint"
          placeholder="Paint"
          onChange={handleChange}
        />
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  )
}
