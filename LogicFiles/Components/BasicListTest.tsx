import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Paper, SxProps, Theme } from "@mui/material";
import { isValidArray } from "../TypeScriptExtensions/ArrayExtensions";

interface IItemProps {
    id: string,
}

interface IListItemsProps<T extends IItemProps> {
    items: T[],
    onClickHandler: (ent: T) => void,
    toStringValue: (ent: T) => string
    maxHeight?: string,
}

export default function InsetList<T extends IItemProps>({
    items,
    onClickHandler,
    maxHeight,
    toStringValue
}: IListItemsProps<T>) {

    return (
        <Paper sx={{ maxHeight: maxHeight ?? "15rem", overflow: "auto" }}>
            <List
                aria-label="contacts"
            >
                {isValidArray(items) && (
                    <ul>
                        {items.map(i => (
                            <li key={i.id}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => onClickHandler(i)}>
                                        <ListItemText primary={toStringValue(i)}/>
                                    </ListItemButton>
                                </ListItem>
                            </li>
                        ))}
                    </ul>
                )}
            </List>
        </Paper>
    );
}
