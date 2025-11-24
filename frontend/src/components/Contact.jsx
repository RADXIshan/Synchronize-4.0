import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
              Get in <span className="text-cyan-400">Touch</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Have questions? Want to sponsor? Or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-gray-300">contact@synchronize.in</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span className="text-gray-300">XIM UNIVERSITY, Bhubaneswar, India</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} className="glass-card p-8 rounded-2xl space-y-6 border border-cyan-400/10">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/40 focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/40 focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/40 focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all transform hover:scale-[1.02] shadow-[0_0_25px_rgba(0,242,255,0.4)]">
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
