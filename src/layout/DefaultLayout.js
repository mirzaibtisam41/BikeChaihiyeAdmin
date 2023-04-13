import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { GlobalContext } from '../context';

const DefaultLayout = () => {
  const { auth } = useContext(GlobalContext);
  return (
    <div>
      {
        (auth === null || auth === 'jwt expired') ? <Redirect to='/login' /> : <Redirect to='/users' />
      }
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
