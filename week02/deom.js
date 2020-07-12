/**
 * 狗咬人
 * "咬" 这个行为该如何适用对象抽象？
 */

class Animal {
    constructor({ name, attack, blood }) {
        this.name = name
        this.attack = attack
        this.bloodTotal = blood
        this.blodCurt = blood
    }

    bite(attackName) {
        console.log(`${this.name}咬向了${attackName}`)
        return this.attack
    }

    hurt(attack) {
        this.changeBlood(attack)
    }

    changeBlood(attack) {
        this.blodCurt = Math.max(this.blodCurt - attack, 0)
        this.consoleLifeStatus()
    }

    consoleLifeStatus() {
        const { bloodTotal, blodCurt } = this
        const lifePercent = blodCurt / bloodTotal
        const lifeStatusText = lifePercent === 1 ? '精力充沛' :
            lifePercent > 0.6 ? '尚可存活' : 
            lifePercent > .2 ? '要死不活' :
            lifePercent > 0 ? '吊着口气' :
            '卒'
        console.log(lifeStatusText)
    }
}


class Dog extends Animal {
    constructor({name, attack, blood = 100}) {
        super({ name, attack, blood })
    }
}

class Human extends Animal {
    constructor({name, attack, blood = 100}) {
        super({ name, attack, blood })
    }
}

const yellowDog = new Dog({
    name: '大黄',
    attack: 30,
})

const zhang = new Human({
    name: '张三',
    attack: 20,
    blood: 40
})

zhang.hurt(yellowDog.bite(zhang.name))
zhang.hurt(yellowDog.bite(zhang.name))
