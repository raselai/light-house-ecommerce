'use client';

export default function ShippingPage() {
  const handleWhatsAppContact = () => {
    const message = "Hi! I have a question about delivery for an order.";
    const whatsappUrl = `https://wa.me/971506970154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="shipping-page">
      <section className="shipping-hero">
        <div className="container">
          <div className="shipping-hero-content">
            <h1>Shipping Info</h1>
            <p>Delivery across all seven Emirates</p>
          </div>
        </div>
      </section>

      <div className="container shipping-content">
        <div className="shipping-card">
          <h2>Delivery Coverage</h2>
          <p>
            We deliver to all Emirates including Dubai, Abu Dhabi, Sharjah, Ajman,
            Ras Al Khaimah, Fujairah, and Umm Al Quwain. Delivery charges apply based
            on your location and order value.
          </p>
        </div>

        <div className="shipping-card">
          <h2>Delivery Timelines</h2>
          <ul>
            <li><strong>Standard delivery:</strong> 2–5 business days within UAE</li>
            <li><strong>Express delivery:</strong> available for urgent orders</li>
            <li><strong>Custom or imported products:</strong> 7–14 days</li>
          </ul>
        </div>

        <div className="shipping-card">
          <h2>Installation Services</h2>
          <p>
            We provide professional installation services across UAE. Our certified
            electricians ensure safe and proper installation of all lighting fixtures.
            Installation charges vary based on complexity and location.
          </p>
        </div>

        <div className="shipping-cta">
          <p>Questions about a delivery? Reach us on WhatsApp.</p>
          <button onClick={handleWhatsAppContact} className="btn btn-whatsapp">
            <span>💬</span>
            Ask on WhatsApp
          </button>
        </div>
      </div>

      <style jsx>{`
        .shipping-page {
          min-height: 100vh;
          background-color: #f9fafb;
        }

        .shipping-hero {
          background-color: white;
          padding: 3rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        @media (min-width: 768px) {
          .shipping-hero {
            padding: 4rem 0;
          }
        }

        .shipping-hero-content {
          text-align: center;
        }

        .shipping-hero-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
          font-family: 'Poppins', sans-serif;
        }

        @media (min-width: 768px) {
          .shipping-hero-content h1 {
            font-size: 3rem;
          }
        }

        .shipping-hero-content p {
          font-size: 1rem;
          color: #6b7280;
          font-family: 'Inter', sans-serif;
        }

        @media (min-width: 768px) {
          .shipping-hero-content p {
            font-size: 1.2rem;
          }
        }

        .shipping-content {
          padding: 2rem 0 4rem;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .shipping-content {
            padding: 4rem 0;
          }
        }

        .shipping-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
        }

        @media (min-width: 768px) {
          .shipping-card {
            padding: 2rem;
          }
        }

        .shipping-card h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          font-family: 'Poppins', sans-serif;
        }

        .shipping-card p,
        .shipping-card li {
          color: #6b7280;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .shipping-card ul {
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .shipping-card strong {
          color: #374151;
        }

        .shipping-cta {
          text-align: center;
          padding: 1.5rem 0;
        }

        .shipping-cta p {
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
