import * as fs from 'fs';
import * as path from 'path';

export default function main(isSample: boolean) {
    const inputPath = path.join(__dirname, isSample ? 'sample_input.txt' : 'input.txt');
    const data = fs.readFileSync(inputPath, 'utf8');
    let graph = data.trim().split('\n');
    const rowLen = graph.length;
    const colLen = graph[0].length;
    const possibleNeighbors = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    const isValidLocation = (x: number, y: number): boolean => (x >= 0 && x < rowLen && y >= 0 && y < colLen);

    const isAccessible = (x: number, y: number): boolean => {
        let filledNeighbors = 0;

        for (const neighborNode of possibleNeighbors) {
            const [nX, nY] = [x + neighborNode[0], y + neighborNode[1]];

            if (isValidLocation(nX, nY) && graph[nX][nY] === '@') {
                filledNeighbors++;
                
                if (filledNeighbors >= 4) {
                    return false;
                }
            }
        }

        return true;
    };

    const findAccessibleNodes = (): number => {
        let accessibleNodes = 0;
        
        for (let i = 0; i < rowLen; i++) {
            for (let j = 0; j < colLen; j++) {
                const val = graph[i][j];
                if (val === '@' && isAccessible(i, j)) {
                    accessibleNodes++;
                }
            }
        }

        return accessibleNodes;
    };

    const findAccessibleNodesRecursive = (prevAccessibleNodes: number): number => {
        let accessibleNodes = 0;
        let removableNodes = [];

        for (let i = 0; i < rowLen; i++) {
            for (let j = 0; j < colLen; j++) {
                const val = graph[i][j];
                if (val === '@' && isAccessible(i, j)) {
                    removableNodes.push([i, j]);
                    accessibleNodes++;
                }
            }
        }

        for (const [x, y] of removableNodes) {
            graph[x] = graph[x].substring(0, y) + '.' + graph[x].substring(y + 1);
        }

        return accessibleNodes === 0 ? prevAccessibleNodes : findAccessibleNodesRecursive(accessibleNodes + prevAccessibleNodes);
    };

    console.log(`Part 1 Result: ${findAccessibleNodes()}`);
    console.log(`Part 2 Result: ${findAccessibleNodesRecursive(0)}`);
}