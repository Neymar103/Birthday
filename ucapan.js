// EMOJI RAIN - THIS WILL DEFINITELY WORK!
        function startEmojiRain() {
            const container = document.getElementById('emoji-container');
            const emojis = [
                // Love emojis
                '💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞', '💟', '❣️', '💌',
                // Birthday emojis
                '🎂', '🎉', '🎊', '🎁', '🎈', '🎀', '🍰', '🧁', '🎇', '🎆', '✨',
                // Funny & cute emojis
                '😍', '🥰', '😘', '😚', '🤗', '🥳', '🤩', '😻', '💋', '🌹', '🌺', '🌸', '🌼', '🦄', '🍓', '🍭', '🍬', '🧸', '👑', '⭐', '🌟'
            ];

            function createEmoji() {
                const emoji = document.createElement('div');
                emoji.className = 'emoji-fall';
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.left = Math.random() * 100 + '%';
                emoji.style.fontSize = (Math.random() * 20 + 25) + 'px';
                
                const duration = Math.random() * 3 + 5; // 5-8 seconds
                emoji.style.animationDuration = duration + 's';
                
                container.appendChild(emoji);
                
                // Remove emoji after animation
                setTimeout(() => {
                    emoji.remove();
                }, duration * 1000);
            }

            // Create initial emojis
            for (let i = 0; i < 30; i++) {
                setTimeout(() => createEmoji(), i * 200);
            }

            // Keep creating emojis
            setInterval(() => {
                createEmoji();
                createEmoji();
            }, 500);
        }

        // Create Sparkles
        function createSparkles() {
            for (let i = 0; i < 30; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + 'vw';
                sparkle.style.top = Math.random() * 100 + 'vh';
                sparkle.style.animationDelay = Math.random() * 2 + 's';
                document.body.appendChild(sparkle);
            }
        }

        // Memory Card Game
        const emojis = ['🎂', '🎁', '💝', '🎈'];
        let cards = [...emojis, ...emojis];
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function createGame() {
            const gameArea = document.getElementById('gameArea');
            gameArea.innerHTML = '';
            cards = shuffle([...emojis, ...emojis]);
            
            cards.forEach((emoji, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.emoji = emoji;
                card.dataset.index = index;
                card.textContent = '❓';
                card.addEventListener('click', flipCard);
                gameArea.appendChild(card);
            });
        }

        function flipCard() {
            if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
                return;
            }

            this.classList.add('flipped');
            this.textContent = this.dataset.emoji;
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                moves++;
                document.getElementById('moves').textContent = moves;
                checkMatch();
            }
        }

        function checkMatch() {
            const [card1, card2] = flippedCards;
            
            if (card1.dataset.emoji === card2.dataset.emoji) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                document.getElementById('matches').textContent = matchedPairs + '/4';
                
                showCelebration('🎉');
                
                flippedCards = [];
                
                if (matchedPairs === 4) {
                    setTimeout(() => {
                        showCelebration('🎊 HEBAT! 🎊');
                        document.getElementById('surprisePopup').classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    card1.textContent = '❓';
                    card2.textContent = '❓';
                    flippedCards = [];
                }, 1000);
            }
        }

        function showCelebration(emoji) {
            const celebration = document.createElement('div');
            celebration.className = 'celebration-popup';
            celebration.textContent = emoji;
            document.body.appendChild(celebration);
            setTimeout(() => celebration.remove(), 1000);
        }

        function resetGame() {
            flippedCards = [];
            matchedPairs = 0;
            moves = 0;
            document.getElementById('moves').textContent = '0';
            document.getElementById('matches').textContent = '0/4';
            closePopup();
            createGame();
        }

        function closePopup() {
            document.getElementById('surprisePopup').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // START EVERYTHING!
        window.addEventListener('DOMContentLoaded', function() {
            console.log('Starting emoji rain...');
            startEmojiRain();
            createSparkles();
            createGame();
        });