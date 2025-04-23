import React from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'

const Defaultlayout = () => {
  const location = useLocation();  
  const [activeTab, setActiveTab] = React.useState<string | null>(location.pathname === '/criar' ? 'createPoll' : 'polls');  

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex flex-col min-h-screen'>
        <Header activeTab={activeTab} handleTabClick={handleTabClick} />
        <Outlet />
    </div>
  )
}

export default Defaultlayout