/**
 * Blog Engine for Rotaract Club of ICBT
 * Displays only authentic blog posts categorized by avenues with interactive filtering.
 */

// Avenue Mapping Definition
const AVENUE_CONFIG = {
  'club-service': {
    name: 'Club Service',
    badgeClass: 'badge-club',
    icon: 'fa-handshake',
    color: '#b80860'
  },
  'community-service': {
    name: 'Community Service',
    badgeClass: 'badge-community',
    icon: 'fa-hands-holding-child',
    color: '#00838f'
  },
  'international-service': {
    name: 'International Service',
    badgeClass: 'badge-international',
    icon: 'fa-earth-americas',
    color: '#1565c0'
  },
  'professional-development': {
    name: 'Professional Development',
    badgeClass: 'badge-pd',
    icon: 'fa-briefcase',
    color: '#d4af37'
  },
  'sports-recreation': {
    name: 'Sports & Recreation',
    badgeClass: 'badge-sports',
    icon: 'fa-volleyball',
    color: '#e65100'
  }
};

let currentBlogs = [];
let activeFilter = 'all';

// Initialize Blog Engine
document.addEventListener('DOMContentLoaded', () => {
  initBlogApp();
});

async function initBlogApp() {
  setupFilterButtons();
  await loadBlogs();
  handleUrlCategoryFilter();
}

