'use client';

export default function ReturnsPage() {
  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to start a return for a recent order.";
    const whatsappUrl = `https://wa.me/971506970154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="returns-page">
      <section className="returns-hero">
        <div className="container">
          <div className="returns-hero-content">
            <h1>Returns</h1>
            <p>Our return and warranty policy</p>
          </div>
        </div>
      </section>

      <div className="container returns-content">
        <div className="returns-card">
          <h2>Return Policy</h2>
          <p>
            We have a 7-day return policy for unused products in their original
            packaging. Custom-made or installed products cannot be returned unless
            there is a manufacturing defect.
          </p>
        </div>

        <div className="returns-card">
          <h2>Warranty Coverage</h2>
          <ul>
            <li><strong>LED products:</strong> 2–3 years warranty</li>
            <li><strong>Traditional lighting fixtures:</strong> 1–2 years warranty</li>
            <li><strong>Outdoor lights:</strong> 2 years weather-resistant warranty</li>
          </ul>
        </div>

        <div className="returns-card">
          <h2>How to Start a Return</h2>
          <p>
            Contact us on WhatsApp with your order details. Our team will confirm
            eligibility and arrange collection or exchange.
          </p>
        </div>

        <div className="returns-cta">
          <p>Ready to start a return? Message us on WhatsApp.</p>
          <button onClick={handleWhatsAppContact} className="btn btn-whatsapp">
            <span>💬</span>
            Start a Return
          </button>
        </div>
      </div>

      <style jsx>{`
        .returns-page {
          min-height: 100vh;
          background-color: #f9fafb;
        }

        .returns-hero {
          background-color: white;
          padding: 3rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        @media (min-width: 768px) {
          .returns-hero {
            padding: 4rem 0;
          }
        }

        .returns-hero-content {
          text-align: center;
        }

        .returns-hero-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
          font-family: 'Poppins', sans-serif;
        }

        @media (min-width: 768px) {
          .returns-hero-content h1 {
            font-size: 3rem;
          }
        }

        .returns-hero-content p {
          font-size: 1rem;
          color: #6b7280;
          font-family: 'Inter', sans-serif;
        }

        @media (min-width: 768px) {
          .returns-hero-content p {
            font-size: 1.2rem;
          }
        }

        .returns-content {
          padding: 2rem 0 4rem;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .returns-content {
            padding: 4rem 0;
          }
        }

        .returns-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
        }

        @media (min-width: 768px) {
          .returns-card {
            padding: 2rem;
          }
        }

        .returns-card h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          font-family: 'Poppins', sans-serif;
        }

        .returns-card p,
        .returns-card li {
          color: #6b7280;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .returns-card ul {
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .returns-card strong {
          color: #374151;
        }

        .returns-cta {
          text-align: center;
          padding: 1.5rem 0;
        }

        .returns-cta p {
          color: #6b7280;
          margin-bottom: 1rem;
          font-family: 'Inter', sans-serif;
        }

        .btn-whatsapp {
          background-color: #25d366;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-whatsapp:hover {
          background-color: #22c55e;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
