import { ClassicPreset as Classic } from 'rete';
import { ToolboxItem, ToolboxItemType } from './ToolboxItem';

const socket = new Classic.Socket('socket');

export class KustoNode extends Classic.Node {
    constructor() {
        super('Kusto');

        this.addInput('server', new Classic.Input(socket, 'server'));
        this.addInput('q', new Classic.Input(socket, 'query'));
        this.addOutput('result', new Classic.Output(socket, 'Result'));
        this.addControl(
        'result',
        new Classic.InputControl('number', { initial: 0, readonly: true })
        );
    }
}

export class LlmNode extends Classic.Node {
    constructor() {
        super('Llm');

        this.addInput('prompt', new Classic.Input(socket, 'prompt'));
        this.addInput('params', new Classic.Input(socket, 'params'));
        this.addOutput('result', new Classic.Output(socket, 'Result'));
    }
}

export class JsonNode extends Classic.Node {
    constructor() {
        super('JSON');

        this.addInput('input', new Classic.Input(socket, 'input'));
        this.addInput('vars', new Classic.Input(socket, 'vars'));
        this.addOutput('result', new Classic.Output(socket, 'Result'));
    }
}


export function createNode(itemType: ToolboxItemType): Classic.Node {
    switch (itemType) {
        case ToolboxItemType.Kusto:
            return new KustoNode();
        case ToolboxItemType.LLM:
            return new LlmNode();
        case ToolboxItemType.JSON:
            return new JsonNode();
        default:
            throw new Error(`Unknown item type: ${itemType}`);
    }
}