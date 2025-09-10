// Main Application JavaScript
class NutritionApp {
  constructor() {
    // Use configuration based on environment
    this.apiBaseUrl = window.AppConfig ? window.AppConfig.get('apiBaseUrl') : 'http://localhost:8081';
    this.debug = window.AppConfig ? window.AppConfig.get('debug') : true;
    this.isOnline = navigator.onLine;
    this.currentSection = 'home';
    
    // Log environment info if in debug mode
    if (this.debug) {
      console.log('🚀 Nutrition App initialized');
      console.log('Environment:', window.AppConfig ? window.AppConfig.get('environment') : 'unknown');
      console.log('API Base URL:', this.apiBaseUrl);
    }
    
    this.init();
  }
  
  init() {
    this.registerServiceWorker();
    this.setupEventListeners();
    this.checkOnlineStatus();
    this.loadCurrentSection();
  }
  
  // Register Service Worker
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateAvailable();
            }
          });
        });
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }
  
  // Setup Event Listeners
  setupEventListeners() {
    // Language switcher
    const langButton = document.getElementById('language-switcher');
    if (langButton) {
      langButton.addEventListener('click', () => {
        const currentLang = i18n.currentLanguage;
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
      });
    }
    
    // Feature navigation
    document.querySelectorAll('.feature-icon').forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        const section = icon.getAttribute('data-section');
        this.navigateToSection(section);
      });
    });
    
    // Back to home
    document.querySelectorAll('.back-home').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigateToSection('home');
      });
    });
    
    // Online/Offline detection
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.hideOfflineIndicator();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.showOfflineIndicator();
    });
    
    // Form submissions
    this.setupFormHandlers();
  }
  
  // Setup Form Handlers
  setupFormHandlers() {
    // Diet form
    const dietForm = document.getElementById('diet-form');
    if (dietForm) {
      dietForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleDietFormSubmission();
      });
    }
    
    // Patient consultation form
    const patientForm = document.getElementById('patient-form');
    if (patientForm) {
      patientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleConsultationFormSubmission();
      });
    }
    
    // Workout form
    const workoutForm = document.getElementById('workout-form');
    if (workoutForm) {
      workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleWorkoutFormSubmission();
      });
    }
  }
  
  // Navigation
  navigateToSection(section) {
    // Hide all sections
    document.querySelectorAll('.main-section').forEach(sec => {
      sec.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
      targetSection.classList.remove('hidden');
      this.currentSection = section;
      
      // Update URL hash
      window.location.hash = section;
      
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }
  
  // Load current section from URL hash
  loadCurrentSection() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(`${hash}-section`)) {
      this.navigateToSection(hash);
    } else {
      this.navigateToSection('home');
    }
  }
  
  // API Calls
  async makeApiCall(endpoint, options = {}) {
    const url = `${this.apiBaseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (!this.isOnline) {
        throw new Error(i18n.t('message.offline'));
      }
      throw error;
    }
  }
  
  // Handle Diet Form Submission
  async handleDietFormSubmission() {
    const form = document.getElementById('diet-form');
    const formData = new FormData(form);
    
    // Validate form
    if (!this.validateForm(form)) {
      return;
    }
    
    // Prepare data with proper validation
    const dietData = {
      age: parseInt(formData.get('age')),
      weight: parseFloat(formData.get('weight')),
      height: parseFloat(formData.get('height')),
      gender: formData.get('gender'),
      activity_level: formData.get('activity_level'),
      goal: formData.get('goal'),
      country: formData.get('country'),
      if_schedule: formData.get('if_schedule'),
      health_conditions: formData.get('diseases') ? [formData.get('diseases')] : [],
      allergies: formData.get('allergies') ? formData.get('allergies').split(',').map(a => a.trim()) : []
    };
    
    this.showLoading('diet-results');
    
    try {
      // Get auth token (you'll need to implement login first)
      const token = this.getAuthToken();
      
      const response = await this.makeApiCall('/api/calculate-diet', {
        method: 'POST',
        body: JSON.stringify(dietData),
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.success) {
        this.displayDietResults(response.data);
      } else {
        throw new Error(response.error || 'Failed to calculate diet');
      }
    } catch (error) {
      this.showError('diet-results', this.formatValidationError(error.message));
    } finally {
      this.hideLoading('diet-results');
    }
  }
  
  // Handle Patient Form Submission
  async handlePatientFormSubmission() {
    // Similar to diet form but with patient-specific logic
    const form = document.getElementById('patient-form');
    const formData = new FormData(form);
    
    if (!this.validateForm(form)) {
      return;
    }
    
    // Show consultation and tips instead of full diet plan
    this.displayPatientConsultation(formData);
  }
  
  // Handle Workout Form Submission
  async handleWorkoutFormSubmission() {
    const form = document.getElementById('workout-form');
    const formData = new FormData(form);
    
    if (!this.validateForm(form)) {
      return;
    }
    
    this.generateWorkoutPlan(formData);
  }
  
  // Form Validation
  validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, i18n.t('form.required'));
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });
    
    return isValid;
  }
  
  showFieldError(field, message) {
    field.classList.add('is-invalid');
    let errorDiv = field.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'invalid-feedback';
      field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    errorDiv.textContent = message;
  }
  
  clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
      errorDiv.remove();
    }
  }
  
  // Display Results
  displayDietResults(data) {
    const resultsContainer = document.getElementById('diet-results');
    
    resultsContainer.innerHTML = `
      <div class="result-card">
        <h3 data-i18n="results.diet.title">${i18n.t('results.diet.title')}</h3>
        
        <div class="nutrition-stats">
          <div class="stat-card">
            <div class="stat-value">${Math.round(data.target_calories)}</div>
            <div class="stat-label" data-i18n="results.calories">${i18n.t('results.calories')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round(data.macro_targets.protein_grams)}</div>
            <div class="stat-label" data-i18n="results.protein">${i18n.t('results.protein')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round(data.macro_targets.carb_grams)}</div>
            <div class="stat-label" data-i18n="results.carbs">${i18n.t('results.carbs')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round(data.macro_targets.fat_grams)}</div>
            <div class="stat-label" data-i18n="results.fat">${i18n.t('results.fat')}</div>
          </div>
        </div>
        
        <div class="mb-3">
          <button class="btn btn-success" onclick="app.downloadPDF('diet')">
            <i class="bi bi-download"></i> <span data-i18n="results.download.pdf">${i18n.t('results.download.pdf')}</span>
          </button>
        </div>
      </div>
    `;
    
    // Add meal plan if available
    if (data.meal_plan) {
      this.displayMealPlan(data.meal_plan, resultsContainer);
    }
    
    // Add subscription box
    this.addSubscriptionBox(resultsContainer);
  }
  
  displayMealPlan(mealPlan, container) {
    const mealPlanHtml = `
      <div class="result-card">
        <h4 data-i18n="results.meal.plan">${i18n.t('results.meal.plan')}</h4>
        <div class="table-responsive">
          <table class="table meal-plan-table">
            <thead>
              <tr>
                <th data-i18n="meal.day">${i18n.t('meal.day')}</th>
                <th data-i18n="meal.breakfast">${i18n.t('meal.breakfast')}</th>
                <th data-i18n="meal.lunch">${i18n.t('meal.lunch')}</th>
                <th data-i18n="meal.dinner">${i18n.t('meal.dinner')}</th>
                <th data-i18n="meal.snack">${i18n.t('meal.snack')}</th>
              </tr>
            </thead>
            <tbody>
              ${this.generateMealPlanRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
    
    container.insertAdjacentHTML('beforeend', mealPlanHtml);
  }
  
  generateMealPlanRows() {
    const days = [
      i18n.t('meal.day') + ' 1',
      i18n.t('meal.day') + ' 2',
      i18n.t('meal.day') + ' 3',
      i18n.t('meal.day') + ' 4',
      i18n.t('meal.day') + ' 5',
      i18n.t('meal.day') + ' 6',
      i18n.t('meal.day') + ' 7'
    ];
    
    // Sample meal plan (would come from API)
    const sampleMeals = {
      breakfast: ['Oatmeal with fruits', 'Greek yogurt with berries', 'Eggs with vegetables', 'Smoothie bowl', 'Whole grain toast with avocado', 'Protein pancakes', 'Quinoa breakfast bowl'],
      lunch: ['Grilled chicken salad', 'Quinoa bowl with vegetables', 'Lentil soup with bread', 'Fish with rice', 'Turkey wrap', 'Chickpea curry', 'Salmon with quinoa'],
      dinner: ['Grilled fish with vegetables', 'Chicken stir-fry', 'Vegetable curry with rice', 'Lean beef with sweet potato', 'Tofu with noodles', 'Grilled shrimp salad', 'Turkey meatballs'],
      snack: ['Mixed nuts', 'Greek yogurt', 'Fresh fruits', 'Hummus with vegetables', 'Protein shake', 'Dark chocolate', 'Dried fruits']
    };
    
    return days.map((day, index) => `
      <tr>
        <td><strong>${day}</strong></td>
        <td>${sampleMeals.breakfast[index]}</td>
        <td>${sampleMeals.lunch[index]}</td>
        <td>${sampleMeals.dinner[index]}</td>
        <td>${sampleMeals.snack[index]}</td>
      </tr>
    `).join('');
  }
  
  addSubscriptionBox(container) {
    const subscriptionHtml = `
      <div class="subscription-box">
        <h4 data-i18n="subscription.title">${i18n.t('subscription.title')}</h4>
        <p data-i18n="subscription.desc">${i18n.t('subscription.desc')}</p>
        <div class="row">
          <div class="col-md-6">
            <input type="tel" class="form-control" placeholder="${i18n.t('subscription.phone')}" data-i18n-placeholder="subscription.phone">
          </div>
          <div class="col-md-6">
            <button class="btn btn-light" data-i18n="subscription.cta">${i18n.t('subscription.cta')}</button>
          </div>
        </div>
      </div>
    `;
    
    container.insertAdjacentHTML('beforeend', subscriptionHtml);
  }
  
  // Generate Workout Plan
  generateWorkoutPlan(formData) {
    const resultsContainer = document.getElementById('workout-results');
    const goal = formData.get('goal');
    
    const workoutPlans = {
      weight_loss: {
        day1: { name: 'Cardio & Core', exercises: 'Treadmill 30min, Planks 3x1min, Mountain climbers 3x15' },
        day2: { name: 'Upper Body', exercises: 'Push-ups 3x12, Pull-ups 3x8, Shoulder press 3x10' },
        day3: { name: 'Lower Body', exercises: 'Squats 3x15, Lunges 3x12, Calf raises 3x15' },
        day4: { name: 'Cardio', exercises: 'Cycling 45min, Burpees 3x10' },
        day5: { name: 'Full Body', exercises: 'Deadlifts 3x10, Bench press 3x10, Rows 3x10' },
        day6: { name: 'Active Recovery', exercises: 'Walking 30min, Stretching 15min' },
        day7: { name: 'Rest', exercises: 'Complete rest or light yoga' }
      },
      muscle_gain: {
        day1: { name: 'Chest & Triceps', exercises: 'Bench press 4x8, Incline press 3x10, Dips 3x12' },
        day2: { name: 'Back & Biceps', exercises: 'Deadlifts 4x6, Rows 4x8, Bicep curls 3x12' },
        day3: { name: 'Legs', exercises: 'Squats 4x8, Leg press 3x12, Leg curls 3x10' },
        day4: { name: 'Shoulders', exercises: 'Overhead press 4x8, Lateral raises 3x12, Rear delts 3x12' },
        day5: { name: 'Arms', exercises: 'Close grip bench 3x10, Skull crushers 3x12, Hammer curls 3x12' },
        day6: { name: 'Legs & Core', exercises: 'Romanian deadlifts 3x10, Squats 3x12, Planks 3x1min' },
        day7: { name: 'Rest', exercises: 'Complete rest' }
      }
    };
    
    const plan = workoutPlans[goal] || workoutPlans.weight_loss;
    
    let workoutHtml = `
      <div class="workout-plan">
        <h3 data-i18n="workout.title">${i18n.t('workout.title')}</h3>
        <div class="row">
    `;
    
    Object.entries(plan).forEach(([day, workout]) => {
      workoutHtml += `
        <div class="col-md-6 col-lg-4 mb-3">
          <div class="exercise-card">
            <div class="exercise-name">${day.toUpperCase()}: ${workout.name}</div>
            <div class="exercise-details">${workout.exercises}</div>
          </div>
        </div>
      `;
    });
    
    workoutHtml += `
        </div>
      </div>
    `;
    
    resultsContainer.innerHTML = workoutHtml;
    
    // Add workout tips
    this.addWorkoutTips(resultsContainer);
    
    // Add supplements grid
    this.addSupplementsGrid(resultsContainer);
    
    // Add subscription box
    this.addSubscriptionBox(resultsContainer);
  }
  
  addWorkoutTips(container) {
    const tipsHtml = `
      <div class="result-card">
        <h4 data-i18n="workout.tips.title">${i18n.t('workout.tips.title')}</h4>
        <div class="row">
          <div class="col-md-4">
            <h6 data-i18n="workout.tips.pre">${i18n.t('workout.tips.pre')}</h6>
            <ul>
              <li>Warm up for 5-10 minutes</li>
              <li>Eat a light snack 1 hour before</li>
              <li>Stay hydrated</li>
            </ul>
          </div>
          <div class="col-md-4">
            <h6 data-i18n="workout.tips.post">${i18n.t('workout.tips.post')}</h6>
            <ul>
              <li>Cool down and stretch</li>
              <li>Eat protein within 30 minutes</li>
              <li>Get adequate sleep</li>
            </ul>
          </div>
          <div class="col-md-4">
            <h6 data-i18n="workout.tips.hydration">${i18n.t('workout.tips.hydration')}</h6>
            <ul>
              <li>Drink water before, during, and after</li>
              <li>Monitor urine color</li>
              <li>Consider electrolytes for long sessions</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    
    container.insertAdjacentHTML('beforeend', tipsHtml);
  }
  
  addSupplementsGrid(container) {
    const supplements = [
      { name: 'Whey Protein', description: 'Fast-absorbing protein for muscle building', locked: false },
      { name: 'Creatine', description: 'Improves strength and power output', locked: false },
      { name: 'BCAA', description: 'Branched-chain amino acids for recovery', locked: false },
      { name: 'Pre-Workout', description: 'Energy boost for intense training', locked: true },
      { name: 'Glutamine', description: 'Supports muscle recovery', locked: true },
      { name: 'Fish Oil', description: 'Omega-3 fatty acids for overall health', locked: true }
    ];
    
    let supplementsHtml = `
      <div class="result-card">
        <h4 data-i18n="workout.supplements.title">${i18n.t('workout.supplements.title')}</h4>
        <div class="supplements-grid">
    `;
    
    supplements.forEach(supplement => {
      supplementsHtml += `
        <div class="supplement-card ${supplement.locked ? 'locked' : ''}">
          <h6>${supplement.name}</h6>
          <p>${supplement.description}</p>
          ${supplement.locked ? `<small data-i18n="workout.supplements.locked">${i18n.t('workout.supplements.locked')}</small>` : ''}
        </div>
      `;
    });
    
    supplementsHtml += `
        </div>
      </div>
    `;
    
    container.insertAdjacentHTML('beforeend', supplementsHtml);
  }
  
  // Utility Functions
  showLoading(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <span data-i18n="message.loading">${i18n.t('message.loading')}</span>
      </div>
    `;
  }
  
  hideLoading(containerId) {
    // Loading will be replaced by results
  }
  
  showError(containerId, message) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="alert alert-danger">
        <i class="bi bi-exclamation-triangle"></i> ${message}
      </div>
    `;
  }
  
  showOfflineIndicator() {
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
      indicator.classList.add('show');
    }
  }
  
  hideOfflineIndicator() {
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
      indicator.classList.remove('show');
    }
  }
  
  showUpdateAvailable() {
    // Show update notification
    const updateBanner = document.createElement('div');
    updateBanner.className = 'alert alert-info alert-dismissible position-fixed top-0 start-0 end-0';
    updateBanner.style.zIndex = '9999';
    updateBanner.innerHTML = `
      <span>A new version is available. <button class="btn btn-link p-0" onclick="location.reload()">Refresh</button> to update.</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.prepend(updateBanner);
  }
  
  // Add Workout Form Handler
  async handleWorkoutFormSubmission() {
    const form = document.getElementById('workout-form');
    const formData = new FormData(form);
    
    // Validate form
    if (!this.validateForm(form)) {
      return;
    }
    
    // Prepare data with proper validation
    const workoutData = {
      name: formData.get('name') || '',
      age: parseInt(formData.get('age')),
      weight: parseFloat(formData.get('weight')),
      height: parseFloat(formData.get('height')),
      gender: formData.get('gender'),
      fitness_level: formData.get('fitness_level'),
      goal: formData.get('goal'),
      available_days: parseInt(formData.get('available_days')),
      session_duration: parseInt(formData.get('session_duration')),
      equipment: formData.get('equipment') ? formData.get('equipment').split(',').map(e => e.trim()) : [],
      injuries: formData.get('injuries') ? formData.get('injuries').split(',').map(i => i.trim()) : [],
      preferred_activities: formData.get('preferred_activities') ? formData.get('preferred_activities').split(',').map(a => a.trim()) : []
    };
    
    this.showLoading('workout-results');
    
    try {
      const token = this.getAuthToken();
      
      const response = await this.makeApiCall('/api/generate-workout', {
        method: 'POST',
        body: JSON.stringify(workoutData),
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.success) {
        this.displayWorkoutResults(response.data);
      } else {
        throw new Error(response.error || 'Failed to generate workout plan');
      }
    } catch (error) {
      this.showError('workout-results', this.formatValidationError(error.message));
    } finally {
      this.hideLoading('workout-results');
    }
  }

  // Add Consultation Form Handler (Patient Form)
  async handleConsultationFormSubmission() {
    const form = document.getElementById('patient-form');
    const formData = new FormData(form);
    
    // Validate form
    if (!this.validateForm(form)) {
      return;
    }
    
    // Prepare data with proper validation
    const consultationData = {
      patient_name: formData.get('patient_name') || formData.get('name') || '',
      age: parseInt(formData.get('age')),
      gender: formData.get('gender'),
      symptoms: formData.get('symptoms') ? formData.get('symptoms').split(',').map(s => s.trim()) : [],
      duration: formData.get('duration') || '',
      severity: formData.get('severity') || 'moderate',
      medical_history: formData.get('medical_history') ? formData.get('medical_history').split(',').map(h => h.trim()) : [],
      current_medications: formData.get('current_medications') ? formData.get('current_medications').split(',').map(m => m.trim()) : [],
      allergies: formData.get('allergies') ? formData.get('allergies').split(',').map(a => a.trim()) : [],
      additional_notes: formData.get('additional_notes') || formData.get('notes') || ''
    };
    
    this.showLoading('patient-results');
    
    try {
      const token = this.getAuthToken();
      
      const response = await this.makeApiCall('/api/patient-consultation', {
        method: 'POST',
        body: JSON.stringify(consultationData),
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.success) {
        this.displayConsultationResults(response.data);
      } else {
        throw new Error(response.error || 'Failed to process consultation');
      }
    } catch (error) {
      this.showError('patient-results', this.formatValidationError(error.message));
    } finally {
      this.hideLoading('patient-results');
    }
  }

  // Enhanced validation error formatting
  formatValidationError(errorMessage) {
    // Parse validation errors from backend
    try {
      const parsed = JSON.parse(errorMessage);
      if (parsed.validation_errors) {
        return parsed.validation_errors.map(err => `${err.field}: ${err.message}`).join('<br>');
      }
    } catch (e) {
      // Not a JSON validation error, return as is
    }
    return errorMessage;
  }

  // Enhanced success handlers
  displayWorkoutResults(data) {
    const container = document.getElementById('workout-results');
    if (!data || !data.weekly_plan) {
      this.showError('workout-results', 'Invalid workout data received');
      return;
    }
    
    const html = `
      <div class="result-card">
        <h3>Your Personalized Workout Plan</h3>
        <div class="plan-overview">
          <p><strong>Goal:</strong> ${data.goal}</p>
          <p><strong>Duration:</strong> ${data.duration_weeks} weeks</p>
          <p><strong>Sessions per week:</strong> ${data.sessions_per_week}</p>
        </div>
        <div class="weekly-plan">
          ${Object.entries(data.weekly_plan).map(([day, plan]) => `
            <div class="day-plan">
              <h4>${day}</h4>
              <p><strong>${plan.name}</strong></p>
              <p>${plan.exercises}</p>
            </div>
          `).join('')}
        </div>
        ${data.notes ? `<div class="plan-notes"><h4>Important Notes:</h4><p>${data.notes}</p></div>` : ''}
      </div>
    `;
    
    container.innerHTML = html;
  }

  displayConsultationResults(data) {
    const container = document.getElementById('patient-results');
    if (!container) {
      // Try alternative container names
      const altContainer = document.getElementById('consultation-results') || document.getElementById('patient-consultation-results');
      if (altContainer) {
        container = altContainer;
      } else {
        console.error('No suitable results container found');
        return;
      }
    }
    
    if (!data) {
      this.showError('patient-results', 'Invalid consultation data received');
      return;
    }
    
    const html = `
      <div class="result-card">
        <h3>Consultation Results</h3>
        <div class="consultation-assessment">
          <div class="assessment-level alert ${data.urgency_level === 'emergency' ? 'alert-danger' : 
            data.urgency_level === 'urgent' ? 'alert-warning' : 'alert-info'}">
            <h4>Assessment Level: ${data.urgency_level ? data.urgency_level.toUpperCase() : 'ROUTINE'}</h4>
          </div>
          
          ${data.possible_conditions && data.possible_conditions.length > 0 ? `
          <div class="possible-conditions">
            <h4>Possible Conditions:</h4>
            <ul>
              ${data.possible_conditions.map(condition => `<li>${condition}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${data.recommendations && data.recommendations.length > 0 ? `
          <div class="recommendations">
            <h4>Recommendations:</h4>
            <ul>
              ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${data.lifestyle_advice && data.lifestyle_advice.length > 0 ? `
          <div class="lifestyle-advice">
            <h4>Lifestyle Advice:</h4>
            <ul>
              ${data.lifestyle_advice.map(advice => `<li>${advice}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${data.warning_signs && data.warning_signs.length > 0 ? `
          <div class="warning-signs alert alert-warning">
            <h4>Warning Signs to Watch For:</h4>
            <ul>
              ${data.warning_signs.map(sign => `<li>${sign}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          <div class="disclaimer alert alert-info">
            <strong>Disclaimer:</strong> This consultation is for informational purposes only and does not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  }

  // PDF Download
  downloadPDF(type) {
    if (typeof jsPDF === 'undefined') {
      console.error('jsPDF library not loaded');
      return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    if (type === 'diet') {
      doc.text('Diet Plan', 20, 20);
      // Add diet plan content
      doc.text('Your personalized diet plan will be generated here.', 20, 40);
    } else if (type === 'workout') {
      doc.text('Workout Plan', 20, 20);
      // Add workout plan content
      doc.text('Your personalized workout plan will be generated here.', 20, 40);
    }
    
    doc.save(`${type}-plan.pdf`);
  }
  
  // Get auth token (implement based on your auth system)
  getAuthToken() {
    // For now, return a dummy token
    // In a real app, this would get the token from localStorage or cookies
    return 'dummy-token';
  }
}

// Initialize app when DOM is loaded
let app;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new NutritionApp();
  });
} else {
  app = new NutritionApp();
}
