document.addEventListener('DOMContentLoaded', () => {
    const calorieForm = document.getElementById('calorie-form');
    const foodItemsList = document.getElementById('food-items-list');

    const goalCaloriesEl = document.getElementById('goal-calories');
    const consumedCaloriesEl = document.getElementById('consumed-calories');
    const remainingCaloriesEl = document.getElementById('remaining-calories');

    let consumedCalories = 0;
    const goalCalories = 2000; // You can make this dynamic if you want

    calorieForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const foodItemInput = document.getElementById('food-item');
        const caloriesInput = document.getElementById('calories');

        const foodName = foodItemInput.value;
        const calories = parseInt(caloriesInput.value);

        if (foodName === '' || isNaN(calories) || calories <= 0) {
            alert('Please enter a valid food item and calorie amount.');
            return;
        }

        // Add food to the list
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${foodName} <span>${calories} cal</span>
            <button class="delete-btn"><i class="ri-close-line"></i></button>
        `;
        foodItemsList.appendChild(listItem);

        // Update calorie counts
        consumedCalories += calories;
        updateCalorieSummary();

        // Add event listener to the new delete button
        listItem.querySelector('.delete-btn').addEventListener('click', () => {
            consumedCalories -= calories;
            updateCalorieSummary();
            listItem.remove();
        });

        // Clear the form
        foodItemInput.value = '';
        caloriesInput.value = '';
    });

    function updateCalorieSummary() {
        const remainingCalories = goalCalories - consumedCalories;

        consumedCaloriesEl.textContent = consumedCalories;
        remainingCaloriesEl.textContent = remainingCalories;

        if (remainingCalories <= 0) {
            remainingCaloriesEl.parentElement.classList.add('negative');
        } else {
            remainingCaloriesEl.parentElement.classList.remove('negative');
        }
    }

    // Initial setup
    goalCaloriesEl.textContent = goalCalories;
    updateCalorieSummary();
});
