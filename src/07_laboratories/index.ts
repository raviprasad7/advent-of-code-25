import * as fs from 'fs';
import * as path from 'path';

export default function main(isSample: boolean) {
    const inputPath = path.join(__dirname, isSample ? 'sample_input.txt' : 'input.txt');
    const input = fs.readFileSync(inputPath, 'utf8').split('\n').map(line => line.split(''));
    const rowLen = input.length;
    const colLen = input[0].length;

    let startIdx = -1;

    let part1Result = 0;

    const activeBeams = Array(input[0].length).fill(false);

    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            if (input[i][j] === 'S') {
                activeBeams[j] = true;
                startIdx = j;
                break;
            }
            if (input[i][j] === '^' && activeBeams[j]) {
                part1Result++;
                activeBeams[j] = false;
                j > 0 && (activeBeams[j-1] = true);
                j < colLen - 1 && (activeBeams[j+1] = true);
            }
        }
    }

    let part2Result = 0;
    const memo: (number | null)[][] = Array.from({ length: rowLen }, () => 
        Array(colLen).fill(null)
    );

    const computePaths = (x: number, y: number): number => {
        if (y < 0 || y >= colLen) {
            return 0;
        }

        if (x === rowLen) {
            return 1;
        }

        if (memo[x][y] !== null) {
            return memo[x][y] as number;
        }

        let result: number;

        if (input[x][y] === '^') {
            result = computePaths(x + 1, y - 1) + computePaths(x + 1, y + 1);
        } else {
            result = computePaths(x + 1, y);
        }

        memo[x][y] = result;

        return result;
    };

    const startPos = input[0].findIndex(x => x === 'S');
    part2Result = computePaths(1, startPos);

    console.log(`Part 1 Result: ${part1Result}`);
    console.log(`Part 2 Result: ${part2Result}`);
}