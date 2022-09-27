const walk = (
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
) => {
    const { x, y } = start,
        positions = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1],
        ];

    // Out of bounds
    if (
        start.x < 0 ||
        start.x > maze.length ||
        start.y < 0 ||
        start.y > maze[0].length
    )
        return false;
    console.log(maze);

    // Is a wall
    if (maze[x][y] === wall) return false;

    // Is the end
    if (x === end.x && y === end.y) {
        path.push(end);
        return true;
    }

    // Already seen
    if (seen[x][y]) return false;

    // Pre condition
    seen[x][y] = true;
    path.push(start);

    // Try all directions
    for (const [dx, dy] of positions) {
        const nextStep = { x: x + dx, y: y + dy };
        if (walk(maze, wall, nextStep, end, seen, path)) return true;
    }

    // Post Condition
    path.pop();

    return false;
};

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const row = maze.length,
        col = maze[0].length;
    const path: Point[] = [],
        seen: boolean[][] = Array.from({ length: row }, () =>
            new Array(col).fill(false),
        );

    walk(maze, wall, start, end, seen, path);

    return path;
}
