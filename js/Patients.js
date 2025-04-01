const filterSelect = document.querySelector('.filter-select');
    filterSelect.addEventListener('change', function() {
        const filterValue = this.value;
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            if (filterValue === 'all' || card.dataset.condition === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        // Get modal elements
        const modal = document.getElementById('addPatientModal');
        const addPatientBtn = document.querySelector('.add-patient-btn');
        const closeModalBtn = document.querySelector('.close-modal');
        const cancelBtn = document.querySelector('.cancel-btn');
        const patientForm = document.getElementById('patientForm');
        
        // Open modal when Add Patient button is clicked
        addPatientBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
        });
        
        // Close modal when X, Cancel, or outside modal is clicked
        closeModalBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Handle form submission
        patientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('patientName').value;
            const age = document.getElementById('patientAge').value;
            const gender = document.getElementById('patientGender').value;
            const condition = document.getElementById('patientCondition').value;
            const status = document.getElementById('patientStatus').value;
            const notes = document.getElementById('patientNotes').value;
            
            // Create new patient card
            addNewPatientCard(name, age, gender, condition, status, notes);
            
            // Reset and close form
            patientForm.reset();
            closeModal();
        });
        
        function closeModal() {
            modal.style.display = 'none';
        }
        
        function addNewPatientCard(name, age, gender, condition, status, notes) {
            const patientList = document.querySelector('.paintentList');
            
            // Create a new card element
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.condition = condition;
            
            // Status badge class
            const statusClass = status === 'urgent' ? 'urgent' : 
                               status === 'critical' ? 'critical' : 'routine';
            
            // Format the date
            const today = new Date();
            const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth()+1).toString().padStart(2, '0')}/${today.getFullYear()}`;
            
            // Card content
            card.innerHTML = `
                <img src="../images/avatar.png" alt="Patient avatar">
                <div class="card-content">
                    <h2>${name}</h2>
                    <p>${notes || 'New patient added'}</p>
                    <div class="patient-details">
                        <h4>${age} years | ${gender}</h4>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="patient-status">
                        <span class="condition-tag">${condition.charAt(0).toUpperCase() + condition.slice(1)}</span>
                    </div>
                </div>
                <button class="view-btn">View</button>
            `;
            
            // Add the new card to the beginning of the list
            patientList.prepend(card);
        }
    });