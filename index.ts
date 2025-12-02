import * as fs from 'fs';
import * as path from 'path';

const cmdArgs = process.argv;
const userInput = cmdArgs.slice(2);
const baseDir = path.join(__dirname, 'src');

function findPathByPrefix (baseDir: string, prefix: string): string | null {
    const entries = fs.readdirSync(baseDir, { withFileTypes: true });

    const match = entries.find(entry => entry.name.startsWith(prefix));
    if (!match) return null;

    return path.join(baseDir, match.name);
}

async function runProblem() {
    let problemNumber = userInput[0] || '';
    const isSample = userInput.includes('--sample');
    if (problemNumber.length) {
        if (problemNumber.length === 1) {
            problemNumber = `0${problemNumber}`;
        }
        console.log(`Running problem ${problemNumber}`);
    
        const problemPath = findPathByPrefix(baseDir, problemNumber);
    
        if (!problemPath) {
            console.error(`Problem ${problemNumber} not found`);
            process.exit(1);
        }
    
        const indexFile = path.join(problemPath, 'index.ts');
        if (!fs.existsSync(indexFile)) {
            console.error(`Index file not found for problem ${problemNumber}`);
            process.exit(1);
        }
    
        const module = await import(indexFile);
        module.default(isSample);
    }
}

runProblem();
