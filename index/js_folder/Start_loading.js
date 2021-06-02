class Starting {
    constructor() {
        this.State = true;
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'Starting_canvas';
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        window.addEventListener('resize', this.resize.bind(this), {
            once: false,
            passive: false,
            capture: false,
        });

        this.starting_effect_group = new Starting_Effect_Group();

        this.resize();
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stage_width = document.body.clientWidth;
        this.stage_height = document.body.clientHeight;

        this.canvas.width = this.stage_width * 2;
        this.canvas.height = this.stage_height * 2;
        this.ctx.scale(2, 2);

        this.starting_effect_group.resize(this.stage_width, this.stage_height);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stage_width, this.stage_height);
        
        this.starting_effect_group.draw(this.ctx);
        if (this.State) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    delete() {
        document.body.removeChild(this.canvas);
        this.State = false;
    }

    re_start() {
        document.body.appendChild(this.canvas);
        this.State = true;
        requestAnimationFrame(this.animate.bind(this));
    }
}

class Starting_Effect {
    constructor(index, total_points, color, radius) {
        this.radius = radius;
        this.index = index; 
        this.color = color;
        this.total_points = total_points;
        this.Circle = Math.PI / (((this.total_points / 2) / 1) - ((this.total_points / 2) % 1));
        
        this.points = [];
    }

    resize(stage_width, stage_height) {
        this.stage_width = stage_width;
        this.stage_height = stage_height;

        this.center_x = stage_width / 2;
        this.center_y = stage_height / 2;
        
        this.init();
    }

    init() {
        for (let i = 0; i < this.total_points; i++) {
            // 0, 1/4, 1/2, 3/4, 1, 5/4, 3/2, 7/4
            this.angular_measure = this.Circle * i;
            this.points[i] = new Start_Point(
                this.angular_measure, 
                this.radius, 
                (this.index * 1.2) + i, 
                this.center_x, 
                this.center_y, 
                this.State
                );
        }  

        //console.log(this.points);
    }

    draw(ctx) {

        let prev_x = this.points[0].x;
        let prev_y = this.points[0].y;

        ctx.moveTo(this.points[0].x, this.points[0].y);

        ctx.fillStyle = this.color;

        // for (let i = 1; i <= this.total_points; i++) {
        //     let tmp_i = i % (this.total_points - (this.total_points % 2));
        //     const cx = (prev_x + this.points[tmp_i].x) / 2;
        //     const cy = (prev_y + this.points[tmp_i].y) / 2;
            
        //     ctx.beginPath();
        //     ctx.arc(cx, cy, 15, 0, 2 * Math.PI);
            
        //     ctx.fill(); 
        //     ctx.closePath();

        //     prev_x = this.points[tmp_i].x;
        //     prev_y = this.points[tmp_i].y;
        //     if (i != this.total_points) {
        //         this.points[tmp_i].update();
        //     }
        // }

        ctx.beginPath();
        for (let i = 1; i <= this.total_points; i++) {
            let tmp_i = i % (this.total_points - (this.total_points % 2));
            const cx = (prev_x + this.points[tmp_i].x) / 2;
            const cy = (prev_y + this.points[tmp_i].y) / 2;
            
            //ctx.lineTo(cx, cy);
            
            ctx.quadraticCurveTo(prev_x, prev_y, cx, cy);

            prev_x = this.points[tmp_i].x;
            prev_y = this.points[tmp_i].y;
            if (i != this.total_points) {
                this.points[tmp_i].update();
            }
        }
        ctx.fill(); 
        ctx.closePath();
    }
} 

class Start_Point {
    constructor(angular_measure, radius, index, x, y) {
        this.const_radius = radius;
        this.radius = radius;
        this.index = index;
        this.angular_measure = angular_measure;

        this.speed = 0.03;
        this.cur = index;

        this.center_x = x + 7.3;
        this.center_y = y + 8.2;

        this.x = Math.sin(this.angular_measure) * this.radius + this.center_x;
        this.y = Math.cos(this.angular_measure) * this.radius + this.center_y;
    }

    update() {
        this.cur += this.speed;
        this.radius = this.const_radius + (Math.sin(this.cur) * 20);
        this.x = Math.sin(this.angular_measure) * this.radius + this.center_x;
        this.y = Math.cos(this.angular_measure) * this.radius + this.center_y;
    }
}

class Starting_Effect_Group {
    constructor() {
        this.total_effects = 3;
        this.total_points = 21;

        this.color = ['rgba(255, 0, 0, 0.3)', 'rgba(255, 255, 0, 0.4)', 'rgba(0, 255, 255, 0.3)'];

        this.starting_effects = [];

        for (let i = 0; i < this.total_effects; i++) {8
            const starting_effect = new Starting_Effect(
                i, 
                this.total_points,
                this.color[i],
                171,
            );
            this.starting_effects[i] = starting_effect;
        }
    }

    resize(stage_width, stage_height) {
        for (let i =0; i < this.total_effects; i++) {
            const starting_effect = this.starting_effects[i];
            starting_effect.resize(stage_width, stage_height, );
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.total_effects; i++) {
            const starting_effect = this.starting_effects[i];
            starting_effect.draw(ctx);
        }
    }
}
