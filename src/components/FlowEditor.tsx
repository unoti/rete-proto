import { createEditor } from '../rete';
import { useRete } from 'rete-react-plugin';

import EditorTools from './EditorTools';
import { AddItemFunction } from './ToolboxItem';
import { createNode } from './FlowNodes';
import { globalEditor } from '../rete/default';

export function FlowEditor() {
    const [ref] = useRete(createEditor);

    const addItem: AddItemFunction = async (itemType) => {
        console.log(`'Add item: ${itemType}`);

        const node = createNode(itemType);
        await globalEditor.addNode(node);
    }

    return (
        <div className="flow-editor-outside">
            <header className="title-bar">Flow Prototype</header>
            <aside className="tools">
                <EditorTools onAddItem={addItem}/>
            </aside>
            <main className="work-area">
                <div ref={ref} className="rete flow-editor"></div>
            </main>
        </div>
    );
}