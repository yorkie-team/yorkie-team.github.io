export const KanbanDocumentStructure = `export type KanbanDoc = {
lists: Array<List>;
};

export type List = {
title: string;
cards: Array<Card>;
};

export type Card = {
title: string;
};
`;
