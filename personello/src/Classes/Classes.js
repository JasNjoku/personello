export class Board {
    constructor(id, name, background) {
        this.id = id;
        this.name = name;
        this.background = background;
        this.lists = [];
        this.favourited = false;
    }

}


export class List {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.listCards = [];
    }

}

export class Card {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.description = '';
        this.todos = [];
    }
}

export class Todo {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.completed = false;
    }

}