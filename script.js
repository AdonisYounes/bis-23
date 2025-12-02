(function(){
  const form = document.getElementById('mpgForm');
  const milesEl = document.getElementById('miles');
  const gallonsEl = document.getElementById('gallons');
  const resultEl = document.getElementById('result');

  function format(n){
    return Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const miles = parseFloat(milesEl.value);
    const gallons = parseFloat(gallonsEl.value);

    if (!Number.isFinite(miles) || miles < 0) {
      resultEl.innerHTML = '<span style="color:#ffb3b3">Please enter a valid (non‑negative) number of miles.</span>';
      milesEl.focus();
      return;
    }
    if (!Number.isFinite(gallons) || gallons <= 0) {
      resultEl.innerHTML = '<span style="color:#ffb3b3">Gallons must be a positive number.</span>';
      gallonsEl.focus();
      return;
    }

    const mpg = miles / gallons;
    const kpl = mpg * 0.425143707; // bonus: kilometers per liter
    resultEl.innerHTML = `
      <strong>Result:</strong> <span style="font-size:1.15rem">${format(mpg)} MPG</span>
      <br/><small style="color:#b9c2ff">(${format(kpl)} km/L)</small>
    `;
  });

  form.addEventListener('reset', function(){
    setTimeout(()=>{ resultEl.textContent = 'Enter values and hit Calculate.'; }, 0);
  });
})();