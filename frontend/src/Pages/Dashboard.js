import React from 'react'
import RedirectUserHook from '../HOOKS/RedirectUserHook'

const Dashboard = () => {
  RedirectUserHook("/Login")
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard