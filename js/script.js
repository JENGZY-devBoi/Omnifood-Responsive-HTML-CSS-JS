// Make mobile navigation work
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', () => {
    headerEl.classList.toggle('nav-open');
});

// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');

        // Scroll back to top
        if (href === "#") window.scrollTo({
            top:0,
            behavior: 'smooth'
        });

        // Scroll to other links
        if  (href !== '#' && href.startsWith('#')) {
            const sectionEL = document.querySelector(href);
            sectionEL.scrollIntoView({ behavior: 'smooth' });
        }

        // Close mobile navigation
        if (link.classList.contains('main-nav-link')) {
            headerEl.classList.toggle('nav-open');
        }
    });
});

// Sticky navigation
const sectionHeroEl = document.querySelector('.section-hero');

const observer = new IntersectionObserver(entries => {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
        document.body.classList.add('sticky');
    } else {
        document.body.classList.remove('sticky');
    }
}, 
{
    // In the viewport
    root: null,
    thrshold: 0,
    rootMargin: '-80px'
});
observer.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some safari versions
const checkFlexGap = () => {
    const flex = document.createElement('div');
    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.rowGap = '1px';

    flex.appendChild(document.createElement('div'));
    flex.appendChild(document.createElement('div'));

    document.body.appendChild(flex);
    const isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();