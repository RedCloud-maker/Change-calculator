// Denominations
const denominations = [
  { name: "Twenty Dollar Bill", value: 20.0 },
  { name: "Ten Dollar Bill", value: 10.0 },
  { name: "Five Dollar Bill", value: 5.0 },
  { name: "One Dollar Bill", value: 1.0 },
  { name: "Quarter", value: 0.25 },
  { name: "Dime", value: 0.10 },
  { name: "Nickel", value: 0.05 },
  { name: "Penny", value: 0.01 },
];

// Grab elements (target the actual inputs/buttons)
const totalCostInput = document.querySelector(".total-cost");        // input for cost
const amountPaidInput = document.querySelector(".amount-paid");      // input for amount paid
const numericChangeInput = document.querySelector(".numeric-change");// readonly input for change
const breakdownOutput = document.querySelector(".change-breakdown"); // textarea for breakdown
const equalsButton = document.querySelector(".equals-button");       // "=" button
const minusButton = document.querySelector(".minus-button");         // "-" button

// if the amount paid is less than total cost, show error
function calculateChange(totalCost, amountPaid) {
  if (amountPaid < totalCost) {
    return { breakdown: "Insufficient payment!", numeric: 0 };
  }

  // Calculate change, breakdown is string that will be filled with denom counts
  let change = amountPaid - totalCost;
  let breakdown = "";

  // Go through each denomination in the array; calculate how many fit into change; adds line to breakdown string (e.g., "2 * Five Dollar Bill")
  denominations.forEach(denom => {
    let count = Math.floor(change / denom.value);
    if (count > 0) {
      breakdown += `${count} * ${denom.name}\n`; // if change is 4.25 and denom is one dollar bill, adds "4 * One Dollar Bill"
      change = +(change - count * denom.value).toFixed(2); // to fixed ensures result is rounded to 2 decimal places
    }
  });

  // adds line to breakdown string (e.g., "2 * Five Dollar Bill") or "No change needed!" if no change
  return {
    breakdown: breakdown || "No change needed!",
    numeric: +(amountPaid - totalCost).toFixed(2) // total numeric change
  };
}

// Event listener for equals (=) reads the value from <inputs> from the text box which the browser gives in a string , uses parseFloat to converts them from strings to numbers.
equalsButton.addEventListener("click", () => {
  const totalCost = parseFloat(totalCostInput.value);
  const amountPaid = parseFloat(amountPaidInput.value);

// checking for valid numbers if not a number show error
  if (isNaN(totalCost) || isNaN(amountPaid)) {
    numericChangeInput.value = "";
    breakdownOutput.value = "Enter valid numbers";
    return;
  }

  const result = calculateChange(totalCost, amountPaid);

  // Show numeric change separately
  numericChangeInput.value = `$${result.numeric.toFixed(2)}`;
  breakdownOutput.value = result.breakdown;
});

