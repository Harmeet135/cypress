import React from 'react'

interface SidebarProps{
    params: {wokrspaceId: string};
    classname? : string;
}

const Sidebar: React.FC<SidebarProps> = ({params , classname}) => {
  return (
    <div>sidebar</div>
  )
}

export default Sidebar