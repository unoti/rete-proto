import { createEditor } from '../rete';
import { useRete } from 'rete-react-plugin';

export function FlowEditor() {
    const [ref] = useRete(createEditor);

    return (
        <div className="flow-editor-outside">
            <header className="title-bar">Flow Prototype</header>
            <aside className="tools">Tools</aside>
            <main className="work-area">
                <div ref={ref} className="rete flow-editor"></div>
            </main>
        </div>
    );
}