let gravity = 0.4, speed = 3;
let bird = document.querySelector('.bird');
let img = document.getElementById("bird-1");
let sound_point  = new Audio('SoundEffect/soundseffect_point.mp3');
let sound_die = new Audio('SoundEffect/soundseffect_die.mp3');

// get bird element properties
let bird_props = bird.getBoundingClientRect();
// above method will returns DOMReact -> top, right, bottom, left, x, y, width and height
let bg = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.current_Score');
let message = document.querySelector('.msg');
let score_title = document.querySelector('.score_title');

let gameState = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e)=>{
   
    if(e.key=='Enter' && gameState!='Play'){
        document.querySelectorAll('.pipes').forEach((e)=>{
            e.remove();
        })
       img.style.display='block';
       bird.style.top='40vh';
       gameState='Play';
       message.innerHTML='';
       score_title= 'Your Score : ';
       score_val.innerHTML='0';
       message.classList.remove('messageStyle');
       startGame()

    }
});

function startGame(){

    function move(){
        if(gameState != 'Play') return;
    
        let pipe_sprite = document.querySelectorAll('.pipes');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();
    
            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top){
                    gameState = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + speed>= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = pipe_sprite_props.left - speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);

    let bird_y= 0;

    function gravityEffect(){
        if(gameState!='Play'){
            return ;
        }
        bird_y +=gravity; // every frame the bird goes down by 1 pixel
        document.addEventListener('keydown',(e)=>{
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird-2.png';
                bird_y = -7.6;
            }
        });
        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird.png';
            }
        });
        if(bird_props.top<=10||bird_props.bottom>=bg.bottom){
            gameState='End';
            message.style.left='28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_y + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(gravityEffect);
    }
    requestAnimationFrame(gravityEffect);

    let pipe_seperation = 0;

    let pipe_gap = 35;

    function create_pipe(){
        if(gameState!='Play'){
            return ;
        }
        if(pipe_seperation>115){
            pipe_seperation =0;
            
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipes';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipes';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}



