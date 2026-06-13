import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, ShieldAlert, CheckCircle, ArrowRight, CornerDownRight, Sparkles } from 'lucide-react';

const PROJECT_TYPES = [
  'Video Editing',
  'Photo Editing',
  'Brand Identity Design',
  'Motion Graphics',
  'Social Media Content',
  'YouTube Video Production',
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Video Editing',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live validator checks
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'Name is required.';
      else if (value.trim().length < 2) error = 'Please enter a valid name.';
    } else if (name === 'email') {
      if (!value.trim()) error = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address.';
      }
    } else if (name === 'message') {
      if (!value.trim()) error = 'Message cannot be empty.';
      else if (value.trim().length < 10) error = 'Please tell us a bit more (min 10 characters).';
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const selectProjectType = (type: string) => {
    setFormData(prev => ({ ...prev, projectType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validations
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isMsgValid = validateField('message', formData.message);

    if (isNameValid && isEmailValid && isMsgValid) {
      setIsSubmitting(true);
      
      // Simulate high-fidelity network handshake to server
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitSuccessful(true);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'Video Editing',
      message: '',
    });
    setFormErrors({ name: '', email: '', message: '' });
    setIsSubmitSuccessful(false);
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 w-full overflow-hidden bg-black text-white"
    >
      {/* Background glowing vectors */}
      <div 
        id="contact-back-glow"
        className="absolute top-[30%] left-[45%] w-[550px] h-[550px] rounded-full bg-white/[0.015] blur-[140px] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Metadata owner details */}
          <div className="lg:col-span-5 flex flex-col items-start text-left justify-between">
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                  [ 05 // DIGITAL INBOX ]
                </span>
              </div>
              
              <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-white mb-6">
                Start a Project
              </h2>
              
              <p className="font-sans text-white/50 text-base leading-relaxed mb-8 max-w-md">
                Have an upcoming campaign, channel revamp, or branding launch? Reach out today to lease our premium design resources.
              </p>
            </div>

            {/* Structured specifications card highlighting Vashu Singh */}
            <div className="w-full space-y-6 pt-8 border-t border-white/[0.06]">
              {/* Creator Card info */}
              <div id="contact-owner-card" className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-lg glass-glow-card">
                <span className="font-mono text-[9px] text-white/35 uppercase tracking-widest block mb-2">STUDIO FOUNDER</span>
                <h4 className="font-display font-bold text-xl text-white mb-1">Vashu Singh</h4>
                <p className="font-sans text-xs text-white/45 mb-4">Lead Video Editor & Visual Architect</p>
                
                {/* Email link with Mail icon */}
                <a
                  href="mailto:svashu193@gmail.com"
                  id="owner-email-link"
                  className="group inline-flex items-center gap-2.5 text-xs font-mono font-medium text-white/90 hover:text-white transition-colors py-1.5 focus:outline-none"
                >
                  <Mail className="w-4 h-4 text-white/55 group-hover:text-white transition-colors" />
                  <span className="underline decoration-white/20 group-hover:decoration-white">svashu193@gmail.com</span>
                </a>
              </div>

              {/* Instant Response SLA guarantee */}
              <div className="flex gap-3 items-start pl-2">
                <CornerDownRight className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-display font-semibold text-xs text-white/90">SLA Response Guarantee</h5>
                  <p className="font-sans text-[11px] text-white/40 leading-normal mt-0.5">Vashu Singh personally reviews all incoming project files. Expect an diagnostic summary deck in your inbox within 12 hours.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Form fields or Success indicator */}
          <div className="lg:col-span-7">
            <div 
              id="contact-form-chassis"
              className="relative p-8 md:p-10 rounded-2xl bg-white/[0.015] border border-white/[0.08] backdrop-blur-md glass-glow-card min-h-[500px] flex flex-col justify-center"
            >
              <AnimatePresence mode="wait">
                {!isSubmitSuccessful ? (
                  // THE CONTACT FORM STATE
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                    noValidate
                  >
                    {/* Grid of basic information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-white/45 pl-1" htmlFor="name">
                          Your Name
                        </label>
                        <div className="relative">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="e.g. Liam Chen"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border focus:bg-white/[0.04] text-white text-xs outline-none transition-all duration-300 ${
                              formErrors.name 
                                ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.15)]' 
                                : 'border-white/10 focus:border-white/30'
                            }`}
                          />
                          {formErrors.name && (
                            <span className="flex items-center gap-1.5 font-sans text-[10px] text-red-500/80 mt-1.5 pl-1 leading-none">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              {formErrors.name}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-white/45 pl-1" htmlFor="email">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="e.g. liam@apex.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border focus:bg-white/[0.04] text-white text-xs outline-none transition-all duration-300 ${
                              formErrors.email 
                                ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.15)]' 
                                : 'border-white/10 focus:border-white/30'
                            }`}
                          />
                          {formErrors.email && (
                            <span className="flex items-center gap-1.5 font-sans text-[10px] text-red-500/80 mt-1.5 pl-1 leading-none">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              {formErrors.email}
                            </span>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* SELECT PROJECT TYPE (Modern chips matrix) */}
                    <div className="flex flex-col gap-2.5">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-white/45 pl-1">
                        Select Project Type
                      </label>
                      <div id="project-type-matrix" className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((type) => {
                          const isSelected = formData.projectType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              id={`project-type-chip-${type.replace(/\s+/g, '-').toLowerCase()}`}
                              onClick={() => selectProjectType(type)}
                              className={`px-3.5 py-2 rounded-lg font-sans text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                                isSelected
                                  ? 'bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.2)] scale-[1.01]'
                                  : 'bg-white/[0.02] text-white/55 border-white/[0.06] hover:border-white/15 hover:text-white'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-white/45 pl-1" htmlFor="message">
                        Message Details
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          placeholder="Please provide details about your project timeline, raw footage specs, and brand objectives..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border focus:bg-white/[0.04] text-white text-xs outline-none resize-none transition-all duration-300 ${
                            formErrors.message 
                              ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.15)]' 
                              : 'border-white/10 focus:border-white/30'
                          }`}
                        />
                        {formErrors.message && (
                          <span className="flex items-center gap-1.5 font-sans text-[10px] text-red-500/80 mt-1.5 pl-1 leading-none">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            {formErrors.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        id="form-submit-btn"
                        disabled={isSubmitting}
                        className="group w-full relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin w-4 h-4 rounded-full border-2 border-black border-t-transparent" />
                            <span>TRANSMITTING SIGNALS...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND PROJECT BLUEPRINTS</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  // HIGH FIDELITY SUCCESS RESOLUTION STATE CARD (Stellar layout UX!)
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center p-6 space-y-6"
                  >
                    {/* Glowing outer halo checkmark */}
                    <div className="relative w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/95 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                      <CheckCircle className="w-8 h-8" />
                      {/* Swirling spark dots */}
                      <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-white/80 animate-pulse" />
                    </div>

                    {/* Congratulatory typography detailing specifications */}
                    <div className="space-y-3.5 max-w-md">
                      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-full">
                        TRANSMISSION LOGGED SUCCESSFULLY
                      </span>
                      
                      <h4 className="font-display font-bold text-2xl text-white">
                        Project Received, {formData.name}!
                      </h4>
                      
                      <p className="font-sans text-xs text-white/50 leading-relaxed">
                        Your proposal for a <strong className="text-white/80">{formData.projectType}</strong> project has been successfully funneled into Vashu Singh's direct queue.
                      </p>

                      <p className="font-sans text-xs text-white/60 leading-relaxed">
                        A bespoke response deck is being formulated and will arrive at <strong className="text-white">{formData.email}</strong> shortly.
                      </p>
                    </div>

                    {/* Reset form toggle capsule */}
                    <button
                      id="success-resolution-reset-btn"
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 font-mono text-[10px] tracking-wider uppercase text-white/80 cursor-pointer transition-all duration-300"
                    >
                      <span>TRANSMIT ANOTHER BLUEPRINT</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(Contact);
