import * as fs from 'fs';
import * as path from 'path';

export default function main(isSample: boolean) {
    const inputPath = path.join(__dirname, isSample ? 'sample_input.txt' : 'input.txt');
    const data = fs.readFileSync(inputPath, 'utf8');
    
    const rotations = data.trim().split('\n');

    let currentPos = 50;
    let result = 0;

    for (const rotation of rotations) {
        const direction = rotation.charAt(0);
        const originalDistance = parseInt(rotation.substring(1));
        const distance = originalDistance % 100;
        const rotationsThroughZero = Math.floor((originalDistance - 1) / 100);

        if (direction === 'L') {
            currentPos -= distance;
        } else if (direction === 'R') {
            currentPos += distance;
        }

        if (currentPos === 0) {
            result++;
        } else if (currentPos < 0) {
            (currentPos + distance > 0) && (result++);
            currentPos = 100 - Math.abs(currentPos);
        } else if (currentPos > 99) {
            currentPos = currentPos - 100;
            result++;
        }

        if (rotationsThroughZero > 0) {
            result += rotationsThroughZero;
        }
    }

    console.log(`Result: ${result}`);
}