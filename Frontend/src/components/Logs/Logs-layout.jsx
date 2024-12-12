"use client"

import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import PropTypes from 'prop-types'

LogsLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
}

export default function LogsLayout({ children, title }) {
  const navigate = useNavigate()
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
            <Button
              variant={location.pathname === '/logs/inventory' ? 'default' : 'outline'}
              onClick={() => navigate('/logs/inventory')}
            >
              Inventory Logs
            </Button>
            <Button
              variant={location.pathname === '/logs/system' ? 'default' : 'outline'}
              onClick={() => navigate('/logs/system')}
            >
              System Logs
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

