"use client"

import {useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

LogsLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
}

export default function LogsLayout({ children, title }) {
  const location = useLocation()
  
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          Audit Logs / {title}
        </div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex gap-2">
            <Link to="/logs/inventory">
              <Button variant={location.pathname === '/logs/inventory' ? 'default' : 'outline'}>
                Inventory Logs
              </Button>
            </Link>
            <Link to="/logs/system">
              <Button variant={location.pathname === '/logs/system' ? 'default' : 'outline'}>
                System Logs
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

