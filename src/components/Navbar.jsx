import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-400 text-black flex justify-between items-center px-4 h-16'>
        <div className='logo font-bold text-2xl'>LockItDown</div>
        <a target='_blank' href="https://github.com/parvashah305?tab=repositories"><i className="ri-github-fill text-4xl" ></i></a>
    </nav>
  )
}

export default Navbar