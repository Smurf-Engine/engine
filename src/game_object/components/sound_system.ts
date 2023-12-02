import Component from "../component";

export class SoundSystem extends Component{
    public source? : string;
    public volume : number = 1;
    public loop : boolean = false;
    public autoplay : boolean = false;
    private audio! : HTMLAudioElement;
    start(): void {
        this.audio = new Audio(this.source);
        this.audio.volume = this.volume;
        this.audio.loop = this.loop;
        
        if(this.autoplay){
            this.audio.play();
        }
    }
    
    play(){
        this.audio.currentTime = 0;
        this.audio.play();
    }

    pause(){
        this.audio.pause();
    }

    stop(){
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    setVolume(volume : number){
        this.audio.volume = volume;
    }

    setDuration(duration : number){
        this.audio.currentTime = duration;
    }

    onDestory(): void {
        
    }
}