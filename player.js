import { Sitting, Running, Jumping, Falling } from "./playerState.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3
        this.x = 0
        this.y = this.game.height - this.height
        this.vy = 0
        this.image = document.getElementById('player')
        this.speed = 0
        this.frameX = 0
        this.maxFrame = 5
        this.fps = 60
        this.frameInterval = 1000 / this.fps
        this.frameTimer = 0
        this.frameY = 0
        this.weight = 1
        this.maxSpeed = 10
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)]
        this.currentState = this.states[0]
        this.currentState.enter()
    }
    update(input, deltaTime) {
        this.currentState.handleInput(input)
        this.x += this.speed
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed
        else this.speed = 0
        if (this.x < 0) this.x = 0
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width
        // if (input.includes("ArrowUp") && this.onGround()) this.vy -= 20;
        this.y += this.vy
        if (!this.onGround()) this.vy += this.weight
        else this.vy = 0
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
        } else {
            this.frameTimer += deltaTime;
        }
        // if (this.frameX < this.maxFrame) this.frameX++
        // else this.frameX = 0;
    }
    draw(context) {
        //  console.log(this.frameX, this.frameY)
        context.drawImage(this.image, this.frameX * 575, this.frameY * 540, 546, 520, this.x, this.y, this.width, this.height)
        //IMAGEM SOURCE X SOURCE Y WIDTH DA IMAGEM HETGHT DA IMAGEM DESTINATION X DESTINATION Y DESTINATION SIZE
    }
    onGround() {
        return this.y >= this.game.height - this.height
    }
    setState(state) {
        this.currentState = this.states[state]
        this.currentState.enter()
    }
}