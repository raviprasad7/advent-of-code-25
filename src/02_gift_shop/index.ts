import * as fs from 'fs';
import * as path from 'path';

export default function main(isSample: boolean) {
    const inputPath = path.join(__dirname, isSample ? 'sample_input.txt' : 'input.txt');
    const data = fs.readFileSync(inputPath, 'utf8');
    const ranges = data.trim().split(',');

    const invalidIds: number[] = [];

    for (const range of ranges) {
        const [start, end] = range.split('-').map(Number);

        for (let i = start; i <= end; i++) {
            if (String(i).length % 2 === 1) {
                continue;
            }

            const str = String(i);
            const middleIndex = str.length / 2;

            const parts = [str.substring(0, middleIndex), str.substring(middleIndex)];
            if (parts[0] === parts[1]) {
                invalidIds.push(i);
            }
        }
    }

    console.log(`Part 1 Result: ${invalidIds.reduce((acc, id) => acc + id, 0)}`);

    invalidIds.length = 0;

    const checkIdIsValid = (id: number): boolean => {
        const mid = Math.floor(String(id).length / 2);
        const idStr = String(id);
        
        for (let i = 0; i < mid; i++) {
            const currentSequence = idStr.substring(0, i + 1);
            let isRepeatingSequenceFound = true;

            for (let j = i + 1; j < idStr.length; j += currentSequence.length) {
                const nextSequence = idStr.substring(j, j + currentSequence.length);

                if (nextSequence !== currentSequence) {
                    isRepeatingSequenceFound = false;
                    break;
                }
            }

            if (isRepeatingSequenceFound) {
                return false;
            }
        }
        return true;
    };

    for (const range of ranges) {
        const [start, end] = range.split('-').map(Number);

        for (let i = start; i <= end; i++) {
            const isValid = checkIdIsValid(i);
            if (!isValid) {
                invalidIds.push(i);
            }
        }
    }

    console.log(`Part 2 Result: ${invalidIds.reduce((acc, id) => acc + id, 0)}`);
}