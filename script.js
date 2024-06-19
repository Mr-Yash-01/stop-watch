let start = document.getElementById('start');
let stop = document.getElementById('stop');
let reset = document.getElementById('reset');
let lap = document.getElementById('lap');
let laplableDivider = document.getElementById('laplableDivider');


let hours = document.getElementById('hours');
let minutes = document.getElementById('min');
let seconds = document.getElementById('sec');
let mseconds = document.getElementById('msec');

stop.style.display = 'none';

let h = 0;
let m = 0;
let s = 0;
let ms = 0;
let lapCount = 0;
let lastlapH = 0;
let lastlapM = 0;
let lastlapS = 0;
let lastlapMS = 0;
let timer = false;

start.addEventListener('click', () => {
    lap.disabled = false;
    lap.style.opacity = 1;
    start.style.display = 'none';
    stop.style.display = 'flex';
    reset.disabled = true;
    reset.style.opacity = 0.3;
    timer = true;
    stopwatch();    
});

stop.addEventListener('click', () => {
    reset.disabled = false;
    reset.style.opacity = 1;
    stop.style.display = 'none';
    start.style.display = 'flex';
    lap.disabled = true;
    lap.style.opacity = 0.3;
    timer = false;
    stopwatch();
});

reset.addEventListener('click', () => {

    timer = false;
    h = 0;
    m = 0;
    s = 0;
    ms = 0;

    hours.innerHTML = '00';
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
    mseconds.innerHTML = '00';
    start.style.display = 'flex';
    stop.style.display = 'none';

    document.getElementById('lapList').innerHTML = '';
    lapCount = 0;
    lastlapH = 0;
    lastlapM = 0;
    lastlapS = 0;
    lastlapMS = 0;

    document.getElementById('lableRow').style.display = 'none';
    laplableDivider.style.display = 'none';
    lap.disabled = false;
    lap.style.opacity = 1;

});

lap.addEventListener('click', () => {
    if (timer) {

        reset.disabled = true;
        reset.style.opacity = 0.3;

        lapCount++;
        
        let calH = h - lastlapH;
        let calM = m - lastlapM;
        let calS = s - lastlapS;
        let calMS = ms - lastlapMS;

        if (calMS < 0){
            calMS = 100 + calMS;
            calS--;
        }

        if (calS < 0){
            calS = 60 + calS;
            calM--;
        }

        if (calM < 0){
            calM = 60 + calM;
            calH--;
        }

        let hDisplay = calH < 10 ? '0' + calH : calH;
        let mDisplay = calM < 10 ? '0' + calM : calM;
        let sDisplay = calS < 10 ? '0' + calS : calS;

        if (lapCount == 1){
            console.log("inside if");
            document.getElementById('lableRow').style.display = 'flex';
            laplableDivider.style.display = 'flex';
        }

        let lapTime = document.createElement('div');
        let lapNumber = document.createElement('span');
        let timeAtLap = document.createElement('span');

        let totalH = h < 10 ? '0' + h : h;
        let totalM = m < 10 ? '0' + m : m;
        let totalS = s < 10 ? '0' + s : s;
        let totalMS = ms < 10 ? '0' + ms : ms;
        let lapCountDisplay = lapCount < 10 ? '0' + lapCount : lapCount;

        lapTime.innerHTML = `+${hDisplay}:${mDisplay}:${sDisplay}`;
        lapNumber.innerHTML = `Lap ${lapCountDisplay}`;
        timeAtLap.innerHTML = `${totalH}:${totalM}:${totalS}:${totalMS}`;

        let li = document.createElement('li');
        li.classList.add('flex','text-white','justify-between','p-2');
        li.appendChild(lapNumber);
        li.appendChild(lapTime);
        li.appendChild(timeAtLap);

        document.getElementById('lapList').appendChild(li);

        lastlapH = h;
        lastlapM = m;
        lastlapS = s;
        lastlapMS = ms;
    }
    
});


function stopwatch() {
    
    if (timer){
        ms++;

        if (ms == 100){
            ms = 0;
            s++;
        }

        if (s == 60){
            s = 0;
            m++;
        }

        if (m == 60){  
            m = 0;
            h++;
        }
        
        let hDisplay = h < 10 ? '0' + h : h;
        let mDisplay = m < 10 ? '0' + m : m;
        let sDisplay = s < 10 ? '0' + s : s;
        let msDisplay = ms < 10 ? '0' + ms : ms;

        hours.innerHTML = hDisplay;
        minutes.innerHTML = mDisplay;
        seconds.innerHTML = sDisplay;
        mseconds.innerHTML = msDisplay;

        setTimeout(stopwatch, 10);
    }

}

