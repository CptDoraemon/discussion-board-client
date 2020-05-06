const COLORS = ['#ff4143', '#50c5e3', '#fcb415'];

const getColor = () => {
    const index = Math.floor(Math.random() * COLORS.length);
    return COLORS[index];
};

export class ConfettiSprite {
    color: string;
    x: number;
    y: number;
    r: number;
    rotation: number;
    vx: number;
    vy: number;
    opacity: number;
    finished: boolean;
    params = {
        dx: 0.92,
        dy: 0.95,
        g: 0.2,
        dr: 0.99,
        dOpacity: 0.015,
        dRotation: Math.random() + 1,
        ddRotation: 0.95
    };

    constructor(width: number, height: number) {
        this.color = getColor();
        this.x = 0.2 * width;
        this.y = 0.4 * height;
        this.r = 5;
        this.rotation = Math.random() * Math.PI;
        this.vx = (-7 * Math.random() + 1) * -(width / 90);
        this.vy = (2.5 * Math.random() + 1) * -(height / 100);
        this.opacity = 1;
        this.finished = false;
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
        // set this.finished to true when opacity <= 0
        if (this.vy >= 0) {
            const nextOpacity = this.opacity - this.params.dOpacity;
            if (nextOpacity > 0) {
                this.opacity = nextOpacity
            } else {
                this.finished = true
            }
        }

        // rotation
        this.params.dRotation *= this.params.ddRotation;
        this.rotation += this.params.dRotation
    }
}

interface ConfettiOptions extends Object {
    width: number,
    height: number,
    spritesCount: number,
    [key: string]: any
}

class Confetti {
    params: ConfettiOptions;
    ID: string;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    sprites: ConfettiSprite[];

    constructor(ID: string, options?: Partial<ConfettiOptions>) {
        this.params = this.initParams(options);
        this.ID = ID;
        this.canvas = null;
        this.ctx = null;
        this.sprites = [];
        this.loop = this.loop.bind(this);
    }

    initParams(options?: Partial<ConfettiOptions>) {
        const defaultOptions = {
            width: 300,
            height: 300,
            spritesCount: 30,
        } as ConfettiOptions;

        if (options !== undefined) {
            return {...defaultOptions, ...options}
        }

        return defaultOptions
    }

    initCanvas() {
        this.canvas = document.getElementById(this.ID) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.params.width;
        this.canvas.height = this.params.height;
    }

    initSprites() {
        for (let i=0; i<this.params.spritesCount; i++) {
            this.sprites.push(new ConfettiSprite(this.params.width, this.params.height));
        }
    }

    /**
     * set drawer() according to if CanvasRenderingContext2D.ellipse() is supported
     */
    initDrawer() {
        if (!this.ctx) return;

        if (this.ctx.ellipse === undefined) {
            this.drawer = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
                ctx.arc(x, y, r, 0, 2 * Math.PI);
            }
        } else {
            this.drawer = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rotation: number) => {
                ctx.ellipse(x, y, r, r * 1.2, rotation, 0, 2 * Math.PI);
            }
        }
    }

    /**
     * drawer draws ellipse if supported, otherwise draw arc
     */
    drawer(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rotation?: number) {}

    draw() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.params.width, this.params.height);

        this.sprites.forEach(_ => {
            if (!this.ctx) return;

            this.ctx.save();
            this.ctx.beginPath();
            this.drawer(this.ctx, _.x, _.y, _.r, _.rotation);
            this.ctx.fillStyle = _.color;
            this.ctx.globalAlpha = _.opacity;
            this.ctx.fill();
            this.ctx.restore();
        })
    }

    update() {
        this.sprites = this.sprites.filter(_ => {
            _.move();
            return !_.finished
        });
    }

    loop() {
        this.draw();
        this.update();

        if (this.sprites.length > 0) {
            requestAnimationFrame(this.loop);
        }
    }

    main() {
        this.initCanvas();
        this.initSprites();
        this.initDrawer();
        this.loop();
    }
}

export default Confetti