import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <Alert key='danger' variant='danger'>{error.message}</Alert>
    </div>
  )
}

export default ErrorPage