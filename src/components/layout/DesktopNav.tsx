import React from "react";

interface NavItem {
  label: string;
  href: string;
}

interface DesktopNavProps {
  nav: NavItem[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ nav }) => {
  return (
    <ul className="hidden md:flex gap-6 font-mono text-sm uppercase tracking-wide text-onSurfaceVariant">
      {nav.map((item, index) => (
        <li key={index}>
          <a
            href={item.href}
            className="hover:text-primary border-b-2 border-transparent hover:border-primary"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNav;
