 "use client"
import { useState } from 'react';

 export default function RootLayout({
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
    <div style={{height: '100px', background: 'green'}}>
    </div>
    {children}
    </div>
  );
}
