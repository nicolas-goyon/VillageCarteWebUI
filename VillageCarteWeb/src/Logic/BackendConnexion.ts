export class BackendConnexion{

    private static instance: BackendConnexion | null = null

    private socket: WebSocket | null = null
    private observers: (() => void)[] = []
    private storedFirstEvent: MessageEvent | null = null

    
    private constructor(){
    }

    public static getInstance(): BackendConnexion{
        if(this.instance === null){
            this.instance = new BackendConnexion()
        }
        return this.instance
    }

    public connect(): WebSocket{
        const socket = new WebSocket("wss://apivillage.pgiacc.fr/chat/dkdk")
        socket.onopen = () => {
            console.log("Connected to server")
        }
        this.socket = socket
        socket.onmessage = (event) => {
            this.storedFirstEvent = event
            this.observers.forEach(observer => {
                observer()
            })
        }

        socket.onerror = (event) => {
            console.log(event)
        }

        socket.onclose = (event) => {
            console.log(event)
        }

        return socket
    }

    public setOnMessage(handleMessages: (event: MessageEvent) => void){
        if(this.socket !== null){
            this.socket.onmessage = (event) => {
                handleMessages(event)
            }
        }
    }

    public addObserver(observer: () => void){
        this.observers.push(observer)
    }


    public getStoredFirstEvent(): MessageEvent | null{
        return this.storedFirstEvent
    }



    public send(event: any){
        if(this.socket !== null){
            this.socket.send(JSON.stringify(event))
        }
    }
    
}