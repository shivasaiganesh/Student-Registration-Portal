import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Counter: React.FC<{ target: number, duration: number, prefix?: string, suffix?: string }> = ({ target, duration, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let animationFrame: number;
    
    const startAnimation = () => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function: easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * target));
        
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };
      animationFrame = window.requestAnimationFrame(step);
    };

    if (ref.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
          observer.disconnect(); // Animate only once
        }
      }, { threshold: 0.1 });
      observer.observe(ref.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const Landing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrolled = window.scrollY;
      const cards = containerRef.current.querySelectorAll('.parallax-card');
      
      cards.forEach((card, index) => {
        const speed = 1 + (index % 3) * 0.2;
        const yPos = -(scrolled * speed * 0.1);
        (card as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-wrapper" style={{ overflow: 'hidden', position: 'relative', paddingTop: 0 }}>
        
        {/* Hero Section - Reversed Colors: White background, Dark Green text */}
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'linear-gradient(to bottom, #ffffff, #f0f4f2)' }}>
          
          {/* Faint watermark campus image or shapes */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, backgroundImage: 'url(https://srmap.edu.in/wp-content/uploads/2021/08/campus-image-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          
          <div className="container" style={{ textAlign: 'center', color: 'var(--primary-green)', zIndex: 1, perspective: '1000px', paddingTop: '80px' }}>
            <h1 style={{ fontSize: '4.5rem', marginBottom: '1rem', textShadow: '0 10px 30px rgba(0,74,43,0.1)', transform: 'translateZ(50px)' }}>Welcome to SRM University AP</h1>
            <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 2rem', color: 'var(--text-muted)', transform: 'translateZ(30px)' }}>
              Empowering the next generation of innovators through world-class education, cutting-edge research, and visionary leadership.
            </p>
          </div>
          
          {/* Decorative 3D Elements */}
          <div className="glass-panel" style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--light-green), transparent)', top: '10%', left: '-50px', filter: 'blur(50px)', opacity: 0.3, animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="glass-panel" style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'linear-gradient(-45deg, var(--primary-green), transparent)', bottom: '-100px', right: '-100px', filter: 'blur(60px)', opacity: 0.2, animation: 'float 8s ease-in-out infinite reverse' }}></div>
        </div>

        {/* Achievements Section - Dark Green background, White text */}
        <div ref={containerRef} style={{ padding: '120px 0', background: 'var(--primary-green)', position: 'relative', color: 'white' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '80px', color: 'white' }}>A Legacy of Excellence</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', position: 'relative' }}>
              
              <div className="glass-card parallax-card" style={{ padding: '40px', textAlign: 'center', zIndex: 3, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <h3 style={{ fontSize: '3.5rem', margin: '0', color: 'white' }}><Counter target={100} duration={2000} suffix="%" /></h3>
                <p style={{ fontSize: '1.2rem', marginTop: '10px', color: '#e0e0e0' }}>Placement Record</p>
                <div style={{ fontSize: '0.9rem', color: 'var(--light-green)', marginTop: '8px' }}>in Top Fortune 500 Companies</div>
              </div>

              <div className="glass-card parallax-card" style={{ padding: '40px', textAlign: 'center', zIndex: 2, marginTop: '30px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <h3 style={{ fontSize: '3.5rem', margin: '0', color: 'white' }}><Counter target={50} duration={2000} suffix="+" /></h3>
                <p style={{ fontSize: '1.2rem', marginTop: '10px', color: '#e0e0e0' }}>Global Partnerships</p>
                <div style={{ fontSize: '0.9rem', color: 'var(--light-green)', marginTop: '8px' }}>MIT, UC Berkeley & more</div>
              </div>

              <div className="glass-card parallax-card" style={{ padding: '40px', textAlign: 'center', zIndex: 1, marginTop: '60px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <h3 style={{ fontSize: '3.5rem', margin: '0', color: 'white' }}><Counter target={50} duration={2500} prefix="₹" suffix="Cr+" /></h3>
                <p style={{ fontSize: '1.2rem', marginTop: '10px', color: '#e0e0e0' }}>Research Grants</p>
                <div style={{ fontSize: '0.9rem', color: 'var(--light-green)', marginTop: '8px' }}>From DST, DBT, ISRO & DRDO</div>
              </div>

              <div className="glass-card parallax-card" style={{ padding: '40px', textAlign: 'center', zIndex: 3, marginTop: '-20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <h3 style={{ fontSize: '3.5rem', margin: '0', color: 'white' }}><Counter target={200} duration={2500} suffix="+" /></h3>
                <p style={{ fontSize: '1.2rem', marginTop: '10px', color: '#e0e0e0' }}>Faculty Members</p>
                <div style={{ fontSize: '0.9rem', color: 'var(--light-green)', marginTop: '8px' }}>100% Ph.D. Holders</div>
              </div>

              <div className="glass-card parallax-card" style={{ padding: '40px', textAlign: 'center', zIndex: 2, marginTop: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <h3 style={{ fontSize: '3.5rem', margin: '0', color: 'white' }}><Counter target={15} duration={1500} suffix="+" /></h3>
                <p style={{ fontSize: '1.2rem', marginTop: '10px', color: '#e0e0e0' }}>Research Centers</p>
                <div style={{ fontSize: '0.9rem', color: 'var(--light-green)', marginTop: '8px' }}>State-of-the-art facilities</div>
              </div>

              <div className="glass-card parallax-card" style={{ padding: '40px', textAlign: 'center', zIndex: 1, marginTop: '40px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <h3 style={{ fontSize: '3.5rem', margin: '0', color: 'white' }}><Counter target={30} duration={2000} suffix="+" /></h3>
                <p style={{ fontSize: '1.2rem', marginTop: '10px', color: '#e0e0e0' }}>Student Clubs</p>
                <div style={{ fontSize: '0.9rem', color: 'var(--light-green)', marginTop: '8px' }}>Fostering holistic growth</div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer / About Section */}
        <div style={{ background: '#f5f7f6', padding: '100px 0 60px 0', borderTop: '1px solid #e0e0e0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              
              <div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>About SRM AP</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '30px' }}>
                  SRM University, Andhra Pradesh is a multi-stream research university with a focus on diverse foundation courses, industry integrations, and research orientation. We are dedicated to creating an environment that fosters intellectual curiosity and entrepreneurial spirit.
                </p>
                
                <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--primary-green)' }}>Helpline Details</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)' }}>
                    <div className="btn-icon"><Phone size={18} /></div>
                    <span>+91 866 2429 299 | 1800-599-2233 (Toll Free)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)' }}>
                    <div className="btn-icon"><Mail size={18} /></div>
                    <span>admissions@srmap.edu.in</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)' }}>
                    <div className="btn-icon"><MapPin size={18} /></div>
                    <span>Mangalagiri Mandal, Amaravati, Andhra Pradesh 522502</span>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '50px', textAlign: 'center', background: 'white' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" style={{ height: '50px', marginBottom: '30px', display: 'inline-block' }}>
                  <text x="0" y="28" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="32" fill="var(--primary-green)">SRM</text>
                  <text x="75" y="18" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="12" fill="var(--secondary-green)">UNIVERSITY</text>
                  <text x="75" y="28" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="9" fill="var(--text-muted)">Andhra Pradesh</text>
                </svg>
                <h3 style={{ marginBottom: '15px' }}>Staff & Administration</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                  Access the internal portal to manage student records, registrations, and academic details.
                </p>
                <Link to="/login" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem', borderRadius: '30px' }}>
                    Login to Admin Portal <ArrowRight size={20} />
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>
    </>
  );
};

export default Landing;
