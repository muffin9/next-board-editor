export interface BoardType {
    id: string;
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    content: string;
    isCompleted: boolean;
}

export interface HeaderType {
    headerTitle: string;
    headerStartDate: Date;
    headerEndDate: Date;
    progress: number;
}

export interface Task {
    id: number;
    title: string;
    startDate: string | Date;
    endDate: string | Date;
    boards: BoardType[];
}
