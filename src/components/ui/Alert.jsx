import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

const Alert = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClasses = "relative w-full rounded-lg p-4 mt-4";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800"
  };

  return (
    <div
      role="alert"
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertTitle = ({ children, className = '', ...props }) => {
  return (
    <h5
      className={`font-medium leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
};

const AlertDescription = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`mt-2 text-sm opacity-90 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertIcon = ({ variant = 'default' }) => {
  const icons = {
    default: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />
  };

  return icons[variant];
};

// Example usage component to demonstrate different alert types
const AlertDemo = () => {
  return (
    <div className="w-full max-w-md space-y-4 p-4">
      {/* Default Alert */}
      <Alert>
        <div className="flex gap-2">
          <AlertIcon />
          <div>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              This is a default alert message.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Success Alert */}
      <Alert variant="success">
        <div className="flex gap-2">
          <AlertIcon variant="success" />
          <div>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your action was completed successfully.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Warning Alert */}
      <Alert variant="warning">
        <div className="flex gap-2">
          <AlertIcon variant="warning" />
          <div>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Please review this important warning message.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Error Alert */}
      <Alert variant="error">
        <div className="flex gap-2">
          <AlertIcon variant="error" />
          <div>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error occurred while processing your request.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Info Alert */}
      <Alert variant="info">
        <div className="flex gap-2">
          <AlertIcon variant="info" />
          <div>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              Here's some helpful information for you.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Alert with custom classes */}
      <Alert className="border-2 border-blue-200">
        <div className="flex gap-2">
          <AlertIcon />
          <div>
            <AlertTitle>Custom Styled Alert</AlertTitle>
            <AlertDescription>
              This alert has custom border styling.
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export { Alert, AlertTitle, AlertDescription, AlertIcon, AlertDemo };