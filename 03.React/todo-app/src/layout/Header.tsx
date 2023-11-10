import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header style={{textAlign: 'center'}}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;