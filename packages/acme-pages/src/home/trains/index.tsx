import {
  type ChangeEventHandler,
  type FormEventHandler,
  type KeyboardEventHandler,
  type ReactElement,
  useCallback,
  useId,
  useState,
} from 'react'
import { Text } from '@vercel/examples-ui'

export default function Trains(): ReactElement {
  const [text, setText] = useState(() => '')
  const [list, setList] = useState(() => ['EP09', 'EU07'])
  const [selected, setSelected] = useState<number[]>(() => [0])
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => setText(target.value),
    [],
  )
  const handleSubmit = useCallback<FormEventHandler>(
    (event) => event.preventDefault(),
    [],
  )
  const handleKeyDown = useCallback<KeyboardEventHandler>(
    ({ key }) => (
      console.log({ key }),
      key === 'Enter' &&
        setText((text) => {
          if (text.length > 0) {
            setList((list) => list.concat(text))
          }
          return ''
        })
    ),
    [],
  )
  const id = useId()

  return (
    <>
      <Text variant="h1" className="mb-6">
        Trains
      </Text>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor={id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Train name
            </label>
            <input
              type="text"
              id={id}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="SM42"
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {list.map((text, index) => (
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
                      selected.includes(index)
                        ? 'text-green-500'
                        : 'text-gray-500'
                    } dark:text-green-400 flex-shrink-0`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                </button>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </>
  )
}
