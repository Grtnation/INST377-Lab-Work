document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('grid')
    const doodler = document.createElement("div")

    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + "px"
    }
    class Platform {
        constructor(newPlatBottom)  {
            this.bottom = 
        }
    }






    function createPlatform() {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount
            let newPlatt
        }
    }

    function start() {
        if (!isGameOver) {
            createDoodler()
            createPlatform()
        }
    }
    //attach to button

})
