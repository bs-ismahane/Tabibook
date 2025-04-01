
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const daysList = document.querySelector('.days-list');
    const currentMonthEl = document.querySelector('.current-month');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Initialize with current date
    let currentDate = new Date();
    let centerDate = new Date(currentDate);
    
    // Function to generate days (15 before and 15 after center date)
    function generateDays() {
        daysList.innerHTML = '';
        
        // Calculate date range (15 days before and after)
        const startDate = new Date(centerDate);
        startDate.setDate(startDate.getDate() - 15);
        
        const endDate = new Date(centerDate);
        endDate.setDate(endDate.getDate() + 15);
        
        // Update month display
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        currentMonthEl.textContent = `${monthNames[centerDate.getMonth()]} ${centerDate.getFullYear()}`;
        
        // Generate each day
        const currentDateStr = currentDate.toDateString();
        
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const day = d.getDate();
            const month = d.toLocaleString('default', { month: 'short' });
            const dateStr = d.toDateString();
            
            const li = document.createElement('li');
            if (dateStr === currentDateStr) {
                li.classList.add('today');
            }
            
            li.innerHTML = `
                <h3>${day}</h3>
                <span>${month}</span>
            `;
            
            daysList.appendChild(li);
        }
        
        // Scroll to center date
        const centerIndex = 15; // 15 is the center position (15 days before)
        const centerItem = daysList.children[centerIndex];
        if (centerItem) {
            centerItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    
    // Navigation buttons
    prevBtn.addEventListener('click', function() {
        centerDate.setMonth(centerDate.getMonth() - 1);
        generateDays();
    });
    
    nextBtn.addEventListener('click', function() {
        centerDate.setMonth(centerDate.getMonth() + 1);
        generateDays();
    });
    
    // Initial generation
    generateDays();
});
