import Alpine from "alpinejs";

Alpine.data("app", () => ({
  initMin: 0,
  initSec:30,
  minScale: 1,
  secScale: 5,
  currMin: 0,
  currSec: 30,
  timeArea: "",
  running: false,
  paused: true,
  timerID: "",
  totalSeconds: 0,
  

  init() {
    this.timeArea = `${this.currMin}:${this.currSec}`;

  },

  reset() {
    this.currMin = this.initMin;
    this.currSec = this.initSec;
    this.init()
    this.updataProgressBar(100);
    clearInterval(this.timerID);
    this.running = false;
    this.paused=true;
  },
  

  addMin() {
    this.currMin += this.minScale;
    this.init()
    this.updataProgressBar(100);
    this.running=false
  },
  addSec() {
    this.currSec += this.secScale;
    this.init()
    this.updataProgressBar(100);
    this.running=false
  },

  reduceMin() {
    this.currMin =
      this.currMin - this.minScale > 0 ? this.currMin - this.minScale : 0;
    this.init()
    this.updataProgressBar(100);
    this.running=false
  },
  reduceSec() {
    this.currSec =
      this.currSec - this.secScale > 0 ? this.currSec - this.secScale : 1;
    this.init()
    this.updataProgressBar(100);
    this.running=false
  },

  setTime(){
    this.init()
  },

 

  run() {
    if (!this.running) {
      this.paused = false;
      this.start();
    } else {
      if (!this.paused) {
        this.pauseTimer();
      } else {
        this.resumeTimer();
      }
    }
  },

  start() {
    let barScale;
    if (!this.running) {
      this.running = true;
      this.totalSeconds = this.currMin * 60 + this.currSec;
      barScale = 100 / this.totalSeconds;
    }

    this.timerID = setInterval(() => {
      if (this.totalSeconds > 1) {
        this.totalSeconds--;
        this.updataTimer(this.totalSeconds);
        

        
        const percentage =
          100 - barScale * ((this.currMin * 60 + this.currSec) - this.totalSeconds);
        this.updataProgressBar(percentage);
        
        
      } else {
        this.stopTimer();
        this.updataProgressBar(0);
      }
    }, 1000);
  },

  updataTimer(Second) {
    const min = String(Math.floor(Second / 60)).padStart(2, "0");
    const sec = String(Math.floor(Second % 60)).padStart(2, "0");

    this.timeArea = `${min}:${sec}`;
  },

  updataProgressBar(percentage) {
    this.$refs.progressBar.style.width = percentage + "%";
  },

  resumeTimer() {
    this.start();
    this.paused = false;
  },

  pauseTimer() {
    clearInterval(this.timerID);
    this.paused = true;
  },

  stopTimer() {
    clearInterval(this.timerID);
    this.updataTimer(0);
    this.running = false;
  },
}));

Alpine.start();
