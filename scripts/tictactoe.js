document.addEventListener('DOMContentLoaded', () => {
    // Установка основного курсора с анимацией для всего тела
    const body = document.querySelector('body');
    body.style.cursor = "url('images/cursors/Apple Normal Select.cur'), auto";

    // Установка курсора при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .btn, #celebrate-link, pre, li, .cell, .theme-toggle');
    interactiveElements.forEach(element => {
        element.style.cursor = "url('images/cursors/Apple Link Select.cur'), pointer";
    });

    // Проверка загрузки курсоров
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
    const cells = document.querySelectorAll('[data-cell]');
    const customAlert = document.getElementById('custom-alert');
    const customAlertMessage = document.getElementById('custom-alert-message');
    const customAlertButton = document.getElementById('custom-alert-button');
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    let oTurn;

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

    // Устанавливаем начальную тему из localStorage или по умолчанию
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

    // Начало игры
    startGame();

    function startGame() {
        oTurn = false;
        cells.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.classList.remove('show'); // Очистка анимации
            cell.addEventListener('click', handleClick, { once: true });
        });
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = X_CLASS; // Пользователь всегда играет крестиками
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setTimeout(bestMove, 500); // Задержка перед ходом нейросети
        }
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
        setTimeout(() => cell.classList.add('show'), 10); // Анимация появления
    }

    function swapTurns() {
        oTurn = !oTurn;
    }

    function endGame(draw) {
        const message = draw ? 'Ничья!' : `${oTurn ? "Нолики" : "Крестики"} победили!`;
        showCustomAlert(message);
    }

    function showCustomAlert(message) {
        customAlertMessage.textContent = message;
        customAlert.style.display = 'flex';
        customAlertButton.addEventListener('click', hideCustomAlert);
    }

    function hideCustomAlert() {
        customAlert.style.display = 'none';
        startGame();
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        });
    }

    function checkWin(currentClass) {
        const WINNING_COMBINATIONS = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }

    function bestMove() {
        const shouldMakeRandomMove = Math.random() < 0.3; // 30% шанс сделать случайный ход

        if (shouldMakeRandomMove) {
            makeRandomMove();
        } else {
            makeSmartMove();
        }
    }

    function makeRandomMove() {
        const availableCells = [...cells].filter(cell => {
            return !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS);
        });

        if (availableCells.length === 0) return;

        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const move = availableCells[randomIndex];
        
        placeMark(move, O_CLASS);

        if (checkWin(O_CLASS)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }

    function makeSmartMove() {
        let bestScore = -Infinity;
        let move;
        cells.forEach(cell => {
            if (!cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) {
                cell.classList.add(O_CLASS);
                let score = minimax(cells, 0, false);
                cell.classList.remove(O_CLASS);
                if (score > bestScore) {
                    bestScore = score;
                    move = cell;
                }
            }
        });
        placeMark(move, O_CLASS);

        if (checkWin(O_CLASS)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }

    function minimax(cells, depth, isMaximizing) {
        if (checkWin(O_CLASS)) {
            return 1;
        } else if (checkWin(X_CLASS)) {
            return -1;
        } else if (isDraw()) {
            return 0;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            cells.forEach(cell => {
                if (!cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) {
                    cell.classList.add(O_CLASS);
                    let score = minimax(cells, depth + 1, false);
                    cell.classList.remove(O_CLASS);
                    bestScore = Math.max(score, bestScore);
                }
            });
            return bestScore;
        } else {
            let bestScore = Infinity;
            cells.forEach(cell => {
                if (!cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) {
                    cell.classList.add(X_CLASS);
                    let score = minimax(cells, depth + 1, true);
                    cell.classList.remove(X_CLASS);
                    bestScore = Math.min(score, bestScore);
                }
            });
            return bestScore;
        }
    }
});

