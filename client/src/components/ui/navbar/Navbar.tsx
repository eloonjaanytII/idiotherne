
import {useNavigate } from 'react-router-dom'
import SearchInput from '../searchInput/SearchInput'
import NavbarLogo from './NavbarLogo'
import NavbarUserIcon from './NavbarUserIcon'
import { useRef } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {

  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);
  
  const id = localStorage.getItem('userId')
  const userId = id ? Number(id) : null;

 useGSAP(() => {
    const nav = navRef.current;

    gsap.from(navRef.current, {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1) {
          // Скроллим вниз — плавно скрываем
          gsap.to(nav, { opacity: 0, duration: 0.3, ease: "power2.out" });
        } else {
          // Скроллим вверх — плавно показываем
          gsap.to(nav, { opacity: 1, duration: 0.3, ease: "power2.out" });
        }
      },
    });
  }, []);
  

  const handlerLogout = () => {
    localStorage.clear();
    navigate('/authorization/register');
  } 

  return (
    <div className="fixed left-0 top-0 w-full p-2 flex justify-between items-center z-100" ref={navRef}>
        <NavbarLogo />
        <SearchInput mode = 'navbar'/>
        <NavbarUserIcon {...{userId, handlerLogout}}/>
    </div>
  )
}

export default Navbar