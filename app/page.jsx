"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "occupation": "",
    "productivity_challenges": "",
    "team_size": ""
});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Track active section
      const sections = ['hero', 'features', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
    "name": "",
    "email": "",
    "occupation": "",
    "productivity_challenges": "",
    "team_size": ""
});
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "#0f172a" }}></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <nav className="fixed top-0 w-full z-50 transition-all duration-300" style={{ 
        background: scrollY > 50 ? "rgba(15, 23, 42, 0.8)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
      }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">FocusTrack Pro</h1>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="hover:text-blue-400 transition-colors duration-300 relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="hover:text-purple-400 transition-colors duration-300 relative group">
              Reviews
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="hover:text-pink-400 transition-colors duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button className="rounded-full px-8 py-3 font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section id="hero" className="relative min-h-screen flex items-center justify-center py-32" style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: 1 - (scrollY / 1000)
        }}>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-block mb-6">
              <span className="px-6 py-3 rounded-full text-sm font-semibold bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20">
                ✨ Welcome to the Future
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Boost Your Productivity with FocusTrack Pro
            </h1>
            <p className="text-xl md:text-3xl opacity-90 mb-12 leading-relaxed max-w-4xl mx-auto">
              The ultimate tool for time tracking, deep focus, and seamless team collaboration. Unlock your potential with smarter workflows and real-time insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-12 py-6 text-xl font-bold rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                <span className="relative z-10">Start Your Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
              <button className="px-12 py-6 text-xl font-semibold rounded-full border-2 border-white border-opacity-20 hover:border-opacity-40 backdrop-blur-xl bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section id="features" className="py-32 max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Everything you need to succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group glass-effect rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:border-opacity-30 border-2 border-white border-opacity-10" style={{ animationDelay: "0ms" }}><div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">pomodoro</div><h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300">Pomodoro Timer</h3><p className="opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">Stay focused and eliminate distractions with our built-in Pomodoro timer. Schedule short, timed work sessions followed by breaks to maximize efficiency.</p></div><div className="group glass-effect rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:border-opacity-30 border-2 border-white border-opacity-10" style={{ animationDelay: "100ms" }}><div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">task_management</div><h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300">Task Management</h3><p className="opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">Organize your tasks, prioritize effortlessly, and set clear goals to ensure nothing falls through the cracks.</p></div><div className="group glass-effect rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:border-opacity-30 border-2 border-white border-opacity-10" style={{ animationDelay: "200ms" }}><div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">focus_modes</div><h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300">Focus Modes</h3><p className="opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">Choose from customizable focus modes that create an ideal work environment tailored to your productivity style.</p></div><div className="group glass-effect rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:border-opacity-30 border-2 border-white border-opacity-10" style={{ animationDelay: "300ms" }}><div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">analytics</div><h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300">Productivity Analytics</h3><p className="opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">Gain actionable insights into how you spend your time with detailed analytics to help you identify areas for improvement.</p></div><div className="group glass-effect rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:border-opacity-30 border-2 border-white border-opacity-10" style={{ animationDelay: "400ms" }}><div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">team_collaboration</div><h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300">Team Collaboration</h3><p className="opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">Collaborate effectively with your team using shared task lists, team-wide analytics, and real-time updates.</p></div><div className="group glass-effect rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:border-opacity-30 border-2 border-white border-opacity-10" style={{ animationDelay: "500ms" }}><div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">integrations</div><h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300">Seamless Integrations</h3><p className="opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">Connect with your favorite tools like Slack, Trello, Google Calendar, and more to streamline your workflow.</p></div>
          </div>
        </section>

        <section id="testimonials" className="py-32 max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Loved by Thousands
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              See what our customers are saying
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-effect rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border-2 border-white border-opacity-10 hover:border-opacity-30" style={{ animationDelay: "0ms" }}><div className="text-3xl mb-6">⭐⭐⭐⭐⭐</div><p className="mb-8 text-lg italic leading-relaxed opacity-90">&ldquo;FocusTrack Pro has completely changed how I work. The Pomodoro timer helps me stay on track, and the analytics give me a clear picture of how I spend my time. Highly recommend it!&rdquo;</p><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">S</div><div><div className="font-bold text-lg">Sarah Johnson</div><div className="opacity-60 text-sm">Freelance Designer • Self-Employed</div></div></div></div><div className="glass-effect rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border-2 border-white border-opacity-10 hover:border-opacity-30" style={{ animationDelay: "100ms" }}><div className="text-3xl mb-6">⭐⭐⭐⭐</div><p className="mb-8 text-lg italic leading-relaxed opacity-90">&ldquo;Our team productivity has skyrocketed since adopting FocusTrack Pro. The shared task lists keep everyone aligned, and the integrations were a breeze to set up.&rdquo;</p><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">M</div><div><div className="font-bold text-lg">Michael Carter</div><div className="opacity-60 text-sm">Product Manager • Tech Solutions Inc.</div></div></div></div><div className="glass-effect rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border-2 border-white border-opacity-10 hover:border-opacity-30" style={{ animationDelay: "200ms" }}><div className="text-3xl mb-6">⭐⭐⭐⭐⭐</div><p className="mb-8 text-lg italic leading-relaxed opacity-90">&ldquo;As someone who works remotely, staying focused can be a challenge. FocusTrack Pro helps me structure my day and stay accountable. Love the focus modes!&rdquo;</p><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">E</div><div><div className="font-bold text-lg">Emily Tran</div><div className="opacity-60 text-sm">Remote Worker • Digital Nomad Co.</div></div></div></div>
          </div>
        </section>

        <section id="contact" className="py-32 max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl opacity-80">
              We'd love to hear from you
            </p>
          </div>
          <div className="glass-effect rounded-3xl p-12 shadow-2xl border-2 border-white border-opacity-10 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group"><label className="block mb-2 font-semibold text-sm uppercase tracking-wide opacity-70 group-focus-within:opacity-100 transition-opacity">Full Name</label><input type="text" name="name" required value={formData.name} onChange={handleFormChange} className="w-full rounded-2xl px-6 py-4 bg-black bg-opacity-30 border-2 border-white border-opacity-10 focus:border-opacity-30 focus:outline-none transition-all backdrop-blur-xl" placeholder="John Doe" /></div>