// Load Blogs from API or fallback dataset
async function loadBlogs() {
  const container = document.getElementById('blogGridContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-crimson" role="status" style="color: var(--greek-crimson, #2f0410);">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted" style="font-family: 'Cinzel', serif;">Retrieving Hellenic Chronicles...</p>
    </div>
  `;

  try {
    let response = await fetch('/api/blogs');
    if (!response.ok) {
      // Fallback to static data/blogs.json for static hosts / file servers
      response = await fetch('data/blogs.json');
    }
    if (response.ok) {
      currentBlogs = await response.json();
    } else {
      throw new Error('API & static blogs.json unavailable');
    }
  } catch (err) {
    console.warn('Falling back to default blogs dataset', err);
    currentBlogs = [
      {
        id: "blog-8",
        title: "The Conversation That Could Save a Life",
        category: "community-service",
        categoryLabel: "Community Service",
        date: "2026-09-29",
        dateFormatted: "September 29, 2026",
        author: "Community Service Avenue",
        image: "assets/blog/suicide_prevention_month.jpg",
        excerpt: "September is recognised as Suicide Prevention Month, reminding us that we may know someone, but we may never truly know what they are going through.",
        content: "September is recognised as Suicide Prevention Month, reminding us that we may know someone, but we may never truly know what they are going through.\n\nSuicide does not belong to any particular gender, age, background, or type of person. We cannot say that females experience more problems than males, or males experience more problems than females. Every individual faces different circumstances, experiences pain differently, and develops their own ways of coping.\n\nSome people talk about their struggles. Others remain silent. Some pray, keep themselves busy, spend time with loved ones, or simply try to carry on with their day. Sometimes, a person who seems completely happy may be dealing with something they have never shared.\n\nWhen difficulties continue to build and a person feels unable to cope, they may reach a point where their pain feels impossible to manage. This is why suicide prevention should not begin only when someone reaches a crisis. It begins with creating an environment where people feel safe enough to speak.\n\nInstead of asking, “Why didn’t they tell anyone?”, perhaps we should ask, “Did they feel that someone would listen without judging them?”\n\nEach religion has its own teachings and understanding regarding suicide. Regardless of our beliefs, however, a person experiencing suicidal thoughts should not have to face that moment alone.\n\nWe should also avoid calling suicide or self-harm “brave” or “cowardly.” Such labels do not capture the complexity of what a person may be experiencing. What matters is recognising the pain behind the situation and helping people find support.\n\nAnd helping does not always require money, professional knowledge, or having the perfect answer.\n\nSometimes, it simply means listening.\n\nListen when someone says they are struggling. Check in when someone suddenly becomes distant. Ask how they are doing, and genuinely give them the space to answer.\n\nYou do not have to be someone’s closest friend to care. It could be a family member, colleague, classmate, neighbour, or even someone you speak to every day without knowing them personally.\n\nWe may never know what someone is carrying behind their smile.\n\nSo perhaps suicide prevention can begin with four simple actions:\n\nNotice. Ask. Listen. Stay.",
        link: "blogPost8.html"
      },
      {
        id: "blog-9",
        title: "ජීවිතයක් බේරාගත හැකි සංවාදය (Sinhala Edition)",
        category: "community-service",
        categoryLabel: "Community Service",
        date: "2026-09-29",
        dateFormatted: "September 29, 2026",
        author: "Community Service Avenue",
        image: "assets/blog/suicide_prevention_month_sinhala.jpg",
        excerpt: "සැප්තැම්බර් මාසය සියදිවි නසාගැනීම් වැළැක්වීමේ මාසය ලෙස නම් කර ඇත්තේ, අප යමෙකු හොඳින් හඳුනනවා වුවද, ඔවුන් සැබවින්ම මුහුණ දෙන්නේ කුමන ආකාරයේ අභියෝගයන්ටද යන්න අප නොදන්නා බව අපට නිරන්තරයෙන් සිහිපත් කරමිනි.",
        content: "සැප්තැම්බර් මාසය සියදිවි නසාගැනීම් වැළැක්වීමේ මාසය ලෙස නම් කර ඇත්තේ, අප යමෙකු හොඳින් හඳුනනවා වුවද, ඔවුන් සැබවින්ම මුහුණ දෙන්නේ කුමන ආකාරයේ අභියෝගයන්ටද යන්න අප නොදන්නා බව අපට නිරන්තරයෙන් සිහිපත් කරමිනි...",
        link: "blogPost9.html"
      },
      {
        id: "blog-10",
        title: "ஒரு உயிரைக் காப்பாற்றக்கூடிய உரையாடல் (Tamil Edition)",
        category: "community-service",
        categoryLabel: "Community Service",
        date: "2026-09-29",
        dateFormatted: "September 29, 2026",
        author: "Community Service Avenue",
        image: "assets/blog/suicide_prevention_month_tamil.jpg",
        excerpt: "செப்டம்பர் மாதம், 'தற்கொலை தடுப்பு மாதமாக' அனுசரிக்கப்படுகிறது. நமக்கு ஒருவரை நன்றாகத் தெரிந்திருக்கலாம்; ஆனால், அவர்கள் தங்களுக்குள் எத்தகைய வேதனைகளைக் கடந்து கொண்டிருக்கிறார்கள் என்பதை நாம் முழுமையாக அறிந்துகொள்ள முடிவதில்லை என்பதை இது நமக்கு நினைவூட்டுகிறது.",
        content: "செப்டம்பர் மாதம், 'தற்கொலை தடுப்பு மாதமாக' அனுசரிக்கப்படுகிறது. நமக்கு ஒருவரை நன்றாகத் தெரிந்திருக்கலாம்; ஆனால், அவர்கள் தங்களுக்குள் எத்தகைய வேதனைகளைக் கடந்து கொண்டிருக்கிறார்கள் என்பதை நாம் முழுமையாக அறிந்துகொள்ள முடிவதில்லை என்பதை இது நமக்கு நினைவூட்டுகிறது...",
        link: "blogPost10.html"
      },
      {
        id: "blog-5",
        title: "Golden Hour 2.0: Where Time Slowed Down",
        category: "club-service",
        categoryLabel: "Club Service",
        date: "2026-09-28",
        dateFormatted: "September 28, 2026",
        author: "Club Service Avenue",
        image: "assets/blog/golden_hour_cover.jpg",
        excerpt: "Golden Hour 2.0 gave us an evening where we could step away from our routines, relax, and spend time together as a club without worrying about what came next.",
        content: "With our usual busy schedules, meetings, studies, work, responsibilities, and everything happening around us...",
        link: "blogPost5.html"
      },
      {
        id: "blog-1",
        title: "International Youth Day Celebration",
        category: "professional-development",
        categoryLabel: "Professional Development",
        date: "2025-08-12",
        dateFormatted: "August 12, 2025",
        author: "Editorial Board",
        image: "assets/gallery/IMG-20250813-WA0003.jpg",
        excerpt: "Mobilizing collegiate youth through interactive workshops, leadership forums, and high-impact social initiatives across our community.",
        content: "International Youth Day brought together passionate young leaders from across the region to deliberate on modern challenges and opportunities.",
        link: "blogPost1.html"
      }
    ];
  }

  renderBlogGrid();
}

// Render the blog cards in the grid
function renderBlogGrid() {
  const container = document.getElementById('blogGridContainer');
  if (!container) return;

  const filtered = activeFilter === 'all' 
    ? currentBlogs 
    : currentBlogs.filter(blog => blog.category === activeFilter);

  if (filtered.length === 0) {
    const avenueName = AVENUE_CONFIG[activeFilter]?.name || 'this avenue';
    container.innerHTML = `
      <div class="col-12 text-center py-5" data-aos="fade-in">
        <div class="p-5 rounded-4 border border-dashed" style="background: rgba(255,255,255,0.85); border-color: #ded5c5 !important; max-width: 600px; margin: 0 auto;">
          <i class="fas fa-scroll fa-3x mb-3" style="color: #c5a059;"></i>
          <h4 class="greek-title" style="color: var(--greek-crimson, #2f0410);">No Blogs Published Yet</h4>
          <p class="text-muted mb-0">There are currently no blog articles published under ${escapeHtml(avenueName)}. Stay tuned for upcoming posts!</p>
        </div>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach((blog, index) => {
    const avenue = AVENUE_CONFIG[blog.category] || { name: blog.categoryLabel || blog.category, icon: 'fa-tag', color: '#2f0410' };
    const dateStr = blog.dateFormatted || blog.date || 'Recent';
    const authorStr = blog.author || 'Editorial Board';
    const imgUrl = blog.image || 'assets/gallery/IMG-20250813-WA0003.jpg';

    html += `
      <div class="col-md-6 col-lg-4 blog-item" data-category="${blog.category}" data-aos="fade-up" data-aos-delay="${(index % 3 + 1) * 100}">
        <article class="blog-card-stele">
          <div class="blog-img-wrap">
            <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(blog.title)}" class="blog-img" onerror="this.src='assets/gallery/IMG-20250813-WA0003.jpg'">
            <span class="blog-category-badge" style="border-left: 3px solid ${avenue.color};">
              <i class="fas ${avenue.icon} me-1"></i> ${escapeHtml(avenue.name)}
            </span>
          </div>
          <div class="blog-content-body">
            <div class="blog-meta-info">
              <span><i class="fas fa-calendar-alt text-warning me-1"></i> ${escapeHtml(dateStr)}</span>
              <span>&bull;</span>
              <span><i class="fas fa-user-pen me-1"></i> ${escapeHtml(authorStr)}</span>
            </div>
            <h4 class="blog-title">${escapeHtml(blog.title)}</h4>
            <p class="blog-excerpt">
              ${escapeHtml(blog.excerpt || '')}
            </p>
            <div class="blog-read-action">
              <a href="${blog.link || '#'}" ${!blog.link ? `onclick="openBlogReader('${blog.id}'); return false;"` : ''} class="btn btn-greek btn-crimson btn-sm w-100">
                <i class="fas fa-feather-alt me-1"></i> Read Chronicle
              </a>
            </div>
          </div>
        </article>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Setup Avenue Filter Buttons
function setupFilterButtons() {
  const buttons = document.querySelectorAll('.blog-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      activeFilter = this.getAttribute('data-filter') || 'all';
      renderBlogGrid();

      // Update URL query parameter
      if (history.pushState) {
        const newUrl = activeFilter === 'all' 
          ? window.location.pathname 
          : `${window.location.pathname}?category=${activeFilter}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
    });
  });
}

