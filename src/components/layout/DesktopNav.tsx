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
    <ul className="hidden md:flex gap-x-6 text-sm uppercase tracking-wider text-onSurfaceVariant">
      {nav.map((item, index) => (
        <li key={index}>
          <a href={item.href} className="hover:text-primary transition-colors">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNav;
