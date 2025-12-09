// Screen Test Pro - Main Application
class ScreenTestApp {
    constructor() {
        this.currentTest = null;
        this.autoPlayInterval = null;
        this.testSequence = [];
        this.currentTestIndex = 0;
        this.touchPoints = new Map();

        this.init();
    }

    init() {
        this.cacheElements();
        this.loadPreferences();
        this.attachEventListeners();
        this.setupSwipeGestures();
        this.setupKeyboardControls();
        this.showWelcomeMessage();
    }

    cacheElements() {
        this.testDisplay = document.getElementById('testDisplay');
        this.controlPanel = document.getElementById('controlPanel');
        this.menuToggle = document.getElementById('menuToggle');
        this.menuBackdrop = document.getElementById('menuBackdrop');
        this.togglePanel = document.getElementById('togglePanel');
        this.quickTest = document.getElementById('quickTest');
        this.fullTest = document.getElementById('fullTest');
        this.autoPlayCheckbox = document.getElementById('autoPlay');
        this.autoPlaySpeed = document.getElementById('autoPlaySpeed');
        this.darkModeBtn = document.getElementById('darkMode');
        this.fullscreenBtn = document.getElementById('fullscreen');
        this.techViewBtn = document.getElementById('techView');
        this.testInfo = document.getElementById('testInfo');
        this.instructionsOverlay = document.getElementById('instructionsOverlay');
        this.instructionTitle = document.getElementById('instructionTitle');
        this.instructionText = document.getElementById('instructionText');
        this.closeInstructions = document.getElementById('closeInstructions');
        this.touchFeedback = document.getElementById('touchFeedback');
        this.progressBar = document.getElementById('progressBar');
        this.navHints = document.getElementById('navHints');
        this.testButtons = document.querySelectorAll('.test-btn');
    }

