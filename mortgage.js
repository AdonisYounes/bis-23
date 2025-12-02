(function(){
  const $ = id => document.getElementById(id);
  const form = $('mortgageForm');
  const out = $('result');

  function fmt(n){ return Number(n).toLocaleString(undefined,{maximumFractionDigits:2}); }

  function calcPI(P, rate, years){
    const r = (rate/100)/12, n = years*12;
    if(!r) return P/n;
    const pow = Math.pow(1+r,n);
    return P*r*pow/(pow-1);
  }

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const P = parseFloat($('amount').value),
          r = parseFloat($('rate').value),
          y = parseInt($('years').value),
          extra = parseFloat($('extra').value)||0;

    if(!P||!r||!y){ out.innerHTML="Enter valid numbers."; return; }

    const base = calcPI(P,r,y);
    const monthly = base + extra;
    const total = monthly*(y*12);
    const interest = total - P;

    out.innerHTML = `
      <div class="big">MONTHLY PAYMENT: $${fmt(monthly)}</div>
      <p>Total Paid: $${fmt(total)}<br>Interest: $${fmt(interest)}</p>
    `;
  });

  form.addEventListener('reset', ()=>{
    setTimeout(()=>{ out.innerHTML="<p>Enter values and press <b>START</b>.</p>"; },0);
  });
})();