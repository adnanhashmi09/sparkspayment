import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import './animation';

function Home() {
  useEffect(() => {
    const btn = document.querySelector('.button');
    btn.onmousemove = (e) => {
      const x = e.pageX - btn.offsetLeft;
      const y = e.pageY - btn.offsetTop;
      btn.style.setProperty('--x', x + 'px');
      btn.style.setProperty('--y', y + 'px');
    };
  }, []);
  return (
    <div className="home">
      <h1>Donate for our cause</h1>
      <Link to="/checkout">
        <div className="button">
          <span>Donate</span>
        </div>
      </Link>
    </div>
  );
}

export default Home;
