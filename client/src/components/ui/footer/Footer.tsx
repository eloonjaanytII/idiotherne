const Footer: React.FC = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-accent text-base-200 rounded p-5 gap-2">
      <nav className="flex gap-4 h-[3rem] items-center">
        <a className="link link-hover" href="https://t.me/nyalinn_taro"><img src="/taro.png" alt="taro" className='h-10 w-10 object-contain'/></a>
        <a className="link link-hover" href="https://t.me/nazvaniena"><img src="/plenka.png" alt="plenka" className='h-10 w-10 object-contain'/></a>
        <a className="link link-hover" href="https://t.me/kidjunimo"><img src="/microphone.png" alt="microphone" className='h-10 w-10 object-contain'/></a>
        <a className="link link-hover" href="https://t.me/beerschaque"><img src="/clown.png" alt="clown" className='h-10 w-10 object-contain'/></a>
      </nav>
      <aside>
        <p className='text-2xl'>© {new Date().getFullYear()} - Bershaque Nikolai Vladimirovich</p>
      </aside>
</footer>
  )
}

export default Footer