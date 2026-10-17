/* ==========================================================================
   DreamBiz Solutions - Smart AI Business Advisor Assistant (Chatbot)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

function initChatbot() {
  const toggleBtn = document.querySelector('.chatbot-toggle-btn');
  const chatWindow = document.querySelector('.chatbot-window');
  const closeBtn = document.querySelector('.chatbot-close-btn');
  const messagesContainer = document.querySelector('.chatbot-messages');
  const inputEl = document.querySelector('#chatbot-input');
  const sendBtn = document.querySelector('#chatbot-send');

  if (!toggleBtn || !chatWindow || !messagesContainer) return;

  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active') && inputEl) {
      inputEl.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  function appendBotMessage(text, suggestions = []) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.innerHTML = text;

    if (suggestions.length > 0) {
      const sugContainer = document.createElement('div');
      sugContainer.className = 'chat-suggestions';
      suggestions.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'chat-chip-btn';
        btn.textContent = s.text;
        btn.addEventListener('click', () => {
          appendUserMessage(s.text);
          setTimeout(() => {
            handleBotQuery(s.action);
          }, 400);
        });
        sugContainer.appendChild(btn);
      });
      bubble.appendChild(sugContainer);
    }

    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendUserMessage(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleBotQuery(query) {
    const q = query.toLowerCase();

    if (q.includes('setup') || q.includes('company') || q.includes('license') || q.includes('mainland') || q.includes('freezone')) {
      appendBotMessage(
        `<strong>🏢 UAE Company Formation:</strong><br>We assist with 100% foreign ownership Mainland & Freezone licenses, investor visas, corporate bank accounts, and office leases.<br><br>Would you like to explore licenses or schedule a specialist call?`,
        [
          { text: "Freezone vs Mainland Details", action: "explain_zones" },
          { text: "Book 1-on-1 Setup Call", action: "book_consultation" },
          { text: "Instant Cost Estimate", action: "open_calc" }
        ]
      );
    } else if (q.includes('explain_zones')) {
      appendBotMessage(
        `<strong>Mainland vs Freezone:</strong><br>• <strong>Freezone:</strong> 0% corporate tax benefits, 100% foreign ownership, quick setup. Ideal for tech, consulting & international trade.<br>• <strong>Mainland:</strong> Trade anywhere in the UAE local market & government contracts with 100% foreign ownership on most commercial activities.<br><br>Let us know your business activity for exact licensing costs!`,
        [
          { text: "Book Consultation", action: "book_consultation" },
          { text: "WhatsApp Specialist", action: "whatsapp" }
        ]
      );
    } else if (q.includes('ecommerce') || q.includes('amazon') || q.includes('flipkart') || q.includes('noon') || q.includes('store')) {
      appendBotMessage(
        `<strong>🛒 E-Commerce & Marketplace:</strong><br>We onboard your products onto Amazon, Flipkart, Noon, and TikTok Shop, managing cataloging, brand registry, warehouse logistics, and account optimization without ad spend reliance!`,
        [
          { text: "Marketplace Onboarding Plan", action: "book_consultation" },
          { text: "Speak with E-commerce Lead", action: "whatsapp" }
        ]
      );
    } else if (q.includes('software') || q.includes('tech') || q.includes('website') || q.includes('app')) {
      appendBotMessage(
        `<strong>💻 Software & Technology Solutions:</strong><br>From corporate web portals to custom ERPs, SaaS applications, and mobile apps, our engineering team builds modern tech tailored to your workflows.`,
        [
          { text: "Request Tech Scope & Quote", action: "book_consultation" },
          { text: "Talk to Software Team", action: "whatsapp" }
        ]
      );
    } else if (q.includes('msme') || q.includes('consulting') || q.includes('growth') || q.includes('workshop')) {
      appendBotMessage(
        `<strong>📈 DreamBiz MSME Growth Consulting:</strong><br>We conduct strategic workshops, operational audits, and scale roadmaps for small-to-mid businesses looking to double revenue and streamline operations.<br><br>Would you like to book a strategy session?`,
        [
          { text: "Schedule Business Review", action: "book_consultation" },
          { text: "Consulting Packages", action: "pricing" }
        ]
      );
    } else if (q.includes('hr') || q.includes('recruit') || q.includes('payroll') || q.includes('staff')) {
      appendBotMessage(
        `<strong>👥 HR & Recruitment Consultancy:</strong><br>End-to-end talent sourcing, executive headhunting, and payroll staffing compliance so you can build your dream team with confidence.`,
        [
          { text: "Hire Talent", action: "book_consultation" },
          { text: "Chat on WhatsApp", action: "whatsapp" }
        ]
      );
    } else if (q.includes('import') || q.includes('export') || q.includes('trade') || q.includes('customs')) {
      appendBotMessage(
        `<strong>🌍 Import & Export Trade Advisory:</strong><br>Complete customs code registration, trade compliance, tariff advisory, and freight forwarder coordination for international shipping.`,
        [
          { text: "International Trade Consultation", action: "book_consultation" }
        ]
      );
    } else if (q.includes('book_consultation') || q.includes('consult') || q.includes('video') || q.includes('pricing')) {
      appendBotMessage(
        `<strong>📞 Paid 1-on-1 Consultation:</strong><br>You can book a dedicated video conference or in-depth business audit with our Senior Advisors directly on our Consultation page.<br><br><a href="consultation.html" class="btn btn-primary btn-sm" style="margin-top:6px; color:#0B132B;">Go to Consultation Portal →</a>`,
        [
          { text: "Direct WhatsApp Fast Track", action: "whatsapp" }
        ]
      );
    } else if (q.includes('open_calc')) {
      window.location.href = 'index.html#calculator';
    } else if (q.includes('whatsapp')) {
      window.open('https://wa.me/971521947668?text=Hello%20DreamBiz%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20business%20services.', '_blank');
    } else {
      appendBotMessage(
        `Thank you for reaching out! Our team provides end-to-end solutions for Company Setup, Tech Development, MSME Consulting, E-Commerce, and Global Trade.<br><br>How can we assist your business today?`,
        [
          { text: "🏢 Company Setup (UAE/Global)", action: "company" },
          { text: "💻 Software & Web Development", action: "software" },
          { text: "🛒 E-Commerce & Marketplaces", action: "ecommerce" },
          { text: "📞 Book Paid Consultation", action: "book_consultation" }
        ]
      );
    }
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    appendUserMessage(text);
    inputEl.value = '';

    setTimeout(() => {
      handleBotQuery(text);
    }, 500);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (inputEl) {
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
}
