(function () {
    // ----- image dataset (category + url) -----
    const images = [
        { id: 1, category: 'nature', url: 'https://picsum.photos/id/1015/400/400', alt: 'Mountain lake' },
        { id: 2, category: 'nature', url: 'https://picsum.photos/id/1018/400/400', alt: 'Forest trail' },
        { id: 3, category: 'city', url: 'https://picsum.photos/id/21/400/400', alt: 'City lights' },
        { id: 4, category: 'city', url: 'https://picsum.photos/id/44/400/400', alt: 'Urban building' },
        { id: 5, category: 'abstract', url: 'https://picsum.photos/id/185/400/400', alt: 'Colorful abstract' },
        { id: 6, category: 'abstract', url: 'https://picsum.photos/id/193/400/400', alt: 'Geometric art' },
        { id: 7, category: 'people', url: 'https://picsum.photos/id/64/400/400', alt: 'Portrait' },
        { id: 8, category: 'people', url: 'https://picsum.photos/id/91/400/400', alt: 'Group of friends' },
        { id: 9, category: 'nature', url: 'https://picsum.photos/id/1043/400/400', alt: 'River' },
        { id: 10, category: 'city', url: 'https://picsum.photos/id/20/400/400', alt: 'Night city' },
        { id: 11, category: 'abstract', url: 'https://picsum.photos/id/180/400/400', alt: 'Fluid art' },
        { id: 12, category: 'people', url: 'https://picsum.photos/id/26/400/400', alt: 'Walking' },
        { id: 13, category: 'nature', url: 'https://picsum.photos/id/1025/400/400', alt: 'Ocean view' },
        { id: 14, category: 'city', url: 'https://picsum.photos/id/58/400/400', alt: 'Street' },
        { id: 15, category: 'abstract', url: 'https://picsum.photos/id/152/400/400', alt: 'Pattern' },
        { id: 16, category: 'people', url: 'https://picsum.photos/id/69/400/400', alt: 'Dancer' },
        {
            id: 17,
            category: 'nature',
            url: 'https://picsum.photos/id/1016/400/400',
            alt: 'Forest river'
        },
        {
            id: 18,
            category: 'nature',
            url: 'https://picsum.photos/id/1020/400/400',
            alt: 'Green valley'
        },
        {
            id: 19,
            category: 'nature',
            url: 'https://picsum.photos/id/1024/400/400',
            alt: 'Beautiful landscape'
        },
        {
            id: 20,
            category: 'nature',
            url: 'https://picsum.photos/id/1039/400/400',
            alt: 'Snowy mountains'
        },

        // People
        {
            id: 21,
            category: 'people',
            url: 'https://picsum.photos/id/1005/400/400',
            alt: 'Smiling woman'
        },
        {
            id: 22,
            category: 'people',
            url: 'https://picsum.photos/id/1006/400/400',
            alt: 'Portrait of a man'
        },
        {
            id: 23,
            category: 'people',
            url: 'https://picsum.photos/id/1027/400/400',
            alt: 'Happy traveler'
        },
        {
            id: 24,
            category: 'people',
            url: 'https://picsum.photos/id/1025/400/400',
            alt: 'Young photographer'
        },
        {
            id: 25,
            category: 'people',
            url: 'https://picsum.photos/id/1062/400/400',
            alt: 'Casual portrait'
        },

        // Abstract
        {
            id: 26,
            category: 'abstract',
            url: 'https://picsum.photos/id/1040/400/400',
            alt: 'Abstract colors'
        },
        {
            id: 27,
            category: 'abstract',
            url: 'https://picsum.photos/id/1050/400/400',
            alt: 'Modern abstract art'
        },
        {
            id: 28,
            category: 'abstract',
            url: 'https://picsum.photos/id/1060/400/400',
            alt: 'Creative texture'
        },
        {
            id: 29,
            category: 'abstract',
            url: 'https://picsum.photos/id/1070/400/400',
            alt: 'Geometric pattern'
        },
        {
            id: 30,
            category: 'abstract',
            url: 'https://picsum.photos/id/1080/400/400',
            alt: 'Colorful background'
        },

        // City
        {
            id: 31,
            category: 'city',
            url: 'https://picsum.photos/id/1011/400/400',
            alt: 'City skyline'
        },
        {
            id: 32,
            category: 'city',
            url: 'https://picsum.photos/id/1031/400/400',
            alt: 'Urban street'
        },
        {
            id: 33,
            category: 'city',
            url: 'https://picsum.photos/id/1035/400/400',
            alt: 'Modern buildings'
        },
        {
            id: 34,
            category: 'city',
            url: 'https://picsum.photos/id/1043/400/400',
            alt: 'Night city lights'
        },
        {
            id: 35,
            category: 'city',
            url: 'https://picsum.photos/id/1056/400/400',
            alt: 'Downtown skyline'
        }
    ];

    // ----- state -----
    let currentCategory = 'all';
    let currentPage = 0;
    const itemsPerPage = 8;
    let filteredImages = [...images];

    // lightbox state
    let lightboxOpen = false;
    let lightboxIndex = 0;
    let lightboxImages = [];

    // DOM refs
    const grid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pageIndicator = document.getElementById('pageIndicator');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const searchInput = document.getElementById("searchInput");

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    // ----- render gallery -----
    function renderGallery() {
        const start = currentPage * itemsPerPage;
        const pageItems = filteredImages.slice(start, start + itemsPerPage);
        const totalPages = Math.ceil(filteredImages.length / itemsPerPage) || 1;

        if (currentPage >= totalPages) currentPage = totalPages - 1;
        if (currentPage < 0) currentPage = 0;

        grid.innerHTML = '';
        if (filteredImages.length === 0) {

            grid.innerHTML = `
        <div style="
            grid-column:1/-1;
            text-align:center;
            padding:50px;
        ">
            <h2>🔍 No Results Found</h2>
            <p>
                "<strong>${searchInput.value}</strong>"
                does not exist in our gallery.
            </p>
        </div>
    `;

            pageIndicator.textContent = "0 / 0";
            return;
        }

        pageItems.forEach((img, idx) => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.dataset.id = img.id;
            div.dataset.category = img.category;

            const imgEl = document.createElement('img');
            imgEl.src = img.url;
            imgEl.alt = img.alt || 'gallery image';
            imgEl.loading = 'lazy';

            const label = document.createElement('span');
            label.className = 'item-label';
            label.textContent = img.category;

            div.appendChild(imgEl);
            div.appendChild(label);
            grid.appendChild(div);

            // lightbox trigger
            div.addEventListener('click', () => {
                // build lightbox image list from current filtered + page order
                lightboxImages = filteredImages.slice();
                const globalIndex = lightboxImages.findIndex(item => item.id === img.id);
                if (globalIndex !== -1) {
                    openLightbox(globalIndex);
                } else {
                    // fallback: find in original
                    const fallbackIdx = images.findIndex(i => i.id === img.id);
                    if (fallbackIdx !== -1) {
                        lightboxImages = [...images];
                        openLightbox(fallbackIdx);
                    }
                }
            });
        });

        // update indicator
        const total = Math.ceil(filteredImages.length / itemsPerPage) || 1;
        pageIndicator.textContent = `${Math.min(currentPage + 1, total)} / ${total}`;
    }

    // ----- filter logic -----
    function setCategory(category) {
        currentCategory = category;
        if (category === 'all') {
            filteredImages = [...images];
        } else {
            filteredImages = images.filter(img => img.category === category);
        }
        currentPage = 0;
        renderGallery();
    }

    // ----- navigation pages -----
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            renderGallery();
        }
    }

    function nextPage() {
        const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
        if (currentPage < totalPages - 1) {
            currentPage++;
            renderGallery();
        }
    }

    // ----- lightbox functions -----
    function openLightbox(index) {
        if (!lightboxImages.length) return;
        lightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
        const imgData = lightboxImages[lightboxIndex];
        lightboxImg.src = imgData.url;
        lightboxImg.alt = imgData.alt || 'lightbox';
        lightbox.classList.add('open');
        lightboxOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxOpen = false;
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        if (!lightboxImages.length) return;
        lightboxIndex = (lightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
        const imgData = lightboxImages[lightboxIndex];
        lightboxImg.src = imgData.url;
        lightboxImg.alt = imgData.alt || 'lightbox';
    }

    // ----- event listeners -----
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.filter;
            setCategory(category);
        });
    });

    searchInput.addEventListener("input", function () {

        const search = this.value.trim().toLowerCase();

        filteredImages = images.filter(image => {

            const matchCategory =
                currentCategory === "all" ||
                image.category === currentCategory;

            // Search by image name (alt)
            const matchAlt =
                image.alt.toLowerCase().includes(search);

            // Search by category
            const matchImageCategory =
                image.category.toLowerCase().includes(search);

            return matchCategory && (matchAlt || matchImageCategory);
        });

        currentPage = 0;
        renderGallery();

    });

    prevPageBtn.addEventListener('click', prevPage);
    nextPageBtn.addEventListener('click', nextPage);

    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    // keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (lightboxOpen) {
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
        if (!lightboxOpen) {
            if (e.key === 'ArrowLeft') prevPage();
            if (e.key === 'ArrowRight') nextPage();
        }
    });

    // init
    setCategory('all');
})();