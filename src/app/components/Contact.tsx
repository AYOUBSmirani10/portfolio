import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Merci pour votre message ! Je vous répondrai rapidement.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-20" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column - Contact Info */}
        <div className="flex flex-col justify-center gap-8">
          <div>
            <h2 style={{ marginBottom: '16px' }}>Travaillons ensemble.</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              Je suis toujours intéressé par de nouveaux projets et opportunités. Que vous ayez une
              question ou que vous souhaitiez simplement échanger, n'hésitez pas à me contacter.
            </p>
          </div>

          {/* Email */}
          <div
            id="contact-email"
            className="card-3d flex items-center gap-4 p-4 rounded-xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              scrollMarginTop: '110px',
            }}
          >
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: '48px',
                height: '48px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <Mail size={20} style={{ color: 'var(--accent-blue)' }} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 'var(--text-small)',
                  color: 'var(--text-muted)',
                  marginBottom: '4px',
                }}
              >
                Écrivez-moi à
              </div>
              <a
                href="mailto:ayoubsmirani9@gmail.com"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-blue)',
                  fontSize: '16px',
                }}
              >
                ayoubsmirani9@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}
            >
              Me retrouver
            </div>
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub', url: 'https://github.com/AyoubSmirani' },
                { icon: Linkedin, label: 'LinkedIn', url: '#' },
                { icon: Twitter, label: 'Twitter', url: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="flex items-center justify-center rounded-lg transition-all duration-300"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                    e.currentTarget.style.color = 'var(--accent-blue)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: 'var(--text-small)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--text-secondary)',
                }}
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-body)',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: 'var(--text-small)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--text-secondary)',
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-body)',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="message"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: 'var(--text-small)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--text-secondary)',
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 resize-none"
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-body)',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg transition-all duration-300"
              style={{
                background: 'var(--accent-blue)',
                color: 'white',
                fontWeight: 'var(--weight-medium)',
                fontSize: 'var(--text-body)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 0 rgba(59, 130, 246, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-glow-blue)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 rgba(59, 130, 246, 0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Send size={18} />
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
