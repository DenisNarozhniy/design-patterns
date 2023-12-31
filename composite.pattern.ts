
abstract class Component {
    protected parent!: Component | null;

    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    public add(component: Component): void { }

    public remove(component: Component): void { }

    public isComposite(): boolean {
        return false;
    }

    public abstract operation(): string;
}

class Leaf extends Component {
    public operation(): string {
        return 'Leaf';
    }
}

class Composite extends Component {
    protected children: Component[] = [];

    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    public operation(): string {
        const results:any = [];
        for (const child of this.children) {
            results.push(...(child.operation() as any));
        }

        return `Branch(${results.join('+')})`;
    }
}


function compositeCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

const leaf = new Leaf();
console.log('Client: I\'ve got a simple component:');
compositeCode(leaf);
console.log('');

const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
compositeCode(tree);
console.log('');


function compositeCode2(component1: Component, component2: Component) {

    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log(`RESULT: ${component1.operation()}`);

}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
compositeCode2(tree, leaf);