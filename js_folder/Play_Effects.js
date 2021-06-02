var Level = 0;
var Score = 0;
var health_point = 1000;
var Damage_per_second = 1;
let button_count = 0;
var Pause_State = false;


class play {
    constructor() {
        this.total_Box = 5;
        this.color = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)','rgba(0, 0, 255, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(0, 255, 255, 0.5)'];
        
        this.hit_box = [];
        this.health_point_UI = document.createElement('div');
        this.health_point_UI.className = 'health_point_UI';
        this.health_point_UI.style.left = '9%';

        this.health_point_UI_text = document.createElement('div');
        this.health_point_UI_text.className = 'health_point_UI_text';
        this.health_point_UI_text.style.left = '9%';
        this.health_point_UI_text.textContent = health_point;

        for (let i = 0; i < this.total_Box; i++) {
            this.hit_box[i] = new Hit_Box(this.color[i]);
            this.hit_box[i].Hit_button.addEventListener('click', this.Level_up.bind(this));
        }
    }

    Level_up() {
        if (Level == 0) {
            document.body.appendChild(this.health_point_UI);
            document.body.appendChild(this.health_point_UI_text);
        }

        if (Level < 5 && (Score + 1) / ((Level * 100 + 1)) >= 1) {
            console.log(Level);
            document.body.appendChild(this.hit_box[Level].Hit_button);
            button_count++;
            Level++;
        } 
        Damage_per_second = Score / 100 + 1;
    }

    Game_over() {
        document.querySelector('.wave_canvas').style.transform = 'translate(0vw, 0vw)';
        document.querySelector('.Game_over_text').style.transform = 'translate(0%)';

        for (let i = 0; i < 5; i++) {
            document.body.removeChild(this.hit_box[i].Hit_button);
            clearTimeout(this.hit_box[i].Error_Tlqkf);
        }
    }
}

class Hit_Box {
    constructor(color) {
        this.color = color
        this.Hit_button = document.createElement('button');
        this.Hit_button.className = 'Play_Hit_button';
        this.Hit_button.style.background = this.color;
        this.Hit_button.style.width = document.body.clientWidth / 30 + 'px';
        this.Hit_button.style.height = this.Hit_button.style.width;

        this.Hit_button.addEventListener('click', this.Effects.bind(this));
    }

    Effects(t) {
        Score += 10 * (health_point / 500);
        health_point += 3;
        if (health_point > 1000) { health_point = 1000; }
        document.querySelector('.Score_UI').textContent = Math.floor(Score / 1);

        console.log('Score : ' + Score);

        const Play_Hit_button = this.Hit_button;
        const button_color = Play_Hit_button.style.background;
        Play_Hit_button.className = 'click_Play_Hit_button';
        Play_Hit_button.style.background = 'White';

        Play_Hit_button.style.width = document.body.clientWidth / 20 + 'px';
        Play_Hit_button.style.height = Play_Hit_button.style.width;
        
        var x = Math.random() * (document.body.clientWidth - document.body.clientWidth / 5) + document.body.clientWidth / 10;
        var y = Math.random() * (document.body.clientHeight - document.body.clientHeight / 5) + document.body.clientHeight / 10;

        setTimeout(function() {
            document.body.removeChild(Play_Hit_button);
            button_count--;
            this.Error_Tlqkf = setTimeout(function() {  
                document.body.appendChild(Play_Hit_button);
                button_count++;
                Play_Hit_button.className = 'move_Play_Hit_button';
                Play_Hit_button.style.background = 'none';
                Play_Hit_button.style.top = y + 'px';
                Play_Hit_button.style.left = x + 'px';
                setTimeout(function() {
                    Play_Hit_button.className = 'Play_Hit_button';
                    Play_Hit_button.style.background = button_color;
                    Play_Hit_button.style.width = document.body.clientWidth / 30 + 'px';
                    Play_Hit_button.style.height = Play_Hit_button.style.width;
                }, 100);
            },1200);
        }, 100);
    }
}
