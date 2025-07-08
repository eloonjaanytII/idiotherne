import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export function useMoviesCarousel(carouselFilmData: any[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const [currentData, setCurrentData] = useState(carouselFilmData[0].data);

  // При смене data сбрасываем currentData
  useEffect(() => {
    setCurrentData(carouselFilmData[0].data);
  }, [carouselFilmData]);

  useEffect(() => {
    const carousel = containerRef.current;
    const images = imagesRef.current;

    // 🛑 Если нет контейнера или картинок — не запускаем!
    if (!carousel || !images.length) return;

    const radius = 242;
    const progress = { value: 0 };

    const observer = Observer.create({
      target: carousel,
      type: "wheel,pointer",
      onPress: () => {
        carousel.style.cursor = "grabbing";
      },
      onRelease: () => {
        carousel.style.cursor = "grab";
      },
      onChange: (self) => {
        gsap.killTweensOf(progress);
        const p =
          self.event.type === "wheel"
            ? self.deltaY * -0.0005
            : self.deltaX * 0.05;
        gsap.to(progress, {
          duration: 2,
          ease: "power4.out",
          value: `+=${p}`,
        });
      },
    });

    const deadZone = 0.2;

    const animate = () => {
      images.forEach((image, index) => {
        if (!image) return; // страховка

        const theta = index / images.length - progress.value;
        const angle = theta - Math.floor(theta);
        const normalizedAngle = angle < 0 ? angle + 1 : angle;

        const x = -Math.sin(normalizedAngle * 2 * Math.PI) * radius;
        const y = Math.cos(normalizedAngle * 2 * Math.PI) * radius;

        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${
          360 * -normalizedAngle
        }deg)`;

        const visible = normalizedAngle < deadZone || normalizedAngle > 1 - deadZone;
        image.style.opacity = visible ? "1" : "0";
        image.style.pointerEvents = visible ? "auto" : "none";
        image.style.filter = `blur(${visible ? 0 : 5}px)`;
      });
    };

    gsap.ticker.add(animate);

    return () => {
      gsap.ticker.remove(animate);
      observer.kill();
    };
  }, [currentData]); // 👈 Ключевое: пересоздаём Observer, если данные поменялись

  return {
    containerRef,
    imagesRef,
    currentData,
    setCurrentData,
  };
}