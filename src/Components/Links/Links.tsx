
import { LinkHTMLAttributes, MouseEvent } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';

interface Props {
  to: string ;
  children: React.ReactNode;
}

const style = {
  display: 'block',
  padding: 'var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x)',
  fontSize: 'var(--bs-nav-link-font-size)',
  fontWeight: 'var(--bs-nav-link-font-weight)',
  color: 'var(--bs-nav-link-color)',
  textDecoration: 'none',
  background: '0',
  border: '0',
  transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out',
}

function Links ({to, children}: Props) {

  const changeBackground = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.background = 'grey';
      e.currentTarget.style.color = 'white';
  }

  const changeBackgroundBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = '0';
    e.currentTarget.style.color = 'var(--bs-nav-link-color)';
  }
  return (
    <Nav.Item><NavLink onMouseEnter={changeBackground}  onMouseLeave={changeBackgroundBack} style={style} to={to}>{children}</NavLink></Nav.Item>
  );
}

export default Links;