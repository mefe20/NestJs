document.getElementById('back-to-theory').addEventListener('click', function(event) {
    event.preventDefault();
    document.body.style.opacity = 0;
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 500);
});

document.querySelectorAll('pre code').forEach((block) => {
    block.addEventListener('click', (event) => {
        navigator.clipboard.writeText(block.innerText).then(() => {
            const tooltip = document.getElementById('copy-tooltip');
            tooltip.style.top = `${event.clientY}px`;
            tooltip.style.left = `${event.clientX}px`;
            tooltip.classList.add('show');
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        });
    });
});

document.querySelectorAll('#progress-steps li').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector('#section' + this.getAttribute('data-step')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const steps = document.querySelectorAll('#progress-steps li');
const progressIndicator = document.getElementById('progress-indicator');

let currentStep = 0;

function updateProgress(step) {
    currentStep = step;
    progressIndicator.style.width = ((step + 1) / steps.length) * 100 + '%';
    steps.forEach((stepElement, index) => {
        if (index === step) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY + window.innerHeight / 2;
    let sectionIndex = Array.from(document.querySelectorAll('section')).findIndex(section => scrollPosition < section.offsetTop + section.offsetHeight);
    if (sectionIndex === -1) {
        sectionIndex = document.querySelectorAll('section').length - 1;
    }
    updateProgress(sectionIndex);
});

updateProgress(0);

document.body.addEventListener('click', function(event) {
    const pixelCount = 10; // Количество пикселей
    for (let i = 0; i < pixelCount; i++) {
        const pixelEffect = document.createElement('div');
        pixelEffect.className = 'pixel-effect';
        pixelEffect.style.top = `${event.clientY}px`;
        pixelEffect.style.left = `${event.clientX}px`;
        pixelEffect.style.position = 'fixed';

        // Случайное смещение для каждого пикселя
        const offsetX = (Math.random() - 0.5) * 50; // Смещение по оси X
        const offsetY = (Math.random() - 0.5) * 50; // Смещение по оси Y
        
        pixelEffect.style.setProperty('--offset-x', `${offsetX}px`);
        pixelEffect.style.setProperty('--offset-y', `${offsetY}px`);

        document.body.appendChild(pixelEffect);
        setTimeout(() => {
            pixelEffect.remove();
        }, 1000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const celebrateLink = document.getElementById('celebrate-link');
    const celebrateSound = document.getElementById('celebrate-sound');

    celebrateLink.addEventListener('click', (event) => {
        // Проигрывание звука
        celebrateSound.play();

        // Создание фейерверка
        createFireworks(event.clientX, event.clientY);
    });
});

function createFireworks(x, y) {
    const pixelCount = 100;
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];

    for (let i = 0; i < pixelCount; i++) {
        const fireworkPixel = document.createElement('div');
        fireworkPixel.className = 'firework-pixel';
        fireworkPixel.style.top = `${y}px`;
        fireworkPixel.style.left = `${x}px`;
        fireworkPixel.style.position = 'fixed';
        fireworkPixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Случайное смещение для каждого пикселя
        const offsetX = (Math.random() - 0.5) * window.innerWidth;
        const offsetY = (Math.random() - 0.5) * window.innerHeight;

        fireworkPixel.style.setProperty('--offset-x', `${offsetX}px`);
        fireworkPixel.style.setProperty('--offset-y', `${offsetY}px`);

        document.body.appendChild(fireworkPixel);
        setTimeout(() => {
            fireworkPixel.remove();
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Установка основного курсора с анимацией для всего тела
    const body = document.querySelector('body');
    body.style.cursor = "url('images/cursors/Apple Normal Select.cur'), auto";

    // Установка курсора при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .btn, #celebrate-link, pre, li, .theme-toggle');
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

document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Функция переключения темы
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

    // Добавляем обработчик события для кнопки
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Устанавливаем начальную тему
    setInitialTheme();
});

    let keysPressed = [];
    document.addEventListener('keydown', (event) => {
        keysPressed.push(event.key.toLowerCase());
        if (keysPressed.join('').includes('loh')) {
            window.location.href = 'tictactoe.html';
        }
        if (keysPressed.length > 3) {
            keysPressed.shift();
        }
    });



document.addEventListener('DOMContentLoaded', function () {
    let inputSequence = '';

    document.addEventListener('keydown', (e) => {
        inputSequence += e.key.toLowerCase();
        if (inputSequence.includes('kekw')) {
            window.location.href = 'kekw.html';
        } else if (inputSequence.length > 4) {
            inputSequence = inputSequence.slice(-4); // Ограничиваем длину до последних 4 символов
        }
    });
});
