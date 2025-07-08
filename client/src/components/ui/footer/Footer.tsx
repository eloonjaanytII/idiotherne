const Footer: React.FC = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-accent text-base-200 rounded p-5 gap-2">
      <p className='text-2xl'>© {new Date().getFullYear()} - Bershaque Nikolai Vladimirovich</p>
    </footer>
  )
}

export default Footer