import Sidebar from '@/components/sidebar/sidebar';
import React from 'react'

interface WorkspacePage{
    children: React.ReactNode;
    params: any;
}

const Layout: React.FC<WorkspacePage> = ({children , params}) => {
  return (
    <main 
    className='flex overflow-hidden
    h-screen
    w-screen
    '>
    <Sidebar params={params}/>
    <div
    className='dark:boder-neutrals-12/70
    border-l-[1px]
    w-full
    relative
    overflow-scroll
    '>
        {children}
        </div>
    </main>
  )
}

export default Layout