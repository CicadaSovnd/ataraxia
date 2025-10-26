document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 400;

    let score = 0;
    const hill = {
        startX: 100,
        startY: 350,
        endX: 700,
        endY: 100,
        slope: (100 - 350) / (700 - 100) // (y2-y1)/(x2-x1)
    };

    const player = {
        x: hill.startX + 20,
        y: 0,
        width: 20,
        height: 40,
        speed: 2
    };

    const boulder = {
        x: hill.startX + 50,
        y: 0,
        radius: 15,
        isRollingDown: false
    };

    const keys = {
        right: false,
        left: false
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') keys.right = true;
        if (e.key === 'ArrowLeft') keys.left = true;
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight') keys.right = false;
        if (e.key === 'ArrowLeft') keys.left = false;
    });

    function getYOnHill(x) {
        if (x < hill.startX) return hill.startY;
        if (x > hill.endX) return hill.endY;
        return hill.startY + (x - hill.startX) * hill.slope;
    }

    function drawHill() {
        ctx.beginPath();
        ctx.moveTo(0, hill.startY);
        ctx.lineTo(hill.startX, hill.startY);
        ctx.lineTo(hill.endX, hill.endY);
        ctx.lineTo(canvas.width, hill.endY);
        ctx.strokeStyle = '#c9d1d9';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function drawPlayer() {
        ctx.strokeStyle = '#f0f6fc';
        ctx.lineWidth = 3;
        const headY = player.y - player.height + 5;
        // Body
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(player.x, headY + 5);
        ctx.stroke();
        // Head
        ctx.beginPath();
        ctx.arc(player.x, headY, 5, 0, Math.PI * 2);
        ctx.stroke();
        // Legs
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(player.x - 8, player.y + 10);
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(player.x + 8, player.y + 10);
        ctx.stroke();
    }

    function drawBoulder() {
        ctx.beginPath();
        ctx.arc(boulder.x, boulder.y - boulder.radius, boulder.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#8b949e';
        ctx.fill();
    }

    function drawScore() {
        ctx.fillStyle = '#f0f6fc';
        ctx.font = '24px "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${score}`, 20, 40);
    }

    function gameLoop() {
        // --- Update logic ---
        if (keys.right && player.x < boulder.x - boulder.radius - 5) {
            player.x += player.speed;
        }
        if (keys.left && player.x > hill.startX) {
            player.x -= player.speed;
        }

        if (boulder.isRollingDown) {
            boulder.x -= 4; // Roll down faster
            if (boulder.x <= hill.startX + 50) {
                boulder.x = hill.startX + 50;
                boulder.isRollingDown = false;
            }
        } else {
            const distance = boulder.x - player.x;
            if (keys.right && distance < boulder.radius + 10 && player.x < hill.endX - boulder.radius) {
                player.x += player.speed / 2; // Slower when pushing
                boulder.x += player.speed / 2;
            }

            if (boulder.x >= hill.endX - boulder.radius) {
                score++;
                boulder.isRollingDown = true;
            }
        }

        player.y = getYOnHill(player.x);
        boulder.y = getYOnHill(boulder.x);

        // --- Drawing logic ---
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHill();
        drawPlayer();
        drawBoulder();
        drawScore();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});