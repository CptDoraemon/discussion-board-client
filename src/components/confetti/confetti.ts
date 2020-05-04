const COLORS = ['#ff4143', '#50c5e3', '#fcb415'];

const getColor = () => {
    const index = Math.floor(Math.random() * COLORS.length);
    return COLORS[index];
};

class ConfettiSprite {
    color: string;
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    opacity: number;
    params = {
        dx: 0.9,
        dy: 0.92,
        g: 0.2,
        dr: 0.99,
        dOpacity: 0.01
    };

    constructor(x: number, y: number) {
        this.color = getColor();
        this.x = x;
        this.y = y;
        this.r = 5;
        this.vx = (-2 * Math.random() + 1) * -15;
        this.vy = (Math.random() + 1) * -8;
        this.opacity = 1;
    }

    move() {
        // horizontal speed
        this.vx = this.vx * this.params.dx;
        this.x = this.x + this.vx;

        // vertical speed
        this.vy = this.vy * this.params.dy;
        this.vy = this.vy + this.params.g;
        this.y = this.y + this.vy;


        // reduce opacity when it starts to fall
        if (this.vy >= 0) {
            const nextOpacity = this.opacity - this.params.dOpacity;
            if (nextOpacity > 0) {
                this.opacity = nextOpacity
            }
        }
    }
}


class Confetti {
    params: {
        width: number,
        height: number,
        spritesCount: number
    };
    ID: string;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    sprites: ConfettiSprite[];
    timestamp: null | number;

    constructor(ID: string, width: number, height: number) {
        this.params = this.initParams(width, height);
        this.ID = ID;
        this.canvas = null;
        this.ctx = null;
        this.sprites = [];
        this.timestamp = null;
        this.loop = this.loop.bind(this);
    }

    initParams(width: number, height: number) {
        return {
            width,
            height,
            spritesCount: 20
        }
    }

    initCanvas() {
        this.canvas = document.getElementById(this.ID) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.params.width;
        this.canvas.height = this.params.height;
    }

    initSprites() {
        const x = 0.5 * this.params.width;
        const y = 0.5 * this.params.height;

        for (let i=0; i<this.params.spritesCount; i++) {
            this.sprites.push(new ConfettiSprite(x, y));
        }
    }

    draw() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.params.width, this.params.height);

        this.sprites.forEach(_ => {
            if (!this.ctx) return;

            this.ctx.beginPath();
            this.ctx.arc(_.x, _.y, _.r, 0, 2 * Math.PI);
            this.ctx.fillStyle = _.color;
            this.ctx.globalAlpha = _.opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        })
    }

    update() {
        this.sprites.forEach(_ => {
            _.move();
        })
    }

    loop() {
        this.draw();
        this.update();

        if (this.timestamp && Date.now() - this.timestamp <= 2000) {
            requestAnimationFrame(this.loop);
        }
    }

    main() {
        this.initCanvas();
        this.initSprites();
        this.timestamp = Date.now();
        this.loop();
    }
}

export default Confetti