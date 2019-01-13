export class ChatClient{
    public nickname:string;
    public color:string;

    constructor(nickname:string, color:string)
    {
        this.nickname = nickname;
        this.color = color;
    }
}

export class ChatRootClient extends ChatClient{
    
    constructor() {super("Root", "#000000");}
}