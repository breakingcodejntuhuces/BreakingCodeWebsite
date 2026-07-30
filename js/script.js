const eventsData = [
  {
    title: 'Club Inauguration',
    date: 'Mar 02, 2026',
    location: 'CSE Seminar Hall, JNTUH UCES',
    description: 'The official launch of Breaking Code Club featuring our vision, future roadmap, membership introduction, and networking with fellow developers.',
  },
  {
    title: 'Week 1 Daily Coding Contest',
    date: '-',
    location: 'online (HackerRank)',
    description: 'Kick-start your competitive programming journey with seven days of beginner-friendly coding challenges designed to strengthen your problem-solving fundamentals',
  },
  {
    title: 'Week 2 Daily Coding Contest',
    date: '-',
    location: 'online (HackerRank)',
    description: 'Take on more challenging problems as difficulty increases. Improve your logic, optimize your solutions, and compete with fellow coders every day.',
  },
  {
    title: 'Breaking Code Grand Challenge',
    date: '-',
    location: 'online (HackerRank)',
    description: 'Finale of our 2 week long daily DSA & Core-logic coding marathons',
  },
  
];

const teamData = [
  { name: 'Y. ABHISHEK', role: 'Club Lead', linkedin: 'hhttps://www.linkedin.com/in/iyg999a/', email: 'abhishekyadugani@gmail.com', photo: '' },
  { name: 'D. SHIVAKUMAR REDDY', role: 'Club Lead', linkedin: 'https://www.linkedin.com/in/shivakumar-reddy-dommata/', email: 'shivareddydmt7989@gmail.com', photo: 'assets/people/file.jpg' },
  { name: 'M. VISHAL', role: 'Marketing Head', linkedin: '#', email: 'vishal@example.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'B. NIKHIL', role: 'Marketing Head', linkedin: 'https://www.linkedin.com/in/nikhil-boddepalli-a342b1391?utm_source=share_via&utm_content=profile&utm_medium=member_android', email: 'bnikhil2103@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'M. SAI KUMAR', role: 'Tech Head', linkedin: 'https://www.linkedin.com/in/sai-kumar-myakala-b81698310?utm_source=share_via&utm_content=profile&utm_medium=member_android', email: 'myakalasai183@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'G. AKSHITHA', role: 'Tech Head', linkedin: 'https://www.linkedin.com/in/gaddam-akshitha-359490411', email: 'akshithagaddam19@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'CH. CHANDRASHEKHAR', role: 'Tech Head', linkedin: '#', email: 'chandrashekhar@example.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'S. SWARUPA', role: 'Event Head', linkedin: 'https://www.linkedin.com/in/swarupa-sangmay-534162379', email: 'swarupasangmay@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'SAI KIRAN', role: 'Event Head', linkedin: '#', email: 'saikiran@example.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'C. MOKSHITA REDDY', role: 'Event Head', linkedin: '#', email: 'mokshita@example.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'SK. SAMEENA YASMIN', role: 'Coordinator', linkedin: 'https://www.linkedin.com/in/sameena-yasmin-421734325', email: 'yasminsameena600@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'CH. VENKATA SIVA SAI', role: 'Coordinator', linkedin: 'https://www.linkedin.com/in/venkatasivasai-chilakala-854698268?utm_source=share_via&utm_content=profile&utm_medium=member_android', email: 'chilakalavenkatasivasai@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'B. GOVARDHAN', role: 'Coordinator', linkedin: 'https://www.linkedin.com/in/govardhan-bathula-829157358/', email: 'govardhanbathula555@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'U. AKSHAYA', role: 'Coordinator', linkedin: 'https://www.linkedin.com/in/akshaya-udutha-008481376', email: 'akshayaudutha25@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'M. SAI CHARAN', role: 'Coordinator', linkedin: 'https://www.linkedin.com/in/sai-charan-mallam-92b927358?utm_source=share_via&utm_content=profile&utm_medium=member_android', email: 'mallamsaicharan002@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'A. MAHAVAISHNAVI', role: 'Coordinator', linkedin: '#', email: 'mahavaishnavi@example.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'SK. MOHD. ARIF', role: 'Coordinator', linkedin: 'https://www.linkedin.com/in/mohammad-arif-58028a378', email: 'arifsheik826@gmail.com', photo: 'assets/images/team_placeholder.png' },
  { name: 'B. SRAVAN NISHANTH', role: 'Coordinator', linkedin: '#', email: 'sravan@example.com', photo: 'assets/images/team_placeholder.png' },
];

const faqData = [
  {
    q: 'How do I join Breaking Code?',
    a: 'Click "Become a Member" and fill out the registration form. Membership opens at the start of each academic semester. Follow our social pages for announcements.',
  },
  {
    q: 'Do I need prior programming experience?',
    a: 'Not at all. Breaking Code welcomes all skill levels. We have beginner-friendly workshops and mentors to help you start from zero.',
  },
  {
    q: 'How much does membership cost?',
    a: 'Fees are kept minimal to ensure accessibility. The exact amount is announced during registration. Most events are free for members.',
  },
  {
    q: 'What kind of events does the club organize?',
    a: 'Competitive programming contests, hackathons, technical workshops, mock interviews, guest lectures, open-source contribution days and networking meetups.',
  },
  {
    q: 'How can I stay updated on club activities?',
    a: 'Follow us on Instagram, LinkedIn and GitHub. Community group links (WhatsApp / Discord) are shared after membership registration.',
  },
  {
    q: 'Can I volunteer or contribute to the club?',
    a: 'Yes! We need help organizing events, creating content, mentoring juniors and leading sessions. Mention your interest during registration or contact any team member.',
  },
];

document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

    const links = navMenu.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    }
  }

  const eventsGrid = document.getElementById('eventsGrid');
  if (eventsGrid) {
    for (let i = 0; i < eventsData.length; i++) {
      const event = eventsData[i];
      const div = document.createElement('div');
      div.className = 'events-card';
      
      const meta = document.createElement('div');
      meta.className = 'events-meta';
      
      const date = document.createElement('span');
      date.className = 'events-date';
      date.textContent = event.date;
      
      const location = document.createElement('span');
      location.className = 'events-location';
      location.textContent = event.location;
      
      meta.appendChild(date);
      meta.appendChild(location);
      
      const title = document.createElement('h3');
      title.className = 'events-title';
      title.textContent = event.title;
      
      const desc = document.createElement('p');
      desc.className = 'events-desc';
      desc.textContent = event.description;
      
      const btn = document.createElement('a');
      btn.className = 'events-btn';
      btn.href = '#';
      btn.target = '_blank';
      btn.textContent = 'Learn More';
      
      div.appendChild(meta);
      div.appendChild(title);
      div.appendChild(desc);
      div.appendChild(btn);
      
      eventsGrid.appendChild(div);
    }
  }

  const teamGrid = document.getElementById('teamGrid');
  if (teamGrid) {
    for (let i = 0; i < teamData.length; i++) {
      const member = teamData[i];
      const div = document.createElement('div');
      div.className = 'team-card';
      
      const photo = document.createElement('div');
      photo.className = 'team-photo';
      
      const img = document.createElement('img');
      img.src = member.photo || 'assets/images/team_placeholder.png';
      img.alt = member.name + ' photo';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      photo.appendChild(img);
      
      const name = document.createElement('p');
      name.className = 'team-name';
      name.textContent = member.name;
      
      const role = document.createElement('span');
      role.className = 'team-role';
      role.textContent = member.role;
      
      const socials = document.createElement('div');
      socials.className = 'team-socials';
      
      const inLink = document.createElement('a');
      inLink.className = 'team-link';
      inLink.href = member.linkedin || '#';
      inLink.target = '_blank';
      inLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>';
      
      const emailLink = document.createElement('a');
      emailLink.className = 'team-link';
      emailLink.href = member.email ? 'mailto:' + member.email : 'mailto:#';
      emailLink.target = '_blank';
      emailLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
      
      socials.appendChild(inLink);
      socials.appendChild(emailLink);
      
      div.appendChild(photo);
      div.appendChild(name);
      div.appendChild(role);
      div.appendChild(socials);
      
      teamGrid.appendChild(div);
    }
  }

  const faqList = document.getElementById('faqList');
  if (faqList) {
    for (let i = 0; i < faqData.length; i++) {
      const item = faqData[i];
      const div = document.createElement('div');
      div.className = 'faq-item';
      
      const question = document.createElement('button');
      question.className = 'faq-question';
      question.textContent = item.q;
      
      const icon = document.createElement('span');
      icon.className = 'faq-icon';
      icon.textContent = '+';
      question.appendChild(icon);
      
      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      
      const inner = document.createElement('div');
      inner.className = 'faq-inner';
      inner.textContent = item.a;
      
      answer.appendChild(inner);
      
      div.appendChild(question);
      div.appendChild(answer);
      
      faqList.appendChild(div);
      
      question.addEventListener('click', function () {
        const isOpen = div.classList.contains('open');
        
        const allItems = faqList.querySelectorAll('.faq-item');
        for (let j = 0; j < allItems.length; j++) {
          allItems[j].classList.remove('open');
          const iq = allItems[j].querySelector('.faq-icon');
          if (iq) iq.textContent = '+';
        }
        
        if (!isOpen) {
          div.classList.add('open');
          icon.textContent = '-';
        }
      });
    }
  }
});