    loadPreferences() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    attachEventListeners() {
        // Menu toggle
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        this.menuBackdrop.addEventListener('click', () => this.closeMenu());
        this.togglePanel.addEventListener('click', () => this.toggleMenu());

        // Quick actions
        this.quickTest.addEventListener('click', () => this.startQuickTest());
        this.fullTest.addEventListener('click', () => this.startFullTest());

        // Test buttons
        this.testButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const testType = btn.getAttribute('data-test');
                this.runTest(testType);
            });
        });

        // Auto-play
        this.autoPlayCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.startAutoPlay();
            } else {
                this.stopAutoPlay();
            }
        });

        // Controls
        this.darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        this.techViewBtn.addEventListener('click', () => this.toggleTechView());

        // Instructions
        this.closeInstructions.addEventListener('click', () => {
            this.instructionsOverlay.classList.add('hidden');
        });

        // Touch feedback
        this.testDisplay.addEventListener('touchstart', (e) => this.handleTouch(e));
        this.testDisplay.addEventListener('touchmove', (e) => this.handleTouch(e));
        this.testDisplay.addEventListener('touchend', () => this.hideTouchFeedback());
    }

    setupSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        this.testDisplay.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        this.testDisplay.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
        });
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.previousTest();
                    break;
                case 'ArrowRight':
                    this.nextTest();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
                case 'Escape':
                    this.exitFullscreen();
                    break;
                case 'f':
                    this.toggleFullscreen();
                    break;
            }
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                this.previousTest();
            } else {
                this.nextTest();
            }
        }
    }

    handleTouch(e) {
        const touch = e.touches[0];
        this.touchFeedback.style.left = touch.clientX + 'px';
        this.touchFeedback.style.top = touch.clientY + 'px';
        this.touchFeedback.classList.add('active');
    }

    hideTouchFeedback() {
        this.touchFeedback.classList.remove('active');
    }

    toggleMenu() {
        const isOpen = this.controlPanel.classList.contains('open');
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.controlPanel.classList.add('open');
        this.menuBackdrop.classList.add('active');
        this.menuToggle.classList.add('menu-open');
    }

    closeMenu() {
        this.controlPanel.classList.remove('open');
        this.menuBackdrop.classList.remove('active');
        this.menuToggle.classList.remove('menu-open');
    }

    toggleControlPanel() {
        // Keep for backward compatibility with old toggle button
        this.toggleMenu();
    }

    toggleDarkMode() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('darkMode', !isDark);
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    exitFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    toggleTechView() {
        document.body.classList.toggle('tech-view');
    }

    toggleAutoPlay() {
        this.autoPlayCheckbox.checked = !this.autoPlayCheckbox.checked;
        this.autoPlayCheckbox.dispatchEvent(new Event('change'));
    }

    startQuickTest() {
        this.testSequence = [
            'solid-black', 'solid-white', 'solid-red', 'solid-green', 'solid-blue',
            'gradient-h', 'contrast', 'touch-grid'
        ];
        this.currentTestIndex = 0;
        this.runTestSequence(10000); // 10 seconds
    }

    startFullTest() {
        this.testSequence = [
            'solid-black', 'solid-white', 'solid-red', 'solid-green', 'solid-blue',
            'solid-yellow', 'solid-purple', 'solid-cyan',
            'gradient-h', 'gradient-v', 'rgb-pattern', 'sharpness',
            'scrolling', 'flicker', 'contrast',
            'touch-grid', 'dead-zone', 'brightness', 'flash', 'pixel-locator', 'burn-in'
        ];
        this.currentTestIndex = 0;
        this.runTestSequence(6000); // ~2 minutes total
    }

    runTestSequence(duration) {
        this.progressBar.classList.remove('hidden');
        this.navHints.classList.remove('hidden');
        this.closeMenu(); // Auto-close menu when starting test sequence

        const runNext = () => {
            if (this.currentTestIndex < this.testSequence.length) {
                const testType = this.testSequence[this.currentTestIndex];
                this.runTest(testType, false);

                const progress = ((this.currentTestIndex + 1) / this.testSequence.length) * 100;
                this.updateProgress(progress, `${this.currentTestIndex + 1}/${this.testSequence.length}`);

                this.currentTestIndex++;
                setTimeout(runNext, duration);
            } else {
                this.progressBar.classList.add('hidden');
                this.navHints.classList.add('hidden');
                this.showTestComplete();
            }
        };

        runNext();
    }

    updateProgress(percent, text) {
        const fill = this.progressBar.querySelector('.progress-fill');
        const textEl = this.progressBar.querySelector('.progress-text');
        fill.style.width = percent + '%';
        textEl.textContent = text;
    }

    startAutoPlay() {
        const speed = parseInt(this.autoPlaySpeed.value);
        this.autoPlayInterval = setInterval(() => {
            this.nextTest();
        }, speed);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    nextTest() {
        const tests = Array.from(this.testButtons);
        const currentIndex = tests.findIndex(btn => btn.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % tests.length;
        tests[nextIndex].click();
    }

    previousTest() {
        const tests = Array.from(this.testButtons);
        const currentIndex = tests.findIndex(btn => btn.classList.contains('active'));
        const prevIndex = currentIndex <= 0 ? tests.length - 1 : currentIndex - 1;
        tests[prevIndex].click();
    }

    runTest(testType, showInstructions = true) {
        this.currentTest = testType;
        this.testButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-test="${testType}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        this.testDisplay.innerHTML = '';
        this.testDisplay.className = 'test-display';

        const testConfig = this.getTestConfig(testType);
        this.updateTestInfo(testConfig.name, testConfig.description);

        if (showInstructions && testConfig.instructions) {
            this.showInstructions(testConfig.name, testConfig.instructions);
        }

        // Auto-close menu when starting a test
        this.closeMenu();

        this[testConfig.method]();
    }

    getTestConfig(testType) {
        const configs = {
            'solid-black': { name: 'Black Screen', description: 'Test for dead pixels and stuck pixels', instructions: 'Look for any bright spots or colored pixels on the black screen', method: 'testSolidColor', color: '#000000' },
            'solid-white': { name: 'White Screen', description: 'Test for dead pixels and color uniformity', instructions: 'Look for any dark spots or color tints', method: 'testSolidColor', color: '#FFFFFF' },
            'solid-red': { name: 'Red Screen', description: 'Test red subpixels', instructions: 'Check for uniform red color across the screen', method: 'testSolidColor', color: '#FF0000' },
            'solid-green': { name: 'Green Screen', description: 'Test green subpixels', instructions: 'Check for uniform green color across the screen', method: 'testSolidColor', color: '#00FF00' },
            'solid-blue': { name: 'Blue Screen', description: 'Test blue subpixels', instructions: 'Check for uniform blue color across the screen', method: 'testSolidColor', color: '#0000FF' },
            'solid-yellow': { name: 'Yellow Screen', description: 'Test yellow color accuracy', instructions: 'Check for uniform yellow color', method: 'testSolidColor', color: '#FFFF00' },
            'solid-purple': { name: 'Purple Screen', description: 'Test purple color accuracy', instructions: 'Check for uniform purple color', method: 'testSolidColor', color: '#FF00FF' },
            'solid-cyan': { name: 'Cyan Screen', description: 'Test cyan color accuracy', instructions: 'Check for uniform cyan color', method: 'testSolidColor', color: '#00FFFF' },
            'gradient-h': { name: 'Horizontal Gradient', description: 'Test for color banding', instructions: 'Look for smooth color transitions without visible bands', method: 'testGradientH' },
            'gradient-v': { name: 'Vertical Gradient', description: 'Test for color banding', instructions: 'Look for smooth color transitions without visible bands', method: 'testGradientV' },
            'rgb-pattern': { name: 'RGB Pattern', description: 'Test color accuracy and alignment', instructions: 'Check if colors are sharp and properly aligned', method: 'testRGBPattern' },
            'sharpness': { name: 'Sharpness Test', description: 'Test screen sharpness', instructions: 'Check if lines are crisp and text is clear', method: 'testSharpness' },
            'scrolling': { name: 'Scrolling Bar', description: 'Test for ghosting and motion blur', instructions: 'Watch the moving bar for trailing or blur', method: 'testScrolling' },
            'flicker': { name: 'Flicker Test', description: 'Test for screen flicker', instructions: 'Watch for any flickering or uneven transitions', method: 'testFlicker' },
            'contrast': { name: 'High Contrast', description: 'Test for light bleed and contrast', instructions: 'Check edges and corners for light leakage', method: 'testContrast' },
            'touch-grid': { name: 'Touch Grid Test', description: 'Test touch responsiveness', instructions: 'Tap each cell to test touch sensitivity', method: 'testTouchGrid' },
            'dead-zone': { name: 'Dead Zone Detector', description: 'Find unresponsive touch areas', instructions: 'Drag your finger across the screen', method: 'testDeadZone' },
            'brightness': { name: 'Auto Brightness', description: 'Test auto-brightness sensor', instructions: 'Cover and uncover the sensor to test response', method: 'testBrightness' },
            'flash': { name: 'Flash Mode', description: 'Rapid color cycling for defect detection', instructions: 'Watch for any anomalies during color changes', method: 'testFlash' },
            'pixel-locator': { name: 'Pixel Locator', description: 'Locate specific pixels with grid overlay', instructions: 'Use the grid to identify pixel locations', method: 'testPixelLocator' },
            'burn-in': { name: 'Burn-in Detector', description: 'Test for screen burn-in', instructions: 'Look for any persistent images or shadows', method: 'testBurnIn' }
        };

        const config = configs[testType];
        if (testType.startsWith('solid-')) {
            config.color = config.color;
        }
        return config;
    }

    updateTestInfo(name, description) {
        this.testInfo.innerHTML = `<strong>${name}</strong><br>${description}`;
    }

    showInstructions(title, text) {
        this.instructionTitle.textContent = title;
        this.instructionText.textContent = text;
        this.instructionsOverlay.classList.remove('hidden');
    }

    showWelcomeMessage() {
        this.testInfo.innerHTML = '<strong>Welcome to Screen Test Pro</strong><br>Select a test or run Quick/Full test to begin';
    }

    showTestComplete() {
        this.testInfo.innerHTML = '<strong>Test Complete!</strong><br>All tests have been executed successfully';
        this.openMenu(); // Open menu when test sequence completes
    }

    // Test Methods
    testSolidColor() {
        const config = this.getTestConfig(this.currentTest);
        this.testDisplay.style.background = config.color;
    }

    testGradientH() {
        this.testDisplay.style.background = 'linear-gradient(to right, #000000, #FFFFFF)';
    }

    testGradientV() {
        this.testDisplay.style.background = 'linear-gradient(to bottom, #000000, #FFFFFF)';
    }

    testRGBPattern() {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const cellSize = 40;
        const colors = ['#FF0000', '#00FF00', '#0000FF'];

        for (let y = 0; y < canvas.height; y += cellSize) {
            for (let x = 0; x < canvas.width; x += cellSize) {
                const colorIndex = ((x / cellSize) + (y / cellSize)) % colors.length;
                ctx.fillStyle = colors[colorIndex];
                ctx.fillRect(x, y, cellSize, cellSize);
            }
        }

        this.testDisplay.appendChild(canvas);
    }

    testSharpness() {
        const container = document.createElement('div');
        container.style.cssText = 'width: 100%; height: 100%; background: white; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px;';

        const text = document.createElement('div');
        text.style.cssText = 'font-size: 16px; color: black; font-family: monospace;';
        text.textContent = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';

        const lines = document.createElement('div');
        lines.style.cssText = 'width: 80%; height: 200px; background: repeating-linear-gradient(0deg, black, black 1px, white 1px, white 2px);';

        container.appendChild(text);
        container.appendChild(lines);
        this.testDisplay.appendChild(container);
    }

    testScrolling() {
        this.testDisplay.style.background = '#000';
        const bar = document.createElement('div');
        bar.className = 'scrolling-bar horizontal';
        this.testDisplay.appendChild(bar);
    }

    testFlicker() {
        const div = document.createElement('div');
        div.className = 'flicker-test';
        this.testDisplay.appendChild(div);
    }

    testContrast() {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const size = 50;
        for (let y = 0; y < canvas.height; y += size) {
            for (let x = 0; x < canvas.width; x += size) {
                ctx.fillStyle = ((x / size) + (y / size)) % 2 === 0 ? '#000' : '#FFF';
                ctx.fillRect(x, y, size, size);
            }
        }

        this.testDisplay.appendChild(canvas);
    }

    testTouchGrid() {
        const grid = document.createElement('div');
        grid.className = 'touch-grid';
        grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
        grid.style.gridTemplateRows = 'repeat(5, 1fr)';

        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'touch-cell';
            cell.textContent = i + 1;
            cell.addEventListener('touchstart', (e) => {
                e.preventDefault();
                cell.classList.add('touched');
            });
            cell.addEventListener('click', () => {
                cell.classList.add('touched');
            });
            grid.appendChild(cell);
        }

        this.testDisplay.appendChild(grid);
    }

    testDeadZone() {
        this.testDisplay.style.background = '#1a1a1a';
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const handleDraw = (e) => {
            e.preventDefault();
            const touches = e.touches || [e];
            for (let touch of touches) {
                const rect = canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;

                ctx.fillStyle = '#6366f1';
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        canvas.addEventListener('touchmove', handleDraw);
        canvas.addEventListener('touchstart', handleDraw);
        canvas.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) handleDraw(e);
        });

        this.testDisplay.appendChild(canvas);
    }

    testBrightness() {
        let bright = true;
        this.testDisplay.style.background = '#FFF';

        setInterval(() => {
            this.testDisplay.style.background = bright ? '#000' : '#FFF';
            bright = !bright;
        }, 2000);
    }

    testFlash() {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'];
        let index = 0;

        setInterval(() => {
            this.testDisplay.style.background = colors[index];
            index = (index + 1) % colors.length;
        }, 200);
    }

    testPixelLocator() {
        this.testDisplay.style.background = '#000';
        const grid = document.createElement('div');
        grid.className = 'pixel-grid';
        this.testDisplay.appendChild(grid);
    }

    testBurnIn() {
        this.testDisplay.style.background = '#808080';
        const text = document.createElement('div');
        text.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; color: white; font-weight: bold;';
        text.textContent = 'BURN-IN TEST';
        this.testDisplay.appendChild(text);

        setTimeout(() => {
            this.testDisplay.style.background = '#FFF';
            text.style.color = '#000';
        }, 5000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ScreenTestApp();
});
