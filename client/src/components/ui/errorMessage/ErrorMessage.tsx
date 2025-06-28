const ErrorMessage: React.FC = () => {
  return (
    <div className='flex items-center justify-center gap-x-2 m-auto text-4xl'>
        <div className="inline-grid *:[grid-area:1/1]">
        <div className="status status-error animate-ping"></div>
        <div className="status status-error"></div>
        </div> Server is down
    </div>
    
  )
}

export default ErrorMessage