// ===== AI CHAT SYSTEM with Font Awesome Avatars & Dot Loading =====
const chat = document.getElementById("chat");
const messages = document.getElementById("messages");
const input = document.getElementById("chatInput");

let typingTimeout = null;
let isProcessing = false;

// Pre-compile all regex patterns for better performance
const intents = [
  {
    match: /who made (you|this|it)|who built (you|this|it)|who developed (u|you|this|it)|who programmed (you|this|it)|who coded (you|this|it)|who designed (you|this|it)|who created (you|this|it)|creator|author|founder|origin/,
    reply: "⚡ This portfolio was designed by GISUBIZO Mark, the founder of Monixi Technology."
  },
  {
    match: /graphic designer|graphic design|logo design|branding|illustrator|photoshop|canva/,
    reply: "🎨 I provide professional graphic design including logos, branding, and marketing materials. Quick turnaround & affordable rates! 📌 Quick fact: I've designed 50+ logos for businesses across Rwanda. 📌 I offer unlimited revisions until you're 100% satisfied!"
  },
  {
    match: /video editor|video editing|video production|film|editing|premiere pro|final cut/,
    reply: "🎬 Professional video editing for social media, promos, and tutorials. Fast delivery with modern styles! 📌 Quick fact: I edit videos in 48 hours or less. 📌 I add custom animations and effects to make your content stand out!"
  },
  {
    match: /ui ux|ui|ux|user interface|user experience|wireframe|prototype|figma|adobe xd/,
    reply: "✨ G.Mark designs user-friendly interfaces for websites and apps. Focus on conversions and engagement! 📌 Quick fact: My designs have improved user engagement by 40% for clients. 📌 I create interactive prototypes so you can test before development!"
  },
  {
    match: /contact|contacts|phone|tel|social media he use|social media platform he use|social media platform i can|social media platform which|telephone number|social media i can/,
    reply: "📞 Phone & WhatsApp: +250 793 170 139\n📸 Instagram: @mark_dir"
  },
  {
    match: /digital market|digital marketer|digital marketing|marketing|seo|social media marketing|ads|advertising|google ads|facebook ads/,
    reply: "📈 G.Mark handles digital marketing: SEO, social media ads, and content strategy. Drive real results! 📌 Quick fact: I've grown social media followers by 300% for local businesses. 📌 I provide monthly performance reports with clear ROI metrics!"
  },
  {
    match: /content creator|content creation|blog|writing|copywriting|content strategy|blogger|writer/,
    reply: "📝 Mark_dir creates engaging blog posts, social media content, and website copy. SEO-optimized and audience-focused! 📌 Quick fact: My content has ranked on Google's first page in 3 months. 📌 I write in both English and Kinyarwanda for wider reach!"
  },
  {
    match: /monixi|monixi technology|company|business|enterprise/,
    reply: "🏢 Monixi Technology is Mark's software development company based in Kigali, Rwanda. It focuses on creating custom digital solutions for businesses across Africa and beyond."
  },
  {
    match: /youtube|youtube channel|channel|videos|tutorials|subscribe|monixi youtube|monixi channel/,
    reply: "🎥 Check out my YouTube channel: <a href='https://www.youtube.com/@monixi_technology' target='_blank' rel='noopener noreferrer' class='chat-link'>Monixi Technology</a> - I share coding tutorials, project walkthroughs, and tech tips! Want me to notify you when I upload?"
  },
  {
    match: /what (videos|content) do you make|tutorial topics|what's on your channel|channel content|what you teach/,
    reply: "📚 On my <a href='https://youtube.com/@monixi_technology' target='_blank' rel='noopener noreferrer' class='chat-link'>YouTube channel</a>, I cover: Web Development, Mobile Apps, AI Tools, Business Automation, and Tech in Rwanda. Subscribe to stay updated with new content! 🔔"
  },
  {
    match: /time you work|work time|time|working hours/,
    reply: "Mark is Available 24/7 ready for business. you can call him on +250 793 170 139 and you can view his instagram: Mark_dir"
  },
  {
    match: /when have you started developing|when have you|joined this career|career start/,
    reply: "Mark started this career as a self-taught developer and has been building software professionally for over 3 years."
  },
  {
    match: /service|services|work|what do you do|offer/,
    reply: "🛠 Services include websites, mobile apps, UI/UX design, frontend, AI chatbots, and payment systems. You can check his service section or call him"
  },
  {
    match: /price|how much|pricing|cost|payment|pay|rate/,
    reply: "💰 Pricing ranges from $120–$2400 depending on project size. Modules usually cost $15–$40 each."
  },
  {
    match: /timeline|duration|deadline|how long|when|delivery|schedule/,
    reply: "⏰ Project timelines vary: Simple websites (1-2 weeks), Complex apps (3-8 weeks), Full SaaS platforms (2-6 months). I provide detailed timelines after understanding your specific requirements."
  },
  {
    match: /process|how to start|get started|begin|steps|procedure|workflow/,
    reply: "🚀 My process: 1) Discovery call 2) Requirements analysis 3) Proposal & quote 4) Development 5) Testing & revisions 6) Launch & support. Ready to start? Let's schedule a call!"
  },
  {
    match: /maintenance|support|updates|hosting|server|after launch|bugs|fix/,
    reply: "🔧 I offer post-launch support packages: Basic ($30/month for bug fixes), Standard ($80/month with updates), Premium ($150/month with 24/7 monitoring). Includes hosting setup if needed."
  },
  {
    match: /react|vue|angular|flutter|laravel|django|wordpress|shopify|cms|framework/,
    reply: "🔨 I work with: React/Vue for frontend, Node.js/Python for backend, Flutter for mobile, WordPress for CMS. I choose the best stack for YOUR project's needs and budget."
  },
  {
    match: /experience|years|how many|clients|projects|past work|examples|show me/,
    reply: "📊 3+ years developing solutions for clients in Rwanda & internationally. I've built 20+ projects including e-commerce, SaaS platforms, and custom business tools. Check my portfolio section for examples!"
  },
  {
    match: /urgent|quick|fast|asap|soon|emergency|available|book|schedule|meeting/,
    reply: "⚡ For urgent projects, I can often start within 48 hours. Available for quick calls via WhatsApp (+250 793 170 139) or schedule a meeting through my contact form."
  },
  {
    match: /live|location|where can i find him|located|country|reach/,
    reply: "📍 Based in Kigali, Rwanda — available for remote work worldwide."
  },
  {
    match: /language|stack|technologies|tech|tech stack/,
    reply: "💻 Tech stack: HTML, CSS, JavaScript, PHP, Python, Node.js, SQL, APIs, React, and more."
  },
  {
    match: /software you|projects you|software he/,
    reply: "💻 Projects are more than 12 - just visit project section using navigation on top"
  },
  {
    match: /developer|developers/,
    reply: "👨‍💻 Developers build websites, apps, and systems using code to solve real problems."
  },
  {
    match: /solve|analyse|analysis/,
    reply: "👨‍💻 Mark starts by dividing larger programs into small parts that make the project faster and more efficient. Just reach him for complex problem-solving!"
  },
  {
    match: /language|languages/,
    reply: "💻 Programming languages are tools developers use to talk to computers, like JavaScript or Python."
  },
  {
    match: /programming|coding|how programming work|how does programming work/,
    reply: "⚙️ Programming works by giving computers clear instructions to follow step by step."
  },
  {
    match: /bye|goodbye|see you|murabeho|cya/,
    reply: "👋 Goodbye! Feel free to come back anytime."
  },
  {
    match: /this site|this website|portfolio|your site|what is this/,
    reply: "🌐 This is Mark Dir's portfolio website. It showcases his projects, skills, services, and contact info."
  },
  {
    match: /site features|what can i do here|what does site do|his portfolio/,
    reply: "🛠 On this site, you can explore Mark's work, learn about his skills, see pricing info, and get in touch for projects."
  },
  {
    match: /purpose of site|why this site|portfolio about|site about|portfolio is about what|purpose/,
    reply: "🎯 The purpose of this site is to introduce Mark Dir, his services, and make it easy for clients to reach him."
  },
  {
    match: /your purpose|your goal/,
    reply: "🎯 I am here to introduce Mark Dir, his services, and make it easy for clients to reach him."
  },
  {
    match: /logo|brand|company|identification/,
    reply: "🎯 About that you can check the portfolio endings down at the bottom 'designed by Monixi Technology'"
  },
  {
    match: /how to use this site|navigation|how it works/,
    reply: "📖 You can browse different sections: Services, Pricing, Contact, and Tech Stack. Click items or use the chat for more info."
  },
  {
    match: /education|study|achievement|school|university|degree|background|academic|studied|learn|training/,
    reply: "🎓 Developer with A2 Degree and 3+ years of hands-on experience. Continuous learner through online courses (Coursera, Udemy), documentation, and building real projects. Focus on practical, business-focused solutions."
  },
  {
    match: /specialize|specialization|niche|expert|focus|best at|strongest|what you love/,
    reply: "🎯 I specialize in: Business automation tools, E-commerce solutions, API integrations, and Modern web applications. Particularly enjoy creating systems that save time and grow businesses."
  },
  {
    match: /why development|passion|motivation|love coding|inspiration|why this field/,
    reply: "❤️ I love turning ideas into reality and solving problems through code. Technology empowers businesses and individuals in Rwanda and Africa - I'm passionate about contributing to that growth through meaningful software."
  },
  {
    match: /collaborate|team|solo|communication|updates|feedback|meetings|report/,
    reply: "🤝 I work collaboratively with regular updates (weekly calls, daily progress if needed). Use tools like Trello/Asana for transparency. Value client feedback at every stage to ensure we're building exactly what you need."
  },
  {
    match: /mark contact|how to reach mark|mark details|number|contacts/,
    reply: "📞 Contact Mark: +250 793 170 139 (WhatsApp) | Instagram: @mark_dir"
  },
  {
    match: /fullnames of mark|full names of mark|fullname|full name/,
    reply: "His full names are Gisubizo Mark 😎!"
  },
  {
    match: /birth date|birth day|born|how old\b/,
    reply: "😎 If you mean Mark's age! He is 18+"
  },
  {
    match: /mark|mark dir|mark programmer|about mark|who is mark/,
    reply: "🥳 Mark Dir is a full-stack developer from Kigali, Gasabo - Rwanda. He builds websites, apps, AI tools, and modern software systems."
  },
  {
    match: /mark skills|mark stack|what mark knows|his skills/,
    reply: "💻 Mark uses HTML, CSS, React, JavaScript, PHP, Python, Node.js, SQL, and APIs to create modern solutions."
  },
  {
    match: /mark experience|mark work/,
    reply: "🛠 Mark has experience in web development, mobile apps, SaaS platforms, dashboards, AI chatbots, and payment systems."
  },
  {
    match: /your name|who are you|what this ai do|more about this ai/,
    reply: "🤖 I'm Mark Dir's AI Assistant — built to help visitors quickly."
  },
  {
    match: /hi|hello|hey|hy|bonjour|salut|muraho|hola|habari/,
    reply: "👋 Hello! Welcome. How can I help you today?"
  },
  {
    match: /thanks|thank you|merci|urakoze|asante|cool|ok/,
    reply: "🙏 You're welcome! I'm always here if you need help."
  },
  {
    match: /\bare you\b|\bhow are you\b/,
    reply: "😎 I'm doing great and always ready to assist you!"
  },
  {
    match: /.*/,
    reply: "🤔 Sorry, I didn't understand that. Ask me about Mark, his portfolio, or contacts."
  }
];

