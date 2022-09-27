import { isConstructorDeclaration } from "typescript";

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const visited = new Array(graph.length).fill(false);
    const paths: number[] = [];

    if (walk(graph, source, needle, visited, paths)) {
        return paths.concat(needle);
    }

    return null;
}

const walk = (
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
    visited: boolean[],
    paths: number[],
): any => {
    if (needle === source) return true;
    else if (visited[source]) return false;

    visited[source] = true;

    const row = graph[source];
    if (!row.length) return;

    paths.push(source);

    for (let i = 0; i < row.length; i++) {
        const { to } = row[i];
        const vertex: number = to;

        if (visited[vertex]) continue;

        if (walk(graph, vertex, needle, visited, paths)) return true;
    }

    paths.pop();

    return false;
};
