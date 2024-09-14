import { ToolboxItem, ToolboxItemType, AddItemFunction } from "./ToolboxItem";

export type EditorToolsProps = {
    onAddItem: AddItemFunction,
}

export default function EditorTools({ onAddItem }: EditorToolsProps) {
    return (
        <div className="editor-tools">
          <ToolboxItem itemType={ToolboxItemType.LLM} onAddItem={onAddItem} />
          <ToolboxItem itemType={ToolboxItemType.Kusto} onAddItem={onAddItem} />
          <ToolboxItem itemType={ToolboxItemType.JSON} onAddItem={onAddItem} />
        </div>
    );
}