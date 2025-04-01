document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const editProfileModal = document.getElementById('editProfileModal');
    const editProfileBtn = document.querySelector('.profile-header button');
    const closeModalBtn = editProfileModal.querySelector('.close-modal');
    const cancelBtn = editProfileModal.querySelector('.cancel-btn');
    const profileForm = document.getElementById('profileForm');
    const profilePhotoInput = document.getElementById('profilePhoto');
    
    // Open modal when Edit Profile button is clicked
    editProfileBtn.addEventListener('click', function() {
        editProfileModal.style.display = 'flex';
    });
    
    // Close modal when X, Cancel, or outside modal is clicked
    closeModalBtn.addEventListener('click', closeEditModal);
    cancelBtn.addEventListener('click', closeEditModal);
    editProfileModal.addEventListener('click', function(e) {
        if (e.target === editProfileModal) {
            closeEditModal();
        }
    });
    
    // Handle profile photo preview
    profilePhotoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Create or update photo preview
                let preview = document.getElementById('profilePhotoPreview');
                if (!preview) {
                    preview = document.createElement('img');
                    preview.id = 'profilePhotoPreview';
                    preview.className = 'profile-photo-preview';
                    profilePhotoInput.parentNode.insertBefore(preview, profilePhotoInput.nextSibling);
                }
                preview.src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Handle form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('profileName').value;
        const specialty = document.getElementById('profileSpecialty').value;
        const email = document.getElementById('profileEmail').value;
        const phone = document.getElementById('profilePhone').value;
        const license = document.getElementById('profileLicense').value;
        const expiry = document.getElementById('profileExpiry').value;
        const taxID = document.getElementById('profileTaxID').value;
        const npi = document.getElementById('profileNPI').value;
        
        // Update profile information on the page
        updateProfileInfo(name, specialty, email, phone, license, expiry, taxID, npi);
        
        // Close the modal
        closeEditModal();
    });
    
    function closeEditModal() {
        editProfileModal.style.display = 'none';
    }
    
    function updateProfileInfo(name, specialty, email, phone, license, expiry, taxID, npi) {
        // Update profile card
        document.querySelector('.profile-card h2').textContent = name;
        document.querySelector('.profile-card p').textContent = specialty;
        document.querySelector('.profile-card .contact div:nth-child(1) span').textContent = email;
        document.querySelector('.profile-card .contact div:nth-child(2) span').textContent = phone;
        
        // Update professional details
        document.querySelector('.profile-details div:nth-child(2) span').textContent = license;
        
        // Format the expiry date for display
        const expiryDate = new Date(expiry);
        const formattedExpiry = expiryDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        document.querySelector('.profile-details div:nth-child(3) span').textContent = formattedExpiry;
        
        document.querySelector('.profile-details div:nth-child(4) span').textContent = taxID;
        document.querySelector('.profile-details div:nth-child(5) span').textContent = npi;
        
        // Update profile photo if a new one was selected
        const photoPreview = document.getElementById('profilePhotoPreview');
        if (photoPreview) {
            document.querySelector('.profile-card img').src = photoPreview.src;
        }
        
        // Show success message (optional)
        showToast('Profile updated successfully');
    }
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
});