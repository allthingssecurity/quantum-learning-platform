
import type { QiskitResult } from '../types';

/**
 * Generates a probabilistic distribution of measurement counts.
 * @param targetProbabilities An object where keys are quantum states (e.g., '00', '11')
 *   and values are their ideal probabilities (should sum to 1).
 * @param shots The total number of simulated measurements.
 * @param noiseLevel The fraction of shots to be distributed as noise.
 * @returns A QiskitResult object with the generated counts.
 */
const generateProbabilisticCounts = (
  targetProbabilities: { [key: string]: number },
  shots: number = 1024,
  noiseLevel: number = 0.05
): QiskitResult => {
  const counts: { [key: string]: number } = {};
  const idealShots = shots * (1 - noiseLevel);
  const noiseShots = shots - idealShots;

  // Distribute ideal shots
  for (const state in targetProbabilities) {
    counts[state] = Math.round(idealShots * targetProbabilities[state]);
  }
  
  // Adjust for rounding errors to match idealShots total
  let currentTotal = Object.values(counts).reduce((sum, val) => sum + val, 0);
  let diff = Math.round(idealShots) - currentTotal;
  if(diff !== 0 && Object.keys(counts).length > 0) {
      const firstState = Object.keys(counts)[0];
      counts[firstState] += diff;
  }

  // Distribute noise shots
  // In a real scenario, noise has patterns. Here we simplify by distributing it randomly.
  const possibleStates = Object.keys(targetProbabilities);
  // Add some potential wrong states for more realistic noise
  if (possibleStates.length > 0) {
      const numQubits = possibleStates[0].length;
      for(let i=0; i < (1 << numQubits); i++) {
          const state = i.toString(2).padStart(numQubits, '0');
          if(!counts[state]) counts[state] = 0;
      }
  }

  const allPossibleStates = Object.keys(counts);
  for(let i=0; i<noiseShots; i++) {
      const noisyState = allPossibleStates[Math.floor(Math.random() * allPossibleStates.length)];
      counts[noisyState] = (counts[noisyState] || 0) + 1;
  }
  
  // Clean up states with zero counts
  for(const state in counts) {
      if(counts[state] === 0) delete counts[state];
  }

  return { counts };
};


// This is a mock service to simulate the behavior of a Qiskit WASM module.
// It inspects the code for keywords to return pre-defined results.

export const runCircuit = (code: string): Promise<QiskitResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Advanced
      if (code.includes('def c_amod15')) { // Shor's algorithm
        resolve(generateProbabilisticCounts({ '000': 0.25, '010': 0.25, '100': 0.25, '110': 0.25 }, 1024, 0.1));
      } else if (code.includes('syndrome')) { // QEC
        // After correction, the initial |1> state should be restored
        resolve(generateProbabilisticCounts({ '001': 1.0 }, 1024, 0.08));
      } else if (code.includes('SIMULATOR: statevector') && code.includes('qft')) {
        // QFT example - statevector is deterministic
        resolve({
          statevector: [
            "0.354", "-0.25-0.25j", "-0.354j", "0.25-0.25j",
            "-0.354", "0.25+0.25j", "0.354j", "-0.25+0.25j",
          ],
        });
      } else if (code.includes('qc.cz(0, 1)')) {
        // Grover's algorithm
        resolve(generateProbabilisticCounts({ '11': 1.0 }, 1024, 0.04));
      } 
      // Intermediate
      else if (code.includes('secret_string')) { // Bernstein-Vazirani
        const match = code.match(/secret_string = '(\d+)'/);
        const secret = match ? match[1] : '10110';
        resolve(generateProbabilisticCounts({ [secret]: 1.0 }, 1024, 0.02));
      }
       else if (code.includes('qc.x(2).c_if')) {
        // Teleportation - we prepared |+> state, so we expect a 50/50 mix
        resolve(generateProbabilisticCounts({ '001': 0.25, '011': 0.25, '101': 0.25, '111': 0.25 }, 1024, 0.15));
      } else if (code.includes('qc.cx(0, 2)') || (code.includes('n = 2') && code.includes('Oracle'))) {
        // Deutsch-Jozsa (Balanced)
        resolve(generateProbabilisticCounts({ '11': 1.0 }, 1024, 0.03));
      } 
      // Beginner
      else if (code.includes('qc.cx(0, 1)')) {
        // Entanglement (Bell State)
        resolve(generateProbabilisticCounts({ '00': 0.5, '11': 0.5 }, 1024, 0.05));
      } else if (code.includes('qc.h(0)')) {
        // Superposition
        resolve(generateProbabilisticCounts({ '0': 0.5, '1': 0.5 }, 1024, 0.02));
      } else if (code.includes('qc.x(0)')) {
        // Pauli-X gate
        resolve(generateProbabilisticCounts({ '1': 1.0 }, 1024, 0.01));
      } else if (code.includes('qc.measure(0, 0)')) {
        // Hello World
        resolve(generateProbabilisticCounts({ '0': 1.0 }, 1024, 0.01));
      } else {
        resolve({ error: 'Could not determine the circuit type. Please use one of the provided examples.' });
      }
    }, 1500 + Math.random() * 1000); // Simulate execution time
  });
};