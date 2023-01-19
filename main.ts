namespace SpriteKind {
    export const Fireball = SpriteKind.create()
    export const Fire = SpriteKind.create()
    export const FireSource = SpriteKind.create()
}
// the fireSource will spawn at random points
sprites.onCreated(SpriteKind.FireSource, function (sprite) {
    sprite.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
})
// everything that the fire needs to:
// projectile, takes away 1 life, changes score by 1, and 100ms delay so that the fireballs do not overlap
function fire () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 4 4 2 . . . . . . 
        . . . . . 2 4 5 1 4 2 . . . . . 
        . . . . . 2 4 1 5 4 2 . . . . . 
        . . . . . . 2 4 4 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 50, 0)
    info.changeLifeBy(-1)
    info.changeScoreBy(1)
    pause(100)
}
// starts the fire 
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // makes it so that the player can actually lose
    info.startCountdown(3)
    // if the player has more than one life, it will call the function that shoots fireballs
    while (info.life() > 1) {
        fire()
    }
})
// if the player collects a fuel source, they will get more health and time
sprites.onOverlap(SpriteKind.Player, SpriteKind.FireSource, function (sprite, otherSprite) {
    info.changeCountdownBy(3)
    info.changeLifeBy(5)
    otherSprite.destroy()
})
// the player is established with 15 lives and 3 seconds to start
let fireSource: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . . . f f f . . . . . . 
    . . . . . . f 4 4 4 f . . . . . 
    . . . . . f 4 4 4 4 4 f . . . . 
    . . . . f 4 4 2 2 4 4 4 f . . . 
    . . . . f 4 4 2 2 2 4 4 4 f . . 
    . . . f 4 4 2 2 2 2 2 4 4 f . . 
    . . . f 4 4 2 2 2 2 2 2 4 4 f . 
    . . . f 4 4 2 2 2 5 5 2 4 4 f . 
    . . f 4 4 4 2 2 2 5 5 5 4 4 4 f 
    . f 4 4 4 2 2 2 5 5 5 5 4 4 4 f 
    f 4 4 2 2 2 2 5 5 5 5 5 5 4 4 f 
    f 4 4 2 2 2 2 5 5 5 5 5 5 4 4 f 
    . f 4 4 4 2 2 5 5 5 5 5 5 4 f . 
    . . f 4 4 4 4 4 4 4 4 4 4 4 f . 
    . . . f 4 4 4 4 4 4 4 4 f f . . 
    . . . . f f f f f f f f . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 50, 50)
mySprite.setStayInScreen(true)
info.setLife(15)
// the player has 3 seconds to start
info.startCountdown(3)
// i changed the duration to make it more of a challenge
game.onUpdateInterval(1000, function () {
    fireSource = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . 2 2 2 2 2 2 . . 5 . . . . . 
        . . 2 . . . . 2 2 5 . . . . . . 
        . . 2 . . . . 2 2 2 . . . . . . 
        . . 2 2 2 2 2 2 2 2 . . . . . . 
        . . 2 f 2 2 2 2 f 2 . . . . . . 
        . . 2 2 f 2 2 f 2 2 . . . . . . 
        . . 2 2 2 f f 2 2 2 . . . . . . 
        . . 2 2 2 f f 2 2 2 . . . . . . 
        . . 2 2 2 f f 2 2 2 . . . . . . 
        . . 2 2 2 f f 2 2 2 . . . . . . 
        . . 2 2 f 2 2 f 2 2 . . . . . . 
        . . 2 f 2 2 2 2 f 2 . . . . . . 
        . . 2 2 2 2 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.FireSource)
})
