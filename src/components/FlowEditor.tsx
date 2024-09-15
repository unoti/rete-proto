import { createEditor } from '../rete/editorfactory';
import { useRete } from 'rete-react-plugin';

import EditorTools from './EditorTools';
import { AddItemFunction } from './ToolboxItem';
import { createNode } from './FlowNodes';
import { CreateEditorResult } from '../rete/default'; // I want to also import createEditor from here

// This is too many levels of indirection, I'm lost in a maze of their abstractions

export function FlowEditor() {
    // There's a bunch of stuff they're doing in index.ts to dynamically select a module using query params
    // looking for ?template=xxx.  This isn't something I want to do, but I haven't been able to make it work
    // which this which looks like a reasonable approach.
    // I wanted to do useRete<CreateEditorResult> but that doesn't work, and it never invokes my editor.
    const [ref, createEditorResult] = useRete(createEditor);
    const nodeEditor = createEditorResult?.editor;
    if (!nodeEditor) {
        throw Error('Did not receive nodeEditor instance from useRete');
    }

    const addItem: AddItemFunction = async (itemType) => {
        const node = createNode(itemType);
        await nodeEditor.addNode(node);
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