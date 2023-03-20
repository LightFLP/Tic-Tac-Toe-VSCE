export interface GameProps{ 
}

export interface GameState {
    history: Array<any>,
      stepNumber: number,
      xIsNext: boolean,
}

export interface BoardProps {
    squares: squares,
    onClick: (i:number) => void
}

export interface SquareProps {
    value: string | null,
    onClick: () => void
}

export type squares = Array<string | null> | null