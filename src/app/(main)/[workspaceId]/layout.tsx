import Sidebar from '@/components/sidebar/sidebar';
import React from 'react'

interface WorkspacePage{
    children: React.ReactNode;
    params: any;
}

const Layout: React.FC<WorkspacePage> = ({children , params}) => {
  return (
    <main className=''>
    <Sidebar params={params}></Sidebar>

        {children}
    </main>
  )
}

export default Layout