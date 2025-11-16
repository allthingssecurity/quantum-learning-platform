import type { LessonSection, Slide } from './types';

export const LESSONS: LessonSection[] = [
  {
    category: 'Beginner',
    lessons: [
      {
        id: 'beginner-1',
        title: 'Hello, Quantum World!',
        difficulty: 'Beginner',
        concept: 'Creating a simple quantum circuit with one qubit and measuring it.',
        description: 'Your first quantum circuit! This example creates a circuit with a single qubit. By default, a qubit is initialized to the |0⟩ state. We then measure it. Since no operations were applied, it should always collapse to 0.',
        theory: 'In classical computing, a bit is the smallest unit of information and can be either 0 or 1. In quantum computing, the equivalent is a qubit. A qubit can exist in a state of |0⟩, |1⟩, or a superposition of both. When a qubit is measured, its superposition collapses to one of the definite states, |0⟩ or |1⟩, with a certain probability. This circuit is the simplest possible: initialize and measure. It serves as the "Hello, World!" of quantum programming.',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer

# Create a quantum circuit with one qubit and one classical bit
# The qubit holds the quantum information, the classical bit stores the measurement result
qc = QuantumCircuit(1, 1)

# Measure qubit 0 and store the result in classical bit 0
qc.measure(0, 0)

# Execute the circuit on a simulator
`,
      },
      {
        id: 'beginner-2',
        title: 'The Not Gate (Pauli-X)',
        difficulty: 'Beginner',
        concept: 'Using the Pauli-X gate to flip a qubit state from |0⟩ to |1⟩.',
        description: 'The X gate is the quantum equivalent of a classical NOT gate. It flips the state of a qubit. If the qubit is in state |0⟩, the X gate changes it to |1⟩, and vice-versa. We will apply it to a qubit initialized in the |0⟩ state and expect to measure |1⟩.',
        theory: 'Quantum gates are operations that alter the state of qubits. The Pauli-X gate is one of the most fundamental. It represents a rotation of 180 degrees around the X-axis of the Bloch sphere. This rotation effectively swaps the probabilities of measuring |0⟩ and |1⟩. Applying an X gate twice returns the qubit to its original state (X * X = I, where I is the identity gate).',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer

qc = QuantumCircuit(1, 1)

# Apply the Pauli-X gate to qubit 0
qc.x(0)

# Measure the qubit
qc.measure(0, 0)

# Execute and check the result
`,
      },
      {
        id: 'beginner-3',
        title: 'Superposition (H Gate)',
        difficulty: 'Beginner',
        concept: 'Using the Hadamard (H) gate to create an equal superposition.',
        description: 'A fundamental concept in quantum mechanics. A qubit can be in a combination of |0⟩ and |1⟩ states simultaneously. The Hadamard gate puts a qubit into an equal superposition. When measured, it has a 50% chance of collapsing to 0 and a 50% chance of collapsing to 1.',
        theory: 'Superposition allows a qubit to explore multiple possibilities at once. The Hadamard (H) gate is the primary tool for creating this state. It transforms |0⟩ into ( |0⟩ + |1⟩ ) / √2 and |1⟩ into ( |0⟩ - |1⟩ ) / √2. When you measure a qubit in this state, the Born rule states that the probability of measuring a particular outcome is the square of the amplitude of that state. For ( |0⟩ + |1⟩ ) / √2, the amplitude of both |0⟩ and |1⟩ is 1/√2, so the probability for each is (1/√2)² = 1/2.',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer

qc = QuantumCircuit(1, 1)

# Apply the Hadamard gate to qubit 0
qc.h(0)

# Measure the qubit
qc.measure(0, 0)

# Execute (run this multiple times to see the probabilistic outcome)
`,
      },
      {
        id: 'beginner-4',
        title: 'Entanglement (Bell State)',
        difficulty: 'Beginner',
        concept: 'Creating a Bell State using Hadamard and CNOT gates.',
        description: 'Entanglement is when two or more qubits are linked in such a way that their fates are intertwined, no matter how far apart they are. This circuit creates a Bell state, a simple form of entanglement. The measurement outcomes of the two qubits will always be correlated (either both 0 or both 1).',
        theory: 'Entanglement, what Einstein called "spooky action at a distance," is a key resource in quantum computing. The most common way to create it is with a Hadamard gate followed by a Controlled-NOT (CNOT) gate. First, we put one qubit (the control) in superposition. Then, the CNOT gate flips the second qubit (the target) *only if* the control qubit is in the |1⟩ state. The resulting state, ( |00⟩ + |11⟩ ) / √2, means that if you measure one qubit to be 0, you instantly know the other is also 0, and vice-versa, even if they are light-years apart.',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer

qc = QuantumCircuit(2, 2)

# Put qubit 0 in superposition
qc.h(0)

# Apply a Controlled-NOT (CNOT) gate
# This entangles qubit 0 (control) and qubit 1 (target)
qc.cx(0, 1)

# Measure both qubits
qc.measure([0, 1], [0, 1])

# Execute
`,
      },
    ],
  },
  {
    category: 'Intermediate',
    lessons: [
        {
        id: 'intermediate-1',
        title: 'Bernstein-Vazirani Algorithm',
        difficulty: 'Intermediate',
        concept: "Finding a hidden binary string 's' with a single quantum query.",
        description: 'The Bernstein-Vazirani algorithm is a perfect example of quantum advantage. Imagine a function f(x) = s · x (mod 2), where s is a secret binary string. Classically, to find s, you would need to query the function N times (for a string of length N). This quantum algorithm can find s in just a single query!',
        theory: 'This algorithm works by leveraging phase kickback and interference. We start by putting all input qubits into superposition with Hadamard gates. The quantum oracle, which implements the function f(x), cleverly encodes the secret string \'s\' into the relative phases of the qubits. A final set of Hadamard gates transforms these phase differences back into measurable bit values, directly revealing the secret string \'s\'. It demonstrates how quantum computers can solve certain problems dramatically faster than classical ones by evaluating a function on all possible inputs at once.',
        initialCode: `from qiskit import QuantumCircuit, Aer, execute

# The secret string 's' we want to find
secret_string = '10110'
n = len(secret_string)

# Create a circuit with n+1 qubits and n classical bits
qc = QuantumCircuit(n + 1, n)

# Apply H-gates to the first n qubits
qc.h(range(n))

# Initialize the last qubit to |->
qc.x(n)
qc.h(n)
qc.barrier()

# Oracle: Apply CNOT for each '1' in the secret string
for i, char in enumerate(reversed(secret_string)):
    if char == '1':
        qc.cx(i, n)
qc.barrier()

# Apply H-gates again
qc.h(range(n))

# Measure the first n qubits
qc.measure(range(n), range(n))

# Execute
`,
      },
      {
        id: 'intermediate-2',
        title: 'Deutsch-Jozsa Algorithm',
        difficulty: 'Intermediate',
        concept: "Demonstrating quantum parallelism to classify a function.",
        description: 'This is one of the first examples of a quantum algorithm that is exponentially faster than any classical algorithm. It determines if a given function is "constant" (always returns 0 or always returns 1) or "balanced" (returns 0 for half of the inputs and 1 for the other half) with just one measurement.',
        theory: 'The Deutsch-Jozsa algorithm contrasts classical and quantum computation. Classically, to be sure if a function is constant or balanced, you might need to check up to 2^(n-1) + 1 inputs in the worst case. Quantumly, we use Hadamard gates to prepare a superposition of all possible inputs. The oracle then acts on this superposition, and due to phase kickback, the phase of the output qubit is flipped based on the function\'s result. A final set of Hadamard gates causes the inputs to interfere. If the function is constant, they interfere constructively to yield |00...0⟩. If balanced, they interfere in other ways, yielding a non-zero result.',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer

# Oracle for a balanced function (e.g., f(x) = x_0) on 2 qubits
n = 2
qc = QuantumCircuit(n + 1, n)

# Initialize qubits
qc.x(n)
qc.h(range(n + 1))
qc.barrier()

# Oracle
qc.cx(0, n)
qc.barrier()

# Final Hadamard gates
qc.h(range(n))

# Measure
qc.measure(range(n), range(n))

# Execute
`,
      },
      {
        id: 'intermediate-3',
        title: 'Quantum Teleportation',
        difficulty: 'Intermediate',
        concept: 'Teleporting the state of one qubit to another using entanglement.',
        description: 'Quantum teleportation is a process by which the state of a qubit is transmitted from one location to another, without sending the qubit itself. It uses a pre-shared entangled pair of qubits and classical communication. This circuit teleports the state of q0 to q2.',
        theory: 'Teleportation does not violate the no-cloning theorem because the original qubit\'s state is destroyed in the process. The protocol requires three qubits: the source qubit to be teleported (q0), and an entangled pair (q1, q2), shared between the sender and receiver. The sender performs a set of operations on their source qubit and their half of the entangled pair (q1), then measures them. They send these two classical bits of information to the receiver. The receiver then performs one of four possible operations on their half of the entangled pair (q2) based on the classical bits they received. After this correction, q2 will be in the exact state that q0 was originally in.',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer
import numpy as np

# Create a circuit to define the state to teleport (e.g., a superposition)
qc = QuantumCircuit(3, 3)
qc.h(0) # The state of qubit 0 will be teleported
qc.barrier()

# Create entanglement between q1 and q2
qc.h(1)
qc.cx(1, 2)
qc.barrier()

# Teleportation protocol: sender's side
qc.cx(0, 1)
qc.h(0)
qc.barrier()
qc.measure([0, 1], [0, 1])

# Receiver's side: Apply corrections on q2 based on measurement
qc.barrier()
qc.x(2).c_if(1, 1) # if classical bit 1 is 1, apply X
qc.z(2).c_if(0, 1) # if classical bit 0 is 1, apply Z

# To verify, we would normally apply the inverse of the initial operation and measure 0.
# For simplicity, we just measure the final state of q2.
qc.measure(2, 2)

# The result of the third classical bit should match the teleported state's probability.
`,
      },
    ],
  },
  {
    category: 'Advanced',
    lessons: [
        {
        id: 'advanced-1',
        title: 'Quantum Fourier Transform',
        difficulty: 'Advanced',
        concept: 'The quantum equivalent of the discrete Fourier transform.',
        description: 'The Quantum Fourier Transform (QFT) is a key component of many important quantum algorithms, such as Shor\'s algorithm for factoring. It maps quantum states from the computational basis to the Fourier basis, which is essential for finding periodicity in a function.',
        theory: 'The QFT is a linear transformation on qubits. While the classical Fast Fourier Transform (FFT) on 2^n inputs takes O(n * 2^n) time, the QFT circuit can be implemented with only O(n^2) gates. This exponential speedup is fundamental. The QFT circuit is built from Hadamard gates and controlled phase rotation gates. It does not, however, allow for the efficient reading of all amplitudes in the Fourier basis. Its power comes from its use as a subroutine within larger algorithms where specific properties of the Fourier transformed state can be sampled or used to affect other qubits.',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer
import numpy as np

# Create a 3-qubit QFT circuit
n = 3
qc = QuantumCircuit(n)

# Let's create an initial state, e.g., |5> = |101>
qc.x(0)
qc.x(2)
qc.barrier()

# Apply QFT
def qft(circuit, n):
    for qubit in range(n):
        circuit.h(qubit)
        for control_qubit in range(qubit + 1, n):
            circuit.cp(np.pi / 2**(control_qubit - qubit), control_qubit, qubit)
    circuit.barrier()
    # Swap qubits for correct order
    for i in range(n//2):
        circuit.swap(i, n-i-1)

qft(qc, n)

# This circuit doesn't measure, it just creates the QFT state.
# We'll use a statevector simulator to see the result.
# SIMULATOR: statevector
`,
      },
      {
        id: 'advanced-2',
        title: "Grover's Search Algorithm",
        difficulty: 'Advanced',
        concept: 'A quantum search algorithm that provides a quadratic speedup over classical search.',
        description: "Grover's algorithm finds a specific item in an unsorted database. While a classical computer would need to check N/2 items on average, Grover's algorithm can do it in about sqrt(N) steps. This example searches for the state |11⟩.",
        theory: 'Grover\'s algorithm works by "amplitude amplification". It starts by putting all qubits in a uniform superposition. Then, it iteratively applies two main steps: 1) The Oracle: This special gate recognizes the "marked" or "searched-for" item and flips its phase (e.g., from + to -). 2) The Diffuser: This operation reflects the state of all qubits about the average amplitude. The effect is that the amplitude of the marked item increases, while the amplitudes of all other items decrease. After about π/4 * sqrt(N) iterations, the probability of measuring the marked item is nearly 100%.',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer

# 2-qubit Grover's algorithm searching for |11>
qc = QuantumCircuit(2, 2)

# Initialization: create uniform superposition
qc.h([0, 1])
qc.barrier()

# --- Oracle for |11> ---
# This flips the phase of |11> and leaves others unchanged
qc.cz(0, 1) # Controlled-Z gate
qc.barrier()

# --- Diffuser ---
# This amplifies the amplitude of the marked item
qc.h([0, 1])
qc.x([0, 1])
qc.cz(0, 1)
qc.x([0, 1])
qc.h([0, 1])
# --- End Diffuser ---

# Measurement
qc.measure([0, 1], [0, 1])

# Execute
`,
      },
      {
        id: 'advanced-3',
        title: 'Shor\'s Algorithm (Concept)',
        difficulty: 'Advanced',
        concept: 'Using Quantum Phase Estimation to find the prime factors of an integer.',
        description: "Shor's algorithm is arguably the most famous quantum algorithm, as it can factor large numbers exponentially faster than the best-known classical algorithms. This has huge implications for cryptography. This is a conceptual implementation focusing on the core quantum part: period-finding.",
        theory: 'Factoring a number N can be reduced to finding the "period" (r) of the function f(x) = a^x mod N for a random number \'a\'. While calculating this function is easy, finding its period is classically very hard. Shor\'s algorithm uses the Quantum Fourier Transform (QFT) to find this period efficiently. The algorithm prepares a superposition of inputs, computes f(x) for all of them, and then uses the inverse QFT to transform the state. Measuring the output gives a high probability of revealing the period \'r\', which can then be used to find the factors of N.',
        initialCode: `from qiskit import QuantumCircuit, Aer, execute
import numpy as np

# Shor's algorithm for N=15, a=7. The period is 4.
# We need a counting register (t) and a target register.
t = 3 # number of counting qubits
n = 4 # number of target qubits

# Circuit setup
qc = QuantumCircuit(t + n, t)

# Initialize counting qubits in superposition
qc.h(range(t))

# Initialize target qubit to |1>
qc.x(t) 
qc.barrier()

# Controlled modular exponentiation (oracle)
# This is a simplified, hard-coded version for N=15, a=7
def c_amod15(a, power):
    U = QuantumCircuit(n)
    for _ in range(power):
        U.swap(2, 3)
        U.swap(1, 2)
        U.swap(0, 1)
        for q in range(n):
            U.x(q)
    return U.to_gate(label=f'{a}^{power} mod 15').control()

for q in range(t):
    qc.append(c_amod15(7, 2**q), [q] + list(range(t, t+n)))
qc.barrier()

# Inverse QFT
def qft_inv(circuit, n):
    for i in range(n//2):
        circuit.swap(i, n-i-1)
    for qubit in reversed(range(n)):
        for control_qubit in reversed(range(qubit + 1, n)):
            circuit.cp(-np.pi / 2**(control_qubit - qubit), control_qubit, qubit)
        circuit.h(qubit)

qft_inv(qc, t)
qc.barrier()

# Measure counting qubits
qc.measure(range(t), range(t))
# The most likely outcomes (000, 010, 100, 110) correspond to s/r = 0/4, 2/4, 4/4, 6/4
`,
      },
        {
        id: 'advanced-4',
        title: 'Quantum Error Correction',
        difficulty: 'Advanced',
        concept: 'Using a 3-qubit bit-flip code to protect a qubit from noise.',
        description: 'Qubits are fragile and susceptible to noise, which can corrupt a quantum computation. Quantum Error Correction (QEC) is a set of techniques to protect quantum information. This example implements a simple 3-qubit code that can detect and correct a single bit-flip (X gate) error.',
        theory: 'The no-cloning theorem prevents us from simply making copies of a qubit to protect it. Instead, QEC encodes the information of a single logical qubit into a highly entangled state of multiple physical qubits. The 3-qubit bit-flip code encodes |ψ⟩ = α|0⟩ + β|1⟩ into |ψ_L⟩ = α|000⟩ + β|111⟩. If a bit-flip error occurs on one qubit (e.g., |000⟩ -> |100⟩), we can detect which qubit flipped without measuring (and thus destroying) the logical state itself. We use two ancillary qubits to measure "syndromes" which tell us the error location. We can then apply a corrective X gate to that qubit to restore the original encoded state.',
        initialCode: `from qiskit import QuantumCircuit, execute, Aer

# -- ENCODING --
# Encode the state of qubit 0 into qubits 0, 1, 2
qc = QuantumCircuit(5, 3) # 3 data qubits, 2 syndrome qubits

# Prepare initial state to protect, e.g., |1>
qc.x(0)
qc.barrier()

# Encoder
qc.cx(0, 1)
qc.cx(0, 2)
qc.barrier()

# -- ERROR --
# Let's simulate a bit-flip error on qubit 1
qc.x(1)
qc.barrier()

# -- DECODING / CORRECTION --
# Error detection (syndrome measurement)
qc.cx(0, 3)
qc.cx(1, 3)
qc.cx(0, 4)
qc.cx(2, 4)

# Correction logic based on syndrome would go here.
# For this example, we proceed to measure the logical state.
# To "decode", we can reverse the encoding process.
qc.cx(0, 2)
qc.cx(0, 1)

# A Toffoli gate (ccx) is needed for a full correction circuit,
# but for this example, let's just measure the main qubit.
qc.measure(0, 0)
`,
      },
    ],
  },
];

export const INTRO_SLIDES: Slide[] = [
  // Part I: The Classical Foundation
  {
    section: "Part I: The Classical Foundation",
    title: "The Quantum Universe: A Learner's Journey",
    icon: 'RoadmapIcon',
    content: "Welcome. You are about to embark on a journey that will challenge your perception of reality, information, and computation itself.\n\nBefore we dive into the quantum realm, we must first understand the world upon which it is built: the classical world of bits and logic."
  },
  {
    section: "Part I: The Classical Foundation",
    title: "What is Information?",
    icon: 'BrainIcon',
    content: "At its heart, information is the resolution of uncertainty. A classical bit, the fundamental unit of information, is the answer to a single yes-or-no question.\n\nIs the light on? Yes (1) or No (0).\nIs the door open? Yes (1) or No (0).\n\nEvery piece of classical data—from this text to a high-definition video—is simply a vast collection of these definite, binary answers."
  },
  {
    section: "Part I: The Classical Foundation",
    title: "The Language of Logic",
    icon: 'CodeIcon',
    content: "To process these bits, we use logic gates. These are simple operations that form the building blocks of all classical computation.\n\n- **NOT** flips a bit (0 becomes 1, 1 becomes 0).\n- **AND** outputs 1 only if both input bits are 1.\n- **OR** outputs 1 if at least one input bit is 1.\n\nFrom these simple rules, we can build circuits that perform any calculation imaginable."
  },
  {
    section: "Part I: The Classical Foundation",
    title: "The Turing Machine: A Universal Recipe",
    icon: 'HistoryIcon',
    content: "In 1936, Alan Turing conceptualized an abstract machine—a tape, a head, and a set of rules. This 'Turing Machine' was not a physical device, but an idea.\n\nIt proved that any computable problem could be solved by a machine following a finite set of simple instructions. This established the very definition of 'computation' and the theoretical limits of what any computer could ever hope to achieve."
  },
  {
    section: "Part I: The Classical Foundation",
    title: "The Transistor & Moore's Law",
    icon: 'QuantumChipIcon',
    content: "The abstract Turing Machine became a reality with the invention of the transistor. This tiny switch, which can be turned on (1) or off (0), is the physical manifestation of a bit.\n\nFor decades, Moore's Law predicted the doubling of transistors on a chip every two years. This exponential growth powered the digital revolution, making computers smaller, faster, and more powerful than ever imagined."
  },
  {
    section: "Part I: The Classical Foundation",
    title: "Hitting the Wall",
    icon: 'AtomIcon',
    content: "But this exponential march is coming to an end. As transistors shrink to the size of a few atoms, the predictable laws of classical physics break down.\n\nElectrons begin to exhibit bizarre quantum behaviors, like 'tunneling' through solid barriers they shouldn't be able to cross. The very physics that threatens to halt classical computing is the key to unlocking its successor."
  },
  // Part II: The Quantum Leap
  {
    section: "Part II: The Quantum Leap",
    title: "A New Kind of Physics",
    icon: 'BeakerIcon',
    content: "The quantum world is fundamentally different. It is not deterministic; it is probabilistic. It is not local; it is interconnected.\n\nIn 1981, physicist Richard Feynman realized that simulating this world on a classical computer was impossibly hard. His solution: \"Nature isn't classical, dammit, and if you want to make a simulation of nature, you'd better make it quantum mechanical.\""
  },
  {
    section: "Part II: The Quantum Leap",
    title: "Introducing the Qubit",
    icon: 'QuantumChipIcon',
    content: "The quantum equivalent of a bit is a qubit. Like a bit, it can be in the state |0⟩ or |1⟩. But it can also be in a **superposition** of both states at the same time.\n\nThink of a spinning coin. Before it lands, it's not definitively heads or tails—it's a blend of both possibilities. A qubit is like this spinning coin, existing in a rich continuum of states until it is measured."
  },
  {
    section: "Part II: The Quantum Leap",
    title: "The Bloch Sphere: A Qubit's World",
    icon: 'AtomIcon',
    animation: 'bloch',
    content: "We can visualize the state of a single qubit as a point on the surface of a sphere. The North Pole represents the definite state |0⟩, and the South Pole represents |1⟩.\n\nEvery other point on the surface represents a unique superposition of |0⟩ and |1⟩. This gives a single qubit access to an infinitely richer state space than a classical bit."
  },
  {
    section: "Part II: The Quantum Leap",
    title: "Principle 1: Superposition",
    icon: 'SuperpositionIcon',
    animation: 'superposition',
    content: "Superposition is the ability of a quantum system to be in multiple states at the same time.\n\nA qubit's state is described by a wave function, which assigns a complex number (an 'amplitude') to each possible outcome. When we measure, the probability of collapsing to a specific state is the square of the magnitude of its amplitude. This allows a quantum computer with N qubits to explore a space of 2^N possibilities simultaneously."
  },
  {
    section: "Part II: The Quantum Leap",
    title: "Principle 2: Entanglement",
    icon: 'EntanglementIcon',
    animation: 'entanglement',
    content: "Einstein famously called it 'spooky action at a distance.' Two or more qubits can become entangled, meaning their fates are intrinsically linked, no matter how far apart they are.\n\nIf you have an entangled pair and measure one qubit to be |0⟩, you instantly know, with 100% certainty, that its partner will also be |0⟩. This perfect correlation is a powerful resource that has no classical equivalent."
  },
  {
    section: "Part II: The Quantum Leap",
    title: "Principle 3: Interference",
    icon: 'InterferenceIcon',
    animation: 'interference',
    content: "Like waves in a pond, the probability waves of qubits can interfere with each other. \n\n**Constructive interference** increases the probability of a certain outcome, making the right answers stand out. \n\n**Destructive interference** decreases the probability of other outcomes, cancelling out the wrong answers.\n\nQuantum algorithms are essentially choreographing this interference to find a solution."
  },
  // Part III: Quantum in Action
  {
    section: "Part III: Quantum in Action",
    title: "Quantum Gates: Manipulating Reality",
    icon: 'CodeIcon',
    content: "If qubits are the 'what', quantum gates are the 'how'. Instead of flipping bits, quantum gates are precise operations that rotate the state vector of a qubit on the Bloch Sphere.\n\nEach gate is a carefully controlled pulse of energy (like a microwave or laser) that nudges the qubit from one superposition state to another. This is how we program a quantum computer."
  },
  {
    section: "Part III: Quantum in Action",
    title: "The Quantum Circuit",
    icon: 'CircuitIcon',
    animation: 'circuit',
    content: "Think of a quantum circuit as a musical score. The horizontal lines are your qubits, starting on the left and evolving over time to the right.\n\nThe symbols, or 'notes', we place on these lines are the quantum gates—X, H, CNOT—each performing a precise operation. At the very end, a measurement gate tells us the final state of our composition. This is the fundamental model for programming a quantum computer."
  },
  {
    section: "Part III: Quantum in Action",
    title: "Meet the Fundamental Gates",
    icon: 'CodeIcon',
    content: "A few key gates form the building blocks for any quantum algorithm:\n\n- **X-Gate (NOT):** Rotates the qubit by 180° around the X-axis, flipping |0⟩ to |1⟩ and vice-versa.\n- **H-Gate (Hadamard):** Rotates the qubit to a point on the equator of the Bloch sphere, creating an equal superposition of |0⟩ and |1⟩.\n- **CNOT-Gate (Controlled-NOT):** An entangling two-qubit gate. It flips the second (target) qubit ONLY if the first (control) qubit is |1⟩."
  },
  {
    section: "Part III: Quantum in Action",
    title: "The Measurement Problem",
    icon: 'BeakerIcon',
    content: "The act of observing a quantum system forces it to 'choose' a definite classical state. This is called the collapse of the wave function.\n\nBefore measurement, a qubit exists in a superposition of possibilities. After measurement, it is just a 0 or a 1. This means we cannot directly see the rich superposition state. The art of quantum algorithms is to manipulate the state so that when we do measure, the desired classical answer appears with very high probability."
  },
  {
    section: "Part III: Quantum in Action",
    title: "The Born Rule: A Probabilistic Universe",
    icon: 'BeakerIcon',
    content: "Why do we get a distribution of results? The Born rule, a fundamental postulate of quantum mechanics, states that the probability of measuring a particular outcome is the square of the magnitude of its amplitude.\n\nThis inherent randomness is not a flaw in our measurement devices; it appears to be a fundamental feature of the universe. Quantum computers don't give one answer; they give a probability distribution, which we sample by running the circuit many times ('shots')."
  },
  // Part IV: The Quantum Advantage
  {
    section: "Part IV: The Quantum Advantage",
    title: "What is Quantum Advantage?",
    icon: 'SparklesIcon',
    content: "Quantum advantage (or supremacy) is the point at which a quantum computer can solve a specific, useful problem that no classical computer could solve in any feasible amount of time.\n\nIt doesn't mean quantum computers are faster at everything (your laptop is better at email). It means for certain classes of problems, they operate in a fundamentally more efficient way."
  },
  {
    section: "Part IV: The Quantum Advantage",
    title: "Problem Class 1: Simulation",
    icon: 'BeakerIcon',
    content: "This was Feynman's original motivation. Simulating the behavior of complex molecules is incredibly hard for classical computers because they too are quantum systems.\n\nFor example, simulating caffeine would require a classical computer with more bits than there are atoms in the observable universe. A quantum computer, however, is a controllable quantum system that can be used to simulate another quantum system directly. This promises revolutions in drug discovery, battery technology, and material science."
  },
  {
    section: "Part IV: The Quantum Advantage",
    title: "Problem Class 2: Optimization",
    icon: 'BrainIcon',
    content: "Many of the world's hardest problems are optimization problems: finding the best solution from a staggering number of possibilities.\n\nExamples include logistics (the traveling salesman problem), financial modeling, and AI model training. Quantum algorithms like QAOA and VQE can explore this vast landscape of solutions in a more holistic way, using superposition and tunneling to find better solutions faster than classical methods."
  },
  {
    section: "Part IV: The Quantum Advantage",
    title: "Problem Class 3: Cryptography",
    icon: 'ShieldCheckIcon',
    content: "This is the most famous example. The security of the internet (RSA encryption) relies on the fact that it is classically very difficult to find the prime factors of large numbers.\n\nIn 1994, Peter Shor developed a quantum algorithm that can solve this factoring problem exponentially faster than any known classical algorithm. While today's quantum computers are too small and noisy to break RSA, Shor's algorithm proved that quantum computers could, in principle, disrupt global security."
  },
    {
    section: "Part IV: The Quantum Advantage",
    title: "Quantum vs. AI & ML",
    icon: 'SparklesIcon',
    content: "Quantum Computing is not a replacement for AI, but a potential accelerator for it. For Machine Learning, quantum algorithms could revolutionize optimization problems at the heart of model training.\n\nQuantum neural networks might learn patterns in data that are invisible to classical computers. The synergy between these two fields promises to be one of the most exciting frontiers of science."
  },
  // Part V: Nature's Quantum Engine
  {
    section: "Part V: Nature's Quantum Engine",
    title: "Nature's Head Start",
    icon: 'DnaIcon',
    content: "Long before humans conceived of qubits, nature was already exploiting the weirdness of quantum mechanics.\n\nLife itself seems to have found ways to use quantum effects to its advantage, solving problems with an efficiency that baffles classical explanation."
  },
  {
    section: "Part V: Nature's Quantum Engine",
    title: "Photosynthesis: A Quantum Search",
    icon: 'DnaIcon',
    content: "When a photon of light hits a leaf, its energy needs to find its way to a reaction center. It doesn't just try one path; it is believed to use superposition to explore all possible paths simultaneously.\n\nThrough quantum interference, it instantly identifies the most efficient route, achieving nearly 100% energy transfer efficiency. Life is performing a quantum search algorithm in every green leaf."
  },
  {
    section: "Part V: Nature's Quantum Engine",
    title: "Avian Navigation: A Quantum Compass",
    icon: 'DnaIcon',
    content: "How do birds navigate thousands of miles with pinpoint accuracy? A leading theory suggests they can 'see' the Earth's magnetic field. This is thought to be possible via a quantum process called the 'radical pair mechanism'.\n\nPhotons create entangled electron pairs in the bird's retina. The Earth's magnetic field affects how these electrons behave, which in turn affects a chemical reaction, creating a visual pattern that aligns with the planet's magnetic field. The bird has a built-in quantum sensor."
  },
  {
    section: "Part V: Nature's Quantum Engine",
    title: "The Riddle of Consciousness: Orch-OR",
    icon: 'BrainIcon',
    content: "Could the most profound mystery of all—human consciousness—be a quantum phenomenon? The highly speculative Orchestrated Objective Reduction (Orch-OR) theory, by physicist Sir Roger Penrose and anesthesiologist Stuart Hameroff, proposes just that.\n\nThey suggest that quantum computations occurring in protein structures called 'microtubules' inside our neurons could be the source of conscious awareness. While far from proven, it highlights how quantum mechanics forces us to reconsider the deepest questions of existence."
  },
  // Part VI: Building the Future
  {
    section: "Part VI: Building the Future",
    title: "The Great Enemy: Decoherence",
    icon: 'AtomIcon',
    content: "If quantum mechanics is so powerful, why don't we have quantum laptops yet? The primary obstacle is **decoherence**.\n\nQubits are unbelievably fragile. The slightest interaction with their environment—a stray magnetic field, a vibration, a tiny temperature fluctuation—can cause their delicate superposition to collapse, destroying the quantum information. This is like trying to compute on a soap bubble in the middle of a hurricane."
  },
  {
    section: "Part VI: Building the Future",
    title: "The NISQ Era",
    icon: 'NoiseIcon',
    animation: 'nisq',
    content: "We are currently in the Noisy Intermediate-Scale Quantum (NISQ) era. This means our processors have a significant number of qubits (50-100s), but they are 'noisy' and not yet fault-tolerant.\n\nThe challenge of this era is to find useful applications for these powerful but imperfect machines, pushing the boundaries of what's possible before full error correction is achieved."
  },
  {
    section: "Part VI: Building the Future",
    title: "The Hardware: Superconducting Qubits",
    icon: 'QuantumChipIcon',
    content: "The approach used by Google and IBM. These are tiny circuits of superconducting metal, cooled to temperatures colder than deep space (around 15 millikelvin) to minimize vibrations.\n\n**Pros:** They are fast and can be manufactured using existing semiconductor techniques.\n**Cons:** They are highly susceptible to decoherence and require massive, complex cryogenic refrigerators."
  },
  {
    section: "Part VI: Building the Future",
    title: "The Hardware: Trapped Ions",
    icon: 'QuantumChipIcon',
    content: "This approach uses individual atoms (ions) as qubits, suspended in a vacuum by electromagnetic fields. Lasers are used to manipulate their quantum states.\n\n**Pros:** The qubits are perfect, identical atoms and are extremely stable, with much longer coherence times than superconducting qubits.\n**Cons:** Gate operations are significantly slower, and scaling up to many entangled ions is a major challenge."
  },
  {
    section: "Part VI: Building the Future",
    title: "The Hardware: Other Contenders",
    icon: 'QuantumChipIcon',
    content: "The race is on, and many other technologies are being explored:\n\n- **Photonic Qubits:** Using individual particles of light. They are very resistant to decoherence but making them interact (for gates) is difficult.\n- **Topological Qubits:** A theoretical approach that would encode information in the 'braiding' of exotic particles, making them intrinsically robust to errors. The holy grail, but not yet realized.\n- **Neutral Atoms, Silicon Quantum Dots...** and more."
  },
  {
    section: "Part VI: Building the Future",
    title: "Quantum Error Correction",
    icon: 'ShieldCheckIcon',
    content: "Since we can't perfectly isolate qubits, the only path forward is to fight decoherence with software. Quantum Error Correction (QEC) is the theory of encoding the information of a single 'logical' qubit across many physical qubits.\n\nBy constantly checking for errors across these physical qubits (without disturbing the logical information), we can detect and correct for decoherence. This is a huge overhead—it may take 1,000 or more physical qubits to create one stable logical qubit—but it is essential for building large-scale, fault-tolerant quantum computers."
  },
  // Part VII: Your Journey Begins
  {
    section: "Part VII: Your Journey Begins",
    title: "The Road Ahead",
    icon: 'RoadmapIcon',
    content: "We have journeyed from the simple certainty of a classical bit to the probabilistic, interconnected, and awe-inspiring world of the qubit.\n\nYou have seen how the fundamental rules of the universe offer a new paradigm for computation, with the potential to solve some of humanity's greatest challenges. You have also seen the immense scientific and engineering hurdles we must overcome."
  },
  {
    section: "Part VII: Your Journey Begins",
    title: "Your Journey Begins Now",
    icon: 'RocketLaunchIcon',
    content: "You are about to step into a world that challenges our fundamental understanding of reality. The principles you will learn are not just engineering concepts; they are the rules that govern the universe at its most basic level.\n\nThis course is your gateway. You will learn to speak the language of quantum mechanics and write the code that harnesses its power. The path is challenging, but the destination is a new reality of computation.\n\nWelcome to the future. Click 'Start Learning' to begin."
  }
];