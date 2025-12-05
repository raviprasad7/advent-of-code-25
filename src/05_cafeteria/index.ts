import * as fs from 'fs';
import * as path from 'path';

export default function main(isSample: boolean) {
    const inputPath = path.join(__dirname, isSample ? 'sample_input.txt' : 'input.txt');
    const data = fs.readFileSync(inputPath, 'utf8');
    const [freshIngredientRange, ingredientIdsStr] = data.split('\n\n').map(x => x.split('\n'));

    const ingredientIds = ingredientIdsStr.map(Number);

    const sortedRange = freshIngredientRange.map(range => range.split('-').map(Number)).sort((x, y) => x[0] - y[0]);
    const optimizedRange = [sortedRange[0]];

    for (let i = 1; i < sortedRange.length; i++) {
        const [start, end] = sortedRange[i];
        const last = optimizedRange[optimizedRange.length - 1];

        if (start <= last[1]) {
            last[1] = Math.max(end, last[1]);
        } else {
            optimizedRange.push([start, end]);
        }
    }

    let part1Result = 0;

    for (const id of ingredientIds) {
        for (const [start, end] of optimizedRange) {
            if (id < start || id > end) {
                continue;
            }
            if (id >= start && id <= end) {
                part1Result++;
            }
        }
    }

    let part2Result = 0;

    for (const [start, end] of optimizedRange) {
        part2Result += end - start + 1;
    }

    console.log(`Part 1 Result: ${part1Result}`);
    console.log(`Part 2 Result: ${part2Result}`);
}