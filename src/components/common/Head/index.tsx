import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
}

type HeadPropsType = { itens: LinkProps[] };

const Menu = () => {
  return (
    <label htmlFor="menu-toggle">
      <div className="base-button-active w-[8.8125rem] h-[3.1875rem] flex justify-center items-center">
        Menu burguer
      </div>
    </label>
  );
};

const ListAside = ({ itens }: HeadPropsType) => (
  <aside className="-translate-x-[900%] transition-transform z-10 w-[50vw] h-[100vh] absolute px-5 m-0 top-[5.5625rem] left-0 bg-header flex-col">
    <ul>
      {itens.map((item, index) => (
        <Link key={index} href={item?.href ?? ""}>
          <li
            key={index}
            className="base-button w-[10.75rem] m-6 max-md:w-[7.5rem]"
          >
            {item.label}
          </li>
        </Link>
      ))}
    </ul>
  </aside>
);

const ListHead = ({ itens }: HeadPropsType) => (
  <ul className="flex">
    {itens.map((item, index) => (
      <Link key={index} href={item?.href ?? ""}>
        <li
          key={index}
          className="base-button w-[10.75rem] mx-6 max-md:w-[7.5rem]"
        >
          {item.label}
        </li>
      </Link>
    ))}
  </ul>
);

function Header() {
  const list = [
    { href: "/", label: "Página Inicial" },
    { href: "/blog", label: "Blog" },
  ];
  return (
    <header className="headerWithBurger sm:rounded-b-[1.25rem] sm:h-16 h-[5.5625rem] w-full flex justify-between items-center bg-header max-sm:px-2 sm:px-4 lg:px-16">
      <div className="relative h-full w-40">
        <Image alt="logo" src="/Franciscossian.svg" fill />
      </div>
      <nav className="max-sm:hidden">
        <ListHead itens={list} />
      </nav>
      <input type="checkbox" id="menu-toggle" className="hidden" />
      <div className="sm:hidden text-white">
        <Menu />
        <ListAside itens={list} />
      </div>
    </header>
  );
}

export default Header;
