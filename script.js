// UPE–Riemann Calculator

// Known imaginary parts of the first Riemann zeros
const riemannZeros = [
  14.134725, 21.022040, 25.010858, 30.424876, 32.935061,
  37.586178, 40.918719, 43.327073, 48.005150, 49.773832,
  52.970321, 56.446247, 59.347044, 60.831779, 65.112545
];

// Simple primality test (good for demo, not huge numbers)
function isPrime(n) {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  let r = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= r; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// Compute UPE Goldbach pair and link to Riemann
function computeUPE() {
  const input = document.getElementById("evenInput").value;
  let E = parseInt(input, 10);
  const output = document.getElementById("output");

  if (isNaN(E) || E < 4 || E % 2 !== 0) {
    output.textContent = "Please enter a valid even integer ≥ 4.";
    return;
  }

  const x = E / 2;
  let t = (x % 2 === 0) ? 1 : 2;
  let p, q;

  while (true) {
    p = x - t;
    q = x + t;
    if (isPrime(p) && isPrime(q)) break;
    t += 2;
    if (t > 1000000) {
      output.textContent = "No pair found (search limit exceeded).";
      return;
    }
  }

  const delta = 2 * t;
  const fNorm = t / Math.pow(Math.log(E), 2);

  // Find nearest Riemann zero
  let nearest = riemannZeros[0];
  let minDiff = Math.abs(fNorm - nearest);
  for (let g of riemannZeros) {
    let diff = Math.abs(fNorm - g);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = g;
    }
  }

  output.innerHTML = `
    <p>Goldbach pair: <strong>${p} + ${q} = ${E}</strong></p>
    <p>Displacement: t = ${t}, Gap Δ = ${delta}</p>
    <p>Normalized f(E) = ${fNorm.toFixed(6)}</p>
    <p>Nearest Riemann zero γ ≈ ${nearest}</p>
  `;
}
