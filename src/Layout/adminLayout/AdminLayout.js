import React from 'react'
import Menu from '../../components/menu'

function AdminLayout({children}) {
  return (
    <div className='container-fluid'>
        <Menu/>
        {children}
    </div>
  )
}

export default AdminLayout