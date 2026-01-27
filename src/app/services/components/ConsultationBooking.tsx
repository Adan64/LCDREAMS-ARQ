'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ConsultationBookingProps {
  availableDates: string[];
}

const ConsultationBooking = ({ availableDates }: ConsultationBookingProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
    { time: '17:00', available: true }
  ];

  const projectTypes = [
    'Vivienda Unifamiliar',
    'Reforma Integral',
    'Diseño de Interiores',
    'Proyecto Comercial',
    'Urbanismo',
    'Otro'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
      setSelectedDate('');
      setSelectedTime('');

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-8 shadow-architectural">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-8 shadow-architectural">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="CalendarIcon" size={32} className="text-accent" />
        <h3 className="font-headline text-2xl font-headline-bold text-white">
          Reservar Consulta
        </h3>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg flex items-start space-x-3">
          <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0" />
          <div>
            <p className="font-body text-sm font-body-semibold text-success mb-1">
              ¡Consulta reservada con éxito!
            </p>
            <p className="font-body text-xs font-body-regular text-success-foreground">
              Recibirás un correo de confirmación en breve con los detalles de tu cita.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-body text-sm font-body-semibold mb-2 text-white">
              Nombre completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg font-body text-sm font-body-regular text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-body-semibold mb-2 text-white">
              Correo electrónico *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg font-body text-sm font-body-regular text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-body-semibold mb-2 text-white">
              Teléfono *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg font-body text-sm font-body-regular text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
              placeholder="+34 600 000 000"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-body-semibold mb-2 text-white">
              Tipo de proyecto *
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg font-body text-sm font-body-regular text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth"
            >
              <option value="">Selecciona una opción</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-body text-sm font-body-semibold mb-2 text-white">
            Fecha preferida *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availableDates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`py-3 px-4 rounded-lg border-2 transition-smooth ${
                  selectedDate === date
                    ? 'border-accent bg-accent/10 text-primary' :'border-border text-secondary hover:border-accent/50'
                }`}
              >
                <span className="font-body text-sm font-body-regular text-white">{date}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div>
            <label className="block font-body text-sm font-body-semibold mb-2 text-white">
              Hora preferida *
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`py-2 px-3 rounded-lg border-2 transition-smooth ${
                    selectedTime === slot.time
                      ? 'border-accent bg-accent/10 text-primary'
                      : slot.available
                      ? 'border-border text-secondary hover:border-accent/50' :'border-border text-muted-foreground opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="font-body text-xs font-body-regular text-orange-50">{slot.time}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block font-body text-sm font-body-semibold mb-2 text-white">
            Mensaje adicional
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg font-body text-sm font-body-regular text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-smooth resize-none"
            placeholder="Cuéntanos más sobre tu proyecto..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !selectedDate || !selectedTime}
          className="w-full py-4 px-6 bg-accent text-accent-foreground rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-accent/90 hover:shadow-architectural disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <Icon name="CalendarDaysIcon" size={20} />
              <span>Confirmar Reserva</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ConsultationBooking;