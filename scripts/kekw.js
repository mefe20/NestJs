document.addEventListener('DOMContentLoaded', function () {
    const memeCat = document.getElementById('meme-cat');
    const memeSound = document.getElementById('meme-sound');

    memeCat.addEventListener('click', () => {
        memeSound.play();
        createHearts();
    });

    function createHearts() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        document.body.appendChild(heart);

        const rect = memeCat.getBoundingClientRect();
        heart.style.left = `${rect.left + rect.width / 2}px`;
        heart.style.top = `${rect.top + rect.height / 2}px`;

        anime({
            targets: heart,
            scale: [
                { value: 1.5, duration: 500, easing: 'easeOutQuad' },
                { value: 1, duration: 500, easing: 'easeInQuad' }
            ],
            complete: () => {
                createSmallHearts(heart);
                heart.remove();
            }
        });
    }

    function createSmallHearts(parentHeart) {
        for (let i = 0; i < 10; i++) {
            const smallHeart = document.createElement('div');
            smallHeart.classList.add('small-heart');
            document.body.appendChild(smallHeart);

            const rect = parentHeart.getBoundingClientRect();
            smallHeart.style.left = `${rect.left}px`;
            smallHeart.style.top = `${rect.top}px`;

            anime({
                targets: smallHeart,
                translateX: {
                    value: () => anime.random(-200, 200),
                    duration: 1000,
                    easing: 'easeOutQuad'
                },
                translateY: {
                    value: () => anime.random(-200, 200),
                    duration: 1000,
                    easing: 'easeOutQuad'
                },
                scale: [
                    { value: 1.5, duration: 500, easing: 'easeOutQuad' },
                    { value: 1, duration: 500, easing: 'easeInQuad' }
                ],
                opacity: {
                    value: 0,
                    duration: 1000,
                    easing: 'easeOutQuad'
                },
                complete: () => {
                    smallHeart.remove();
                }
            });
        }
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function toggleTheme() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    }

    function setInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme + '-theme');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-theme');
        } else {
            body.classList.add('light-theme');
        }
    }

    themeToggleBtn.addEventListener('click', toggleTheme);
    setInitialTheme();
});


document.addEventListener('DOMContentLoaded', () => {
    // Установка основного курсора с анимацией для всего тела
    const body = document.querySelector('body');
    body.style.cursor = "url('images/cursors/Apple Normal Select.cur'), auto";

    // Установка курсора при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .btn, #celebrate-link, pre, li');
    interactiveElements.forEach(element => {
        element.style.cursor = "url('images/cursors/Apple Link Select.cur'), pointer";
    });

    const testCursor1 = new Image();
    testCursor1.src = 'images/cursors/Apple Normal Select.cur';
    testCursor1.onload = () => {
        console.log('Cursor 1 loaded');
        body.style.cursor = "url('images/cursors/Apple Normal Select.cur'), auto";
    };

    const testCursor2 = new Image();
    testCursor2.src = 'images/cursors/Apple Link Select.cur';
    testCursor2.onload = () => {
        console.log('Cursor 2 loaded');
        interactiveElements.forEach(element => {
            element.style.cursor = "url('images/cursors/Apple Link Select.cur'), pointer";
        });
    };

    testCursor1.onerror = () => {
        console.error('Cursor 1 failed to load');
    };

    testCursor2.onerror = () => {
        console.error('Cursor 2 failed to load');
    };
});