// Compile regex patterns once for better performance
const compiledIntents = intents.map(intent => ({
  match: intent.match,
  reply: intent.reply
}));

// Accessibility function
function announceToScreenReader(message) {
  let ariaLive = document.getElementById('aria-live');
  if (!ariaLive) {
    ariaLive = document.createElement('div');
    ariaLive.id = 'aria-live';
    ariaLive.className = 'sr-only';
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    document.body.appendChild(ariaLive);
  }
  ariaLive.textContent = message;
}

// Safe HTML parser for chat messages
function parseSafeHTML(text) {
  const temp = document.createElement('div');
  const cleanText = text
    .replace(/<a\s+([^>]*?)>/gi, '<a $1>')
    .replace(/<script/gi, '&lt;script')
    .replace(/<\/script>/gi, '&lt;/script&gt;')
    .replace(/on\w+\s*=/gi, 'data-removed=');
  temp.innerHTML = cleanText;
  return temp.childNodes;
}

// Add message to chat with Font Awesome avatar
function addMsg(text, type) {
  const wrapper = document.createElement("div");
  wrapper.className = `msg-wrapper ${type}`;
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'flex-start';
  wrapper.style.gap = '10px';
  wrapper.style.marginBottom = '12px';
  wrapper.style.flexDirection = type === 'user' ? 'row-reverse' : 'row';
  
  // Avatar with Font Awesome icon
  const avatar = document.createElement("div");
  avatar.className = `msg-avatar ${type}`;
  avatar.style.width = '34px';
  avatar.style.height = '34px';
  avatar.style.borderRadius = '50%';
  avatar.style.display = 'flex';
  avatar.style.alignItems = 'center';
  avatar.style.justifyContent = 'center';
  avatar.style.flexShrink = '0';
  avatar.style.fontSize = '16px';
  
  if (type === 'user') {
    avatar.style.background = 'linear-gradient(135deg, #ff3aff, #f53cf5)';
    avatar.style.color = '#000';
    avatar.innerHTML = '<i class="fas fa-user"></i>';
  } else {
    avatar.style.background = 'rgba(255,255,255,0.1)';
    avatar.style.border = '1px solid rgba(255,255,255,0.2)';
    avatar.style.color = '#fff';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
  }
  
  // Message bubble
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.style.maxWidth = '75%';
  div.style.padding = '10px 14px';
  div.style.borderRadius = '16px';
  div.style.fontSize = '0.9rem';
  div.style.lineHeight = '1.4';
  div.style.wordWrap = 'break-word';
  
  if (type === 'user') {
    div.style.background = 'linear-gradient(135deg, #ff3aff, #f53cf5)';
    div.style.color = '#000';
  } else {
    div.style.background = 'rgba(255,255,255,0.08)';
    div.style.color = '#fff';
  }
  
  // Add message content
  if (text.includes('<') && text.includes('>')) {
    const safeNodes = parseSafeHTML(text);
    safeNodes.forEach(node => {
      div.appendChild(node.cloneNode(true));
    });
  } else {
    div.textContent = text;
  }
  
  // Add click handlers for chat links
  const links = div.querySelectorAll('.chat-link');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '_blank', 'noopener,noreferrer');
    });
  });
  
  wrapper.appendChild(avatar);
  wrapper.appendChild(div);
  messages.appendChild(wrapper);
  
  messages.scrollTo({
    top: messages.scrollHeight,
    behavior: 'smooth'
  });
}

