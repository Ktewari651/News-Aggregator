'use client';

import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
      
        <div className="footer-brand">
          <h2>News Aggregator</h2>
          <p>Creating immersive web experiences</p>
        </div>

      
        <div className="footer-social">
          {[Facebook, Twitter, Instagram, Github].map((Icon, index) => (
            <div key={index} className="social-icon">
              <Icon size={20} />
            </div>
          ))}
        </div>
      </div>

     
      <div className="footer-bottom">
        © {new Date().getFullYear()} MyAwesomeSite. All Rights Reserved.
      </div>
    </footer>
  );
}
