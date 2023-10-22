
interface DecoratorComponent {
    operation(): string;
}

class ConcreteComponent implements DecoratorComponent {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

class Decorator implements DecoratorComponent {
    protected component: DecoratorComponent;

    constructor(component: DecoratorComponent) {
        this.component = component;
    }

    public operation(): string {
        return this.component.operation();
    }
}

class ConcreteDecoratorA extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

function decoratorCode(component: DecoratorComponent) {
    console.log(`RESULT: ${component.operation()}`);

}

const concreteComponent = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
decoratorCode(concreteComponent);
console.log('');

const decorator1 = new ConcreteDecoratorA(concreteComponent);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
decoratorCode(decorator2);