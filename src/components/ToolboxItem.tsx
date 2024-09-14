export enum ToolboxItemType {
    LLM = 'LLM',
    Kusto = 'Kusto',
    JSON = 'JSON',
} 

// Callback function when the user wishes to add a toolbox item.
export type AddItemFunction = (item: ToolboxItemType) => void;

export type ToolboxItemProps = {
    itemType: ToolboxItemType;
    onAddItem: AddItemFunction;
};

export function ToolboxItem({ itemType, onAddItem }: ToolboxItemProps) {
    return (
        <button className="toolbox-item" onClick={() => onAddItem(itemType)}>{itemType}</button>
    );
}