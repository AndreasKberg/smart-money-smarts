// Basic interactivity: menu toggle, smooth scroll, article panel, contact + newsletter handlers
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  mobileToggle && mobileToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    mainNav.style.display = expanded ? 'none' : 'block';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Article modal: we have 5 starter articles (a1..a5)
  const articles = {
    a1: {
      title: "How to Set Up Your First Budget as a Teen",
      subtitle: "Track your income and expenses in 5 simple steps.",
      body: `<p>A budget is a plan for your money — it shows what comes in and what goes out. Building your first budget is easier than it sounds. Here's how:</p>
      <ol>
        <li><strong>List all income:</strong> part-time pay, allowance, bursaries — convert lumps into monthly amounts.</li>
        <li><strong>Track a month of spending:</strong> phone notes, receipts or your banking app. Separate Needs vs Wants.</li>
        <li><strong>Try 50/30/20:</strong> 50% needs, 30% wants, 20% savings — adjust for tuition or rent.</li>
        <li><strong>Write it down:</strong> use our Google Sheets template or a notebook; keep expenses + savings ≤ income.</li>
        <li><strong>Review monthly:</strong> tweak categories and automate savings where possible.</li>
      </ol>
      <p>Small changes add up. Start with our free budget template in Resources — you’ve got this!</p>
      <p class="muted">Figure: A student at a desk writing in a notebook with a calculator and coffee cup.</p>`
    },

    a2: {
      title: "Best Bank Accounts for Canadian Students",
      subtitle: "Compare no-fee chequing accounts, perks and signup bonuses.",
      body: `<p>Many banks offer no-monthly-fee chequing for students. Look for unlimited transactions, free e-transfers, and a simple signup process. Examples include:</p>
      <ul>
        <li><strong>RBC Advantage for Students:</strong> no fee under 25, unlimited transactions, occasional signup bonus.</li>
        <li><strong>TD Student Chequing:</strong> no monthly fee, good online/mobile app experience.</li>
        <li><strong>CIBC Smart for Students:</strong> no fee and sometimes bundled perks.</li>
        <li><strong>Desjardins Student Offer:</strong> strong in Québec and some provinces — competitive bonuses.</li>
      </ul>
      <p>Tip: use referral links (carefully) and check promos. Choose a bank that fits how you spend and where you live.</p>`
    },

    a3: {
      title: "Smart Ways to Save on School Supplies",
      subtitle: "Back-to-school without blowout spending.",
      body: `<p>Back-to-school costs add up. Try these practical moves:</p>
      <ul>
        <li><strong>Reuse first:</strong> backpacks, binders, calculators — pass down if possible.</li>
        <li><strong>Dollar-store finds:</strong> many essentials are available at low cost.</li>
        <li><strong>Shop sales & bulk:</strong> buy spares on sale or pool purchases with classmates.</li>
        <li><strong>Office giveaways:</strong> sometimes workplaces have surplus supplies.</li>
      </ul>
      <p>Share your hacks with us — email or tag us on social and we may feature your tip.</p>`
    },

    a4: {
      title: "TFSA vs RRSP: Which One Should You Use?",
      subtitle: "A simple comparison for students starting to save.",
      body: `<p><strong>TFSA</strong>: deposit after-tax money, earnings and withdrawals are tax-free. Good for flexible savings and short/medium goals. TFSA contribution room grows every year and you can re-contribute amounts you withdrew in future years.</p>
      <p><strong>RRSP</strong>: contributions reduce taxable income today; withdrawals are taxed as income later. Best for retirement saving or when you want a tax break now. Students with low income may prefer TFSA first.</p>
      <table>
        <tr><td><strong>Withdrawals</strong></td><td>TFSA: tax-free</td><td>RRSP: taxed when withdrawn</td></tr>
        <tr><td><strong>Best for</strong></td><td>Flexible goals, emergency fund</td><td>Long-term retirement savings</td></tr>
      </table>
      <p>Not sure? Use a free financial counselling service (see Resources) or start small in a TFSA — even $5/week helps.</p>`
    },

    a5: {
      title: "How to Grow $20 a Week (Even When It Feels Small)",
      subtitle: "Consistency plus the right account builds real savings.",
      body: `<p>$20/week = $1,040/year — and with interest or investing it grows more. Options:</p>
      <ul>
        <li><strong>HISA:</strong> a high-interest savings account earns a safe return (e.g. promo rates ~4% — check current rates).</li>
        <li><strong>TFSA:</strong> earn interest or invest inside a TFSA to keep growth tax-free.</li>
        <li><strong>Investing:</strong> ETFs or robo-advisors inside a TFSA give higher long-term returns but with risk.</li>
      </ul>
      <p>Automate $20/week and treat it like a bill. Use our savings calculator in Resources to model different scenarios.</p>`
    }
  };

  const panel = document.getElementById('article-panel');
  const articleContent = document.getElementById('article-content');

  document.querySelectorAll('.read-more, .article-card').forEach(el => {
    el.addEventListener('click', function (e) {
      const key = this.dataset.article;
      if (!key || !articles[key]) return;
      const art = articles[key];
      articleContent.innerHTML = `<h2>${art.title}</h2><p class="muted">${art.subtitle}</p>${art.body}<p style="margin-top:18px"><a href="#resources" class="btn-outline">See related resources</a></p>`;
      panel.classList.add('active');
      panel.removeAttribute('aria-hidden');
      articleContent.focus();
    });
  });

  document.querySelector('.close-panel').addEventListener('click', closePanel);
  panel.addEventListener('click', function (e) {
    if (e.target === panel) closePanel();
  });
  function closePanel(){
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden','true');
    articleContent.innerHTML = '';
  }

  // Contact form handler - uses mailto as simple fallback so Google Sites embed works without server
  window.submitContact = function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!email || !message) {
      alert('Please enter your email and message.');
      return false;
    }
    const subject = encodeURIComponent('Smart Money Smarts contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    // opens default mail client
    window.location.href = `mailto:smartmoney@yourdomain.com?subject=${subject}&body=${body}`;
    return false;
  };

  // Newsletter signup - simple mailto fallback for static hosting
  window.newsletterSignup = function (e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value.trim();
    if (!email) { alert('Please add an email to subscribe.'); return false; }
    const subject = encodeURIComponent('Subscribe: Newsletter');
    const body = encodeURIComponent(`Please subscribe me to the Smart Money Smarts newsletter.\n\nEmail: ${email}`);
    window.location.href = `mailto:smartmoney@yourdomain.com?subject=${subject}&body=${body}`;
    return false;
  };
});
