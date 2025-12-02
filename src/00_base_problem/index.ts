import * as fs from 'fs';
import * as path from 'path';

export default function main(isSample: boolean) {
    const inputPath = path.join(__dirname, isSample ? 'sample_input.txt' : 'input.txt');
    const data = fs.readFileSync(inputPath, 'utf8');
    
    console.log(data);
}