// Show loading indicator with only dots (no text)
function showLoading() {
  // Remove existing loading if any
  const existing = document.getElementById('ai-loading');
  if (existing) existing.remove();
  
  const wrapper = document.createElement("div");
  wrapper.id = 'ai-loading';
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.gap = '10px';
  wrapper.style.marginBottom = '12px';
  
  // Avatar with Font Awesome robot icon
  const avatar = document.createElement("div");
  avatar.style.width = '34px';
  avatar.style.height = '34px';
  avatar.style.borderRadius = '50%';
  avatar.style.display = 'flex';
  avatar.style.alignItems = 'center';
  avatar.style.justifyContent = 'center';
  avatar.style.flexShrink = '0';
  avatar.style.background = 'rgba(255,255,255,0.1)';
  avatar.style.border = '1px solid rgba(255,255,255,0.2)';
  avatar.style.color = '#fff';
  avatar.style.fontSize = '16px';
  avatar.innerHTML = '<i class="fas fa-robot"></i>';
  
  // Loading bubble with only dots
  const bubble = document.createElement("div");
  bubble.className = "msg ai";
  bubble.style.background = 'rgba(255,255,255,0.08)';
  bubble.style.color = '#fff';
  bubble.style.padding = '12px 20px';
  bubble.style.borderRadius = '16px';
  bubble.style.display = 'flex';
  bubble.style.alignItems = 'center';
  bubble.style.justifyContent = 'center';
  bubble.style.gap = '6px';
  bubble.style.minWidth = '50px';
  
  // Only dots, no text
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.borderRadius = '50%';
    dot.style.background = '#ff3aff';
    dot.style.display = 'inline-block';
    dot.style.animation = `dotBlink 1.4s infinite ${i * 0.2}s`;
    bubble.appendChild(dot);
  }
  
  // Add keyframe animation for dots if not exists
  if (!document.getElementById('dot-keyframes')) {
    const style = document.createElement('style');
    style.id = 'dot-keyframes';
    style.textContent = `
      @keyframes dotBlink {
        0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
        40% { opacity: 1; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);
  }
  
  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  
  messages.scrollTo({
    top: messages.scrollHeight,
    behavior: 'smooth'
  });
}

// Remove loading indicator
function hideLoading() {
  const loading = document.getElementById('ai-loading');
  if (loading) loading.remove();
}

// Toggle chat visibility with accessibility
function toggleChat() {
  chat.classList.toggle("open");
  const isActive = chat.classList.contains("open");
  const status = isActive ? "Chat assistant opened" : "Chat assistant closed";
  announceToScreenReader(status);
  
  if (isActive) {
    setTimeout(() => input.focus(), 100);
  }
}

// Send message function with loading state
function sendChat() {
  const text = input.value.trim();
  if (!text || isProcessing) return;

  isProcessing = true;
  addMsg(text, "user");
  input.value = "";
  showLoading();

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  typingTimeout = setTimeout(() => {
    reply(text);
    isProcessing = false;
  }, 800 + Math.random() * 600);
}

// Generate AI response
function reply(userText) {
  hideLoading();

  const msg = userText.toLowerCase().trim();
  let response = "🤖 I can help with Mark Dir's portfolio, services, pricing, tech stack, and contact info.";

  for (const intent of compiledIntents) {
    if (intent.match.test(msg)) {
      response = intent.reply;
      break;
    }
  }

  addMsg(response, "ai");
  
  const cleanResponse = response.replace(/<[^>]*>/g, '');
  announceToScreenReader(`Assistant: ${cleanResponse.substring(0, 100)}...`);
}

// Event listeners
input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
});

// Click outside to close
document.addEventListener('click', (e) => {
  const isChat = chat.contains(e.target);
  const isFab = e.target.closest('.ai-fab');
  const chatIsActive = chat.classList.contains('open');
  
  if (chatIsActive && !isChat && !isFab) {
    chat.classList.remove('open');
    announceToScreenReader('Chat assistant closed');
  }
});

// Initial setup for accessibility
chat.setAttribute('role', 'dialog');
chat.setAttribute('aria-label', 'AI Assistant Chat');
chat.setAttribute('aria-modal', 'true');
input.setAttribute('aria-label', 'Type your message to the AI assistant');
input.setAttribute('maxlength', '500');

// Handle Escape key to close chat
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && chat.classList.contains('open')) {
    chat.classList.remove('open');
    announceToScreenReader('Chat assistant closed');
  }
});

console.log("👋 Hey there! This is Mark's portfolio. Need a developer? Chat with my AI assistant or contact me directly!");
console.log("💡 Try asking about: services, pricing, YouTube channel, or how to get started!");