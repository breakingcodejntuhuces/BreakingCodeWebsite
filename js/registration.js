document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registrationForm');
  const submitBtn = document.getElementById('regSubmitBtn');
  const errorDiv = document.getElementById('regError');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      submitBtn.textContent = 'Registering...';
      submitBtn.disabled = true;
      errorDiv.style.display = 'none';

      const formData = new FormData(form);

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (response.ok) {
          // Success, redirect to thank you page
          window.location.href = `thankyou.html`;
        } else {
          // Show error
          errorDiv.textContent = result.error || 'Registration failed. Please try again.';
          errorDiv.style.display = 'block';
          submitBtn.textContent = 'Register Now';
          submitBtn.disabled = false;
        }
      } catch (err) {
        console.error(err);
        errorDiv.textContent = 'A network error occurred. Please try again later.';
        errorDiv.style.display = 'block';
        submitBtn.textContent = 'Register Now';
        submitBtn.disabled = false;
      }
    });
  }
});
