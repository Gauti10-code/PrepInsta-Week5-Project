document.addEventListener('DOMContentLoaded', () => {
  const doctors = [
      { name: 'Dr. Smith', availableSlots: ['09:00', '10:00', '11:00'], bookedSlots: [] },
      { name: 'Dr. Johnson', availableSlots: ['13:00', '14:00', '15:00'], bookedSlots: [] },
      // Add more doctors as needed
  ];

  const appointments = [];

  const doctorSelect = document.getElementById('doctor-selection');
  doctors.forEach((doctor, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = doctor.name;
      doctorSelect.appendChild(option);
  });

  doctorSelect.addEventListener('change', displayAvailableSlots);

  const bookingForm = document.getElementById('booking-form');
  bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('patient-name').value;
      const doctorIndex = document.getElementById('doctor-selection').value;
      const appointmentDate = document.getElementById('appointment-date').value;
      const appointmentTime = document.getElementById('appointment-time').value;

      const doctor = doctors[doctorIndex];
      if (!doctor.availableSlots.includes(appointmentTime) || doctor.bookedSlots.includes(appointmentTime)) {
          alert('Selected time slot is not available.');
          return;
      }

      const appointmentID = `APPT-${appointments.length + 1}`;
      const appointment = {
          id: appointmentID,
          patientName,
          doctorName: doctor.name,
          date: appointmentDate,
          time: appointmentTime,
      };
      appointments.push(appointment);
      doctor.bookedSlots.push(appointmentTime);

      alert('Appointment booked successfully!');
      displayAppointments();
      displayDoctors();
      displayAvailableSlots();
  });

  const cancelAppointmentBtn = document.getElementById('cancel-appointment');
  cancelAppointmentBtn.addEventListener('click', () => {
      const appointmentID = document.getElementById('appointment-id').value;
      const appointmentIndex = appointments.findIndex(appt => appt.id === appointmentID);

      if (appointmentIndex === -1) {
          alert('Invalid appointment ID.');
          return;
      }

      const appointment = appointments.splice(appointmentIndex, 1)[0];
      const doctor = doctors.find(doc => doc.name === appointment.doctorName);
      doctor.bookedSlots = doctor.bookedSlots.filter(slot => slot !== appointment.time);

      alert('Appointment canceled successfully!');
      displayAppointments();
      displayDoctors();
      displayAvailableSlots();
  });

  const viewAppointmentsBtn = document.getElementById('view-appointments');
  viewAppointmentsBtn.addEventListener('click', displayAppointments);

  function displayAvailableSlots() {
      const doctorIndex = document.getElementById('doctor-selection').value;
      const slotsDiv = document.getElementById('available-slots');
      slotsDiv.innerHTML = '';

      if (doctorIndex === '') return;

      const doctor = doctors[doctorIndex];
      doctor.availableSlots.forEach(slot => {
          const slotDiv = document.createElement('div');
          slotDiv.textContent = slot;
          if (doctor.bookedSlots.includes(slot)) {
              slotDiv.classList.add('booked');
          }
          slotsDiv.appendChild(slotDiv);
      });
  }

  function displayAppointments() {
      const appointmentsList = document.getElementById('appointments-list');
      appointmentsList.innerHTML = '';

      if (appointments.length === 0) {
          appointmentsList.textContent = 'No appointments booked.';
          return;
      }

      appointments.forEach(appt => {
          const div = document.createElement('div');
          div.textContent = `ID: ${appt.id}, Patient: ${appt.patientName}, Doctor: ${appt.doctorName}, Date: ${appt.date}, Time: ${appt.time}`;
          appointmentsList.appendChild(div);
      });
  }

  function displayDoctors() {
      const doctorCards = document.getElementById('doctor-cards');
      doctorCards.innerHTML = '';

      doctors.forEach(doctor => {
          const div = document.createElement('div');
          div.classList.add('doctor-card');
          div.innerHTML = `<strong>${doctor.name}</strong><br>Total Slots: ${doctor.availableSlots.length}<br>Available Slots: ${doctor.availableSlots.filter(slot => !doctor.bookedSlots.includes(slot)).length}<br>Booked Slots: ${doctor.bookedSlots.length}`;
          doctorCards.appendChild(div);
      });
  }

  displayDoctors();
  displayAvailableSlots();
});
