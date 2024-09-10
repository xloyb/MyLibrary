// ClientSideLink.tsx
"use client";

import { GiBlackBook } from "react-icons/gi";
import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

const ClientSideLink: React.FC<Props> = ({ href, children }) => {
  const handleClick = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2") as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false; 
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ClientSideLink;