// Check URL Params or Hash on page load for initial filtering
function handleUrlCategoryFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  let categoryParam = urlParams.get('category');
  
  if (!categoryParam && window.location.hash) {
    const hashVal = window.location.hash.replace('#', '').toLowerCase();
    if (hashVal.includes('club')) categoryParam = 'club-service';
    else if (hashVal.includes('community')) categoryParam = 'community-service';
    else if (hashVal.includes('international')) categoryParam = 'international-service';
    else if (hashVal.includes('pd') || hashVal.includes('prof')) categoryParam = 'professional-development';
    else if (hashVal.includes('sport')) categoryParam = 'sports-recreation';
    else categoryParam = hashVal;
  }

  if (categoryParam) {
    activateFilterCategory(categoryParam);
  }
}

// Activate a specific filter category programmatically
function activateFilterCategory(categoryKey) {
  const targetBtn = document.querySelector(`.blog-filter-btn[data-filter="${categoryKey}"]`);
  if (targetBtn) {
    const buttons = document.querySelectorAll('.blog-filter-btn');
    buttons.forEach(b => b.classList.remove('active'));
    targetBtn.classList.add('active');
    activeFilter = categoryKey;
    renderBlogGrid();

    // Smooth scroll to the blog grid
    const section = document.getElementById('chroniclesSection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Open Article Modal Reader (Fallback for any custom blogs without separate HTML page)
window.openBlogReader = function (blogId) {
  const blog = currentBlogs.find(b => b.id === blogId);
  if (!blog) return;

  const avenue = AVENUE_CONFIG[blog.category] || { name: blog.categoryLabel || blog.category, icon: 'fa-tag' };
  const readerModal = new bootstrap.Modal(document.getElementById('blogReaderModal'));

  document.getElementById('readerCategoryBadge').innerHTML = `<i class="fas ${avenue.icon} me-1"></i> ${escapeHtml(avenue.name)}`;
  document.getElementById('readerDate').textContent = blog.dateFormatted || blog.date || 'Recent';
  document.getElementById('readerAuthor').textContent = blog.author || 'Editorial Board';
  document.getElementById('readerTitle').textContent = blog.title;
  document.getElementById('readerImage').src = blog.image || 'assets/gallery/IMG-20250813-WA0003.jpg';

  const contentWrap = document.getElementById('readerContent');
  if (blog.content) {
    const paragraphs = blog.content.split('\n\n').map(p => `<p class="article-paragraph">${escapeHtml(p)}</p>`).join('');
    contentWrap.innerHTML = paragraphs;
  } else {
    contentWrap.innerHTML = `<p class="article-paragraph lead">${escapeHtml(blog.excerpt || '')}</p>`;
  }

  const dedicatedLinkBtn = document.getElementById('readerDedicatedLink');
  if (blog.link) {
    dedicatedLinkBtn.href = blog.link;
    dedicatedLinkBtn.style.display = 'inline-flex';
  } else {
    dedicatedLinkBtn.style.display = 'none';
  }

  readerModal.show();
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
