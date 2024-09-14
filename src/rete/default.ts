import { ClassicPreset as Classic, GetSchemes, NodeEditor } from 'rete';

import { Area2D, AreaPlugin } from 'rete-area-plugin';
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from 'rete-connection-plugin';
import {
  ReactPlugin,
  ReactArea2D,
  Presets as ReactPresets,
} from 'rete-react-plugin';
import { createRoot } from 'react-dom/client';

import {
  ContextMenuPlugin,
  ContextMenuExtra,
  Presets as ContextMenuPresets,
} from 'rete-context-menu-plugin';

type Node = NumberNode | AddNode;
type Conn =
  | Connection<NumberNode, AddNode>
  | Connection<AddNode, AddNode>
  | Connection<AddNode, NumberNode>;
type Schemes = GetSchemes<Node, Conn>;

class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> {}

class NumberNode extends Classic.Node {
  constructor(initial: number, change?: (value: number) => void) {
    super('Number');

    this.addOutput('value', new Classic.Output(socket, 'Number'));
    this.addControl(
      'value',
      new Classic.InputControl('number', { initial, change })
    );
  }
}

class AddNode extends Classic.Node {
  constructor() {
    super('Add');

    this.addInput('a', new Classic.Input(socket, 'A'));
    this.addInput('b', new Classic.Input(socket, 'B'));
    this.addOutput('value', new Classic.Output(socket, 'Number'));
    this.addControl(
      'result',
      new Classic.InputControl('number', { initial: 0, readonly: true })
    );
  }
}

class KustoNode extends Classic.Node {
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

class LlmNode extends Classic.Node {
  constructor() {
    super('Llm');

    this.addInput('prompt', new Classic.Input(socket, 'prompt'));
    this.addInput('params', new Classic.Input(socket, 'params'));
    this.addOutput('result', new Classic.Output(socket, 'Result'));
  }
}

type AreaExtra = Area2D<Schemes> | ReactArea2D<Schemes> | ContextMenuExtra;

const socket = new Classic.Socket('socket');

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const reactRender = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  const contextMenu = new ContextMenuPlugin<Schemes>({
    items: ContextMenuPresets.classic.setup([
      ['Number', () => new NumberNode(1)],
      ['Add', () => new AddNode()],
      ['Kusto', () => new KustoNode()],
      ['Llm', () => new LlmNode()],
    ]),
  });

  editor.use(area);

  area.use(reactRender);

  area.use(connection);
  area.use(contextMenu);

  connection.addPreset(ConnectionPresets.classic.setup());
  reactRender.addPreset(ReactPresets.classic.setup());
  reactRender.addPreset(ReactPresets.contextMenu.setup());

  const a = new NumberNode(1);
  const b = new NumberNode(1);
  const add = new AddNode();
  const kustoNode = new KustoNode();
  const llmNode = new LlmNode();

  await editor.addNode(a);
  await editor.addNode(b);
  await editor.addNode(add);
  await editor.addNode(kustoNode);
  await editor.addNode(llmNode);

  await editor.addConnection(new Connection(a, 'value', add, 'a'));
  await editor.addConnection(new Connection(b, 'value', add, 'b'));

  await area.nodeViews.get(a.id)?.translate(100, 100);
  await area.nodeViews.get(b.id)?.translate(100, 300);
  await area.nodeViews.get(add.id)?.translate(400, 150);
  await area.nodeViews.get(kustoNode.id)?.translate(650, 300);
  await area.nodeViews.get(llmNode.id)?.translate(650, 600);

  return {
    destroy: () => area.destroy(),
  };
}
