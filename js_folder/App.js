window.onload = () => {
    var starting = new Starting();
    new App();

    var Play_Hit_button = new play;

    var mvoe_canvas_switch = document.createElement('button');
    mvoe_canvas_switch.className = 'move_canvas_switch';

    var pause_switch_Skin = document.createElement('div');
    pause_switch_Skin.className = 'pause_switch_Skin';

    var pause_Skin_Skin = [];
    for (let i = 0; i < 2; i++) {
        pause_Skin_Skin[i] = document.createElement('div')
        pause_Skin_Skin[i].className = 'pause_Skin_Skin';

        pause_Skin_Skin[i].style.top = '5px';
        pause_Skin_Skin[i].style.left = (i + 1) * 7 + 2 + 'px';

        pause_switch_Skin.appendChild(pause_Skin_Skin[i]);
    }

    var Start_batton = document.querySelector('.Starting_Cover_Circle_Color_1');
    let Start_batton_State = 0;

    var interval = setInterval(function() {
        if (Start_batton_State == 0) {
            Start_batton.className = 'Starting_Cover_Circle_Color_2';
            Start_batton_State = 1;
        } else if (Start_batton_State == 1) {
            Start_batton.className = 'Starting_Cover_Circle_Color_3';
            Start_batton_State = 2;
        } else if (Start_batton_State == 2){
            Start_batton.className = 'Starting_Cover_Circle_Color_1';
            Start_batton_State = 0;
        } else {
            clearInterval(interval);
        }
    }, 1500)

    Start_batton.addEventListener('click', function(){
        Start_batton_State = 3;
        starting.delete();
        Start_batton.className = 'click_Starting_Cover_Circle';
        
        Start_batton.textContent = 3;
        setTimeout(function() { 
            Start_batton.textContent = 2;
            setTimeout(function() { 
                Start_batton.textContent = 1;
                setTimeout(function() { 
                    document.body.removeChild(Start_batton);
                    document.body.appendChild(mvoe_canvas_switch);
                    document.body.appendChild(pause_switch_Skin);
                    
                    document.querySelector('.Score_UI').style.transform = 'translate(0, 0%)';
                    Play_Hit_button.Level_up();

                    Start_State = true;
                    var Game = setInterval(function() {
                        if (!Pause_State) {
                            health_point -= Damage_per_second * button_count;
                            if (health_point < 0) {
                                Play_Hit_button.health_point_UI_text.textContent = 0;
                            } else {
                            Play_Hit_button.health_point_UI_text.textContent = Math.floor(health_point);
                            }
                            Play_Hit_button.health_point_UI.style.width = (health_point * 10) + 'px';
                            console.log('hit Damage..! : ' + Damage_per_second * button_count);
                            console.log('pause_state : ' + Pause_State);
                        }
                        if (health_point <= 0) {
                            console.log('Game over.');
                            Play_Hit_button.Game_over();
                            clearInterval(Game);
                        }
                    }, 1000);

                }, 1000);
            }, 1000);
        }, 1000);
    });

    document.querySelector('.Game_over_text').addEventListener('click', function() {window.location.reload()});

    mvoe_canvas_switch.addEventListener('click', function() {pause_operation_up()});
    
    document.querySelector('.Pause_Environment_Button').addEventListener('click', function() {pause_operation_down()});

    document.addEventListener('keydown', function(e) {
        const keyCode = e.keyCode;
        if (keyCode == 27 && Start_State == true) {
            console.log('pushed key ' + e.key);
            pause_operation()
        }

        var handled = false;

        if (keyCode == 9) {
            handled = true;
        }

        if (handled) {
            e.preventDefault();
        }
    });

    function pause_operation() {
        if (Pause_State == true) {
            pause_operation_down();
        } else {
            pause_operation_up();
        }
    }

    function pause_operation_up() {
        for (let i = 0; i < Play_Hit_button.total_Box; i++) {
            Play_Hit_button.hit_box[i].Hit_button.style.zIndex = -1;
        }
        document.querySelector('.wave_canvas').style.transform = 'translate(0vw, 0vw)';
        document.querySelector('.Pause_Environment').style.transform = 'translate(0vw, 0vw)';
        Pause_State = true;
    }

    function pause_operation_down() {
        for (let i = 0; i < Play_Hit_button.total_Box; i++) {
                Play_Hit_button.hit_box[i].Hit_button.style.zIndex = 10;
        }
        document.querySelector('.wave_canvas').style.transform = 'translate(0vw, 81%)';
        document.querySelector('.Pause_Environment').style.transform = 'translate(0vw, 200%)';
        Pause_State = false;
    }

}