<div className="group"><label className="block mb-2 font-semibold text-sm uppercase tracking-wide opacity-70 group-focus-within:opacity-100 transition-opacity">Email</label><input type="email" name="email" required value={formData.email} onChange={handleFormChange} className="w-full rounded-2xl px-6 py-4 bg-black bg-opacity-30 border-2 border-white border-opacity-10 focus:border-opacity-30 focus:outline-none transition-all backdrop-blur-xl" placeholder="email@example.com" /></div>
<div className="group"><label className="block mb-2 font-semibold text-sm uppercase tracking-wide opacity-70 group-focus-within:opacity-100 transition-opacity">Occupation</label><input type="text" name="occupation" required value={formData.occupation} onChange={handleFormChange} className="w-full rounded-2xl px-6 py-4 bg-black bg-opacity-30 border-2 border-white border-opacity-10 focus:border-opacity-30 focus:outline-none transition-all backdrop-blur-xl" placeholder="e.g., Software Developer" /></div>
<div className="group"><label className="block mb-2 font-semibold text-sm uppercase tracking-wide opacity-70 group-focus-within:opacity-100 transition-opacity">Productivity Challenges</label><textarea name="productivity_challenges" required value={formData.productivity_challenges} onChange={handleFormChange} rows="5" className="w-full rounded-2xl px-6 py-4 bg-black bg-opacity-30 border-2 border-white border-opacity-10 focus:border-opacity-30 focus:outline-none transition-all backdrop-blur-xl" placeholder="Describe your productivity challenges..."></textarea></div>
<div className="group"><label className="block mb-2 font-semibold text-sm uppercase tracking-wide opacity-70 group-focus-within:opacity-100 transition-opacity">Team Size</label><input type="number" name="team_size" required value={formData.team_size} onChange={handleFormChange} className="w-full rounded-2xl px-6 py-4 bg-black bg-opacity-30 border-2 border-white border-opacity-10 focus:border-opacity-30 focus:outline-none transition-all backdrop-blur-xl" placeholder="e.g., 5" /></div>
              {submitStatus === "success" && (
                <div className="rounded-2xl p-6 text-center font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white transform animate-bounce">
                  ✓ Thank you! We'll be in touch soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="rounded-2xl p-6 text-center font-semibold bg-gradient-to-r from-red-500 to-pink-600 text-white">
                  ✗ Oops! Something went wrong. Please try again.
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl px-8 py-6 text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "⏳ Sending..." : "🚀 Send Message"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white border-opacity-10 py-16 mt-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
                FocusTrack Pro
              </h3>
              <p className="opacity-60">Built with AI • © 2024</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-xl">in</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-xl">⚡</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
