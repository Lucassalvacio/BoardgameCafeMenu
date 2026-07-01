import { useEffect, useRef, useState } from "react";
import type { MenuCategory } from "../types";

interface CategoryNavProps {
  categories: MenuCategory[];
}

export function CategoryNav({ categories }: CategoryNavProps) {

  const [active, setActive] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollTo = (idx: number) => {

    const section = document.getElementById(`sec-${idx}`);

    if (!section) return;

    const y =
        window.scrollY +
        section.getBoundingClientRect().top -
        170;

    window.scrollTo({

        top: y,

        behavior: "smooth"

    });

};
  useEffect(() => {

    function handleScroll() {

      const sections = categories
          .map((_, i) => document.getElementById(`sec-${i}`))
          .filter(Boolean) as HTMLElement[];
  
      if (!sections.length) return;
  
      // If we're near the bottom of the page,
      // force the last category active.
      if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 5
      ) {
          setActive(sections.length - 1);
          return;
      }
  
      const offset = 180;
  
      let current = 0;
  
      sections.forEach((section, index) => {
  
          if (section.getBoundingClientRect().top <= offset) {
              current = index;
          }
  
      });
  
      setActive(current);
  
  }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {

        window.removeEventListener("scroll", handleScroll);

    };

}, [categories]);

  useEffect(() => {

    buttonRefs.current[active]?.scrollIntoView({

        behavior: "smooth",

        inline: "center",

        block: "nearest"

    });

}, [active]);

  return (

    <nav className="cats">

      {categories.map((sec, idx) => (

      <button

      ref={(el) => {

          buttonRefs.current[idx] = el;

      }}

      key={sec.category}

      className={active === idx ? "active" : ""}

      onClick={() => {

          setActive(idx);

          scrollTo(idx);

      }}

      >

          {sec.category}

        </button>

      ))}

    </nav>

  );

}