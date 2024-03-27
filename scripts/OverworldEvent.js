class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehaviour({
            map: this.map,
        }, {
            direction: this.event.direction,
            type: "stand",
            duration: this.event.duration,
        });

        // Handler to resolve event when done walking
        const completeHandler = (e) => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonStandingComplete", completeHandler);
    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehaviour({
            map: this.map,
        }, {
            direction: this.event.direction,
            type: "walk",
            retry: true
        });

        // Handler to resolve event when done walking
        const completeHandler = (e) => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler);
    }

    textMessage(resolve) {
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => {
                resolve();
            }
        });

        message.init(document.body);
    }

    changeMap(resolve) {
        this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
        resolve();
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve);
    })
    }
}