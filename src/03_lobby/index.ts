import * as fs from 'fs';
import * as path from 'path';

export default function main(isSample: boolean) {
    const inputPath = path.join(__dirname, isSample ? 'sample_input.txt' : 'input.txt');
    const data = fs.readFileSync(inputPath, 'utf8');
    const banks = data.trim().split('\n');

    const findMaxJoltage = (banks: string[], noOfDigits: number): number => {
        let result = 0;
    
        for (const bank of banks) {
            const maxDigits = Array(noOfDigits).fill(-Infinity);
            const digitFlags = Array(bank.length).fill(false);
            let prevChosenDigitIndex = 0;

            for (let i = 0; i < noOfDigits; i++) {
                for (let j = prevChosenDigitIndex; j <= bank.length - noOfDigits + i; j++) {
                    const digit = Number(bank.charAt(j));

                    if (maxDigits[i] < digit && !digitFlags[j]) {
                        maxDigits[i] = digit;
                        digitFlags[j] = true;
                        prevChosenDigitIndex = j;
                    }
                }
            }
    
            result += Number(maxDigits.join(''));
        }

        return result;
    };

    console.log(`Part 1 Result: ${findMaxJoltage(banks, 2)}`);
    console.log(`Part 2 Result: ${findMaxJoltage(banks, 12)}`);
}