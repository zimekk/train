// import { useState, useEffect } from 'react'
import { Layout, Page, Text, Code, Link, Snippet } from '@vercel/examples-ui'
import { Button, Quote } from '@acme/design-system'
// import { matchingTextColor, randomColor } from '@acme/utils'
import Navbar from '../components/navbar'
import Stations from './stations'
import Trains from './trains'

export default function Home(): React.ReactNode {
  // const [bgColor, setBgColor] = useState('')
  // const [textColor, setTextColor] = useState('')
  // const changeColor = () => {
  //   const bg = randomColor()
  //   setBgColor(bg)
  //   setTextColor(matchingTextColor(bg))
  // }

  // useEffect(changeColor, [])

  return (
    <Page>
      <Navbar />
      <Text variant="h1" className="mb-6">
        Trains
      </Text>
      <Trains />
      <Text variant="h2" className="mt-10 my-6">
        Stations
      </Text>
      <Stations />
    </Page>
  )
}

Home.Layout = Layout
