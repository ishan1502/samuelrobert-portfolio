import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Twitter, Linkedin, Mail, Check, Settings, Calendar, Briefcase, Quote, TrendingUp, BarChart2, PieChart, Target, DollarSign } from 'lucide-react';

const App = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(85), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
      setEmail('');
    }, 1500);
  };

  // 3D Tilt Effect - using useSpring for smooth, glitch-free interpolation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((event.clientX - centerX) / 40);
    mouseY.set((event.clientY - centerY) / 40);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  // Floating background objects
  const bgIconVariants = {
    animate: (i) => ({
      y: [0, -30, 0],
      x: [0, i % 2 === 0 ? 20 : -20, 0],
      rotate: [0, i % 2 === 0 ? 10 : -10, 0],
      transition: {
        duration: 10 + i * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="min-h-[100svh] bg-[#0B0C10] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans py-8 px-4">
      
      {/* Ambient Lighting & Floating Sales Objects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] md:w-[60vw] md:h-[60vw] rounded-full bg-blue-600/30 blur-[80px] md:blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0.4, 0.25], rotate: [0, -90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] md:w-[70vw] md:h-[70vw] rounded-full bg-purple-600/20 blur-[80px] md:blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] right-[10%] w-[300px] h-[300px] md:w-[40vw] md:h-[40vw] rounded-full bg-cyan-500/20 blur-[60px] md:blur-[100px]" />
        
        {/* Floating Icons */}
        <motion.div custom={1} variants={bgIconVariants} animate="animate" className="absolute top-[10%] left-[5%] md:left-[15%] text-cyan-500/20 md:text-cyan-500/10">
          <TrendingUp className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>
        <motion.div custom={2} variants={bgIconVariants} animate="animate" className="absolute bottom-[15%] left-[5%] md:left-[10%] text-purple-500/20 md:text-purple-500/10">
          <BarChart2 className="w-20 h-20 md:w-28 md:h-28" />
        </motion.div>
        <motion.div custom={3} variants={bgIconVariants} animate="animate" className="absolute top-[20%] right-[5%] md:right-[10%] text-blue-500/20 md:text-blue-500/10">
          <Target className="w-28 h-28 md:w-40 md:h-40" />
        </motion.div>
        <motion.div custom={4} variants={bgIconVariants} animate="animate" className="absolute bottom-[20%] right-[5%] md:right-[15%] text-emerald-500/20 md:text-emerald-500/10">
          <DollarSign className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
      </div>

      <motion.div 
        className="z-10 w-full max-w-3xl flex flex-col items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Glass Card */}
        <motion.div 
          className="glass-panel rounded-[2rem] p-8 md:p-12 w-full flex flex-col items-center text-center relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: rotateX, rotateY: rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(255,255,255,0.05)" }}
        >
          {/* Avatar */}
          <motion.div variants={itemVariants} className="relative mb-6 group cursor-pointer" style={{ transform: "translateZ(30px)" }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden glass-panel p-1.5 z-10"
            >
              <img 
                src="/robert.png" 
                alt="Samuel Robert" 
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop";
                }}
              />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-5" style={{ transform: "translateZ(20px)" }}>
            <span className="glass-panel px-4 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wide text-cyan-100/90 border-cyan-500/30 flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              Available for Projects Soon
            </span>
          </motion.div>

          {/* Typography */}
          <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-3 tracking-tight" style={{ transform: "translateZ(40px)" }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Samuel Robert
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-base md:text-lg max-w-xl mb-6 leading-relaxed px-4" style={{ transform: "translateZ(20px)" }}>
            Portfolio Under Construction — Driving Revenue, Scaling Growth, and Building Strategic Partnerships.
          </motion.p>

          {/* Sales Quote */}
          <motion.div variants={itemVariants} className="mb-10 flex flex-col items-center" style={{ transform: "translateZ(15px)" }}>
            <Quote className="w-5 h-5 text-cyan-500/40 mb-2 transform rotate-180" />
            <p className="text-slate-500 text-sm italic font-medium tracking-wide">
              "Opportunities don't happen. You create them."
            </p>
          </motion.div>

          {/* Status Indicator */}
          <motion.div variants={itemVariants} className="w-full max-w-sm mb-10 text-left" style={{ transform: "translateZ(25px)" }}>
            <div className="flex justify-between text-xs md:text-sm text-slate-300 mb-2 font-medium px-1">
              <span>Launch Pipeline</span>
              <span className="text-cyan-300">{progress}% Complete</span>
            </div>
            <div className="h-1.5 w-full glass-panel rounded-full overflow-hidden border-none bg-white/5 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/40 to-transparent blur-[2px] animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          {/* Lead Capture Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="w-full max-w-sm relative flex items-center gap-2" style={{ transform: "translateZ(30px)" }}>
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-md opacity-0 group-focus-within:opacity-40 transition-opacity duration-300" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-panel rounded-xl px-4 py-3 outline-none focus:border-white/30 text-sm relative z-10 placeholder:text-slate-500 transition-colors shadow-inner"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="relative rounded-xl px-5 py-3 font-medium text-sm overflow-hidden group disabled:opacity-70 transition-all border border-white/10 hover:border-white/30 shrink-0 min-w-[110px] flex justify-center"
            >
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span key="idle" className="relative z-10 flex items-center shadow-sm" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    Notify Me
                  </motion.span>
                )}
                {status === 'loading' && (
                  <motion.span key="loading" className="relative z-10 flex items-center text-cyan-300 gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                      <Settings className="w-4 h-4" />
                    </motion.div>
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span key="success" className="relative z-10 flex items-center text-emerald-400" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Check className="w-4 h-4 mr-1.5" /> Added
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.form>
        </motion.div>

        {/* Social Dock */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-4 md:gap-6"
        >
          <SocialIcon icon={<Linkedin className="w-4 h-4 md:w-5 md:h-5" />} label="LinkedIn" />
          <SocialIcon icon={<Twitter className="w-4 h-4 md:w-5 md:h-5" />} label="X / Twitter" />
          <SocialIcon icon={<Briefcase className="w-4 h-4 md:w-5 md:h-5" />} label="Experience" />
          <SocialIcon icon={<Calendar className="w-4 h-4 md:w-5 md:h-5" />} label="Book a Call" />
          <SocialIcon icon={<Mail className="w-4 h-4 md:w-5 md:h-5" />} label="Email" />
        </motion.div>

      </motion.div>

    </div>
  );
};

const SocialIcon = ({ icon, label }) => (
  <div className="relative group flex items-center justify-center">
    <motion.a 
      href="#" 
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
    >
      {icon}
    </motion.a>
    {/* Tooltip */}
    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform origin-bottom glass-panel px-3 py-1.5 rounded-md text-xs font-medium border-white/5 whitespace-nowrap pointer-events-none">
      {label}
    </div>
  </div>
);

export default App;
