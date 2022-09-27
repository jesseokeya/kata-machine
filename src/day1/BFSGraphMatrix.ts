export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const visited = new Array(graph.length).fill(false);
    const paths = new Array(graph.length).fill(-1);

    visited[source] = true;
    const queue = [source];

    while (queue.length) {
        const vertex = queue.shift() as number;
        const row = graph[vertex];

        if (needle === vertex) break;

        for (let i = 0; i < row.length; i++) {
            const cell = row[i];
            if (cell === 0 || visited[i]) {
                continue;
            }

            visited[i] = true;
            paths[i] = vertex;
            queue.push(i);
        }
    }

    if (paths[needle] === -1) return null;

    const results = [];
    while (paths[needle] !== -1) {
        results.push(needle);
        needle = paths[needle];
    }

    return [source].concat(results.reverse());
}
