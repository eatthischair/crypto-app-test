"use client"

import Link from 'next/link'
import { useState } from 'react';

export default function Navbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [cities, setCities] = useState(['paris', 'london']);
  const [value, setValue] = useState("")
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCities([...cities, value]);
    setValue('');
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={value}
      style={{color: 'black'}}/>
    </form>
      <ul>
        {cities.map((city, index) => (
          <li key={city}>
          <Link key={index} href={`/city/${city}`}>{city.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
      </div>
  )
}