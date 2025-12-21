import * as fs from 'fs';
import * as path from 'path';

const OPERAND_LINE_REGEX = /(\d+)/g;
const OPERATOR_LINE_REGEX = /([\*\+])/g;

const computeResult =
    (operands: number[], operator: string): number =>
        operands.reduce((acc, operand) => operator === '+' ? operand + acc : operand * acc, operator === '+' ? 0 : 1);

export default function main(isSample: boolean) {
    const inputPath = path.join(__dirname, isSample ? 'sample_input.txt' : 'input.txt');
    const lines = fs.readFileSync(inputPath, 'utf8').split('\n');

    const numbers = lines.slice(0, lines.length - 1).map(input => input.match(OPERAND_LINE_REGEX)) || [];
    const operators = lines[lines.length - 1].match(OPERATOR_LINE_REGEX) || [];

    const areNumbersValid = numbers.reduce((acc, number) => acc && number!.length === operators.length, true);

    console.log(numbers, operators, areNumbersValid);
    if (!numbers.length || !operators.length || !areNumbersValid) {
        throw new Error('Invalid input');
    }


    let part1Result = 0;

    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const operands = [];

        for (let j = 0; j < numbers.length; j++) {
            operands.push(Number(numbers[j]![i]));
        }

        part1Result += computeResult(operands, operator);

        console.log(operator, operands);
    }

    let part2Result = 0;
    let currentOperatorIdx = 0;
    let currentOperands: number[] = [];
    const linesWithoutOperators = lines.slice(0, lines.length - 1);

    for (let i = 0; i <= linesWithoutOperators[0].length; i++) {
        const operand = linesWithoutOperators.reduce((acc, line) => acc + line.charAt(i), '').trim();
        if (operand !== '') {
            currentOperands.push(Number(operand));
        } else if (operand === '' && currentOperands.length) {
            const currentResult = computeResult(currentOperands, operators[currentOperatorIdx]);
            console.log(currentOperands, operators[currentOperatorIdx], currentResult);
            part2Result += currentResult;
            currentOperatorIdx++;
            currentOperands = [];

        }
    }

    console.log(`Part 1 Result: ${part1Result}`);
    console.log(`Part 2 Result: ${part2Result}`);
}