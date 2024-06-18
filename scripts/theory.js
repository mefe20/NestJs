document.getElementById('back-to-practice').addEventListener('click', function(event) {
    event.preventDefault();
    document.body.style.opacity = 0;
    setTimeout(function() {
        window.location.href = 'practical.html';
    }, 500);
});

function submitQuiz() {
    const answers = {
        q1: 'b',
        q2: 'b',
        q3: 'b',
        q4: 'b',
        q5: 'a'
    };
    let score = 0;
    const form = document.getElementById('quiz-form');
    const result = document.getElementById('quiz-result');

    for (let [question, correctAnswer] of Object.entries(answers)) {
        const userAnswer = form.elements[question].value;
        if (userAnswer === correctAnswer) {
            score++;
        }
    }

    result.innerHTML = `Ваш результат: ${score} из 5`;
    if (score === 5) {
        document.getElementById('next-page').style.display = 'block';
    } else {
        document.getElementById('next-page').style.display = 'none';
    }
}

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
    // Установка основного курсора с анимацией для всего тела
    const body = document.querySelector('body, li');
    body.style.cursor = "url('images/cursors/Apple Normal Select.cur'), auto";

    // Установка курсора при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .btn, #celebrate-link, pre, input, label, .theme-toggle');
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

    // Пасхалка
